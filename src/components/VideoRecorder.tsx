
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Video, StopCircle, Play, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [useProductionWebhook, setUseProductionWebhook] = useState(true);
  const [userName, setUserName] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const webhookUrl = useProductionWebhook 
    ? 'https://redclay.app.n8n.cloud/webhook/testai'
    : 'https://redclay.app.n8n.cloud/webhook-test/testai';

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      
      // Use proper webm format with codecs
      const options = {
        mimeType: 'video/webm;codecs=vp8,opus'
      };
      
      // Fallback to basic webm if specific codecs not supported
      if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
        if (MediaRecorder.isTypeSupported('video/webm')) {
          options.mimeType = 'video/webm';
        } else {
          options.mimeType = 'video/mp4';
        }
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'video/webm';
        const blob = new Blob(chunks, { type: mimeType });
        setRecordedVideo(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording Started",
        description: "Speak naturally and we'll analyze your speech patterns.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to access camera and microphone.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording Stopped",
        description: "Your video is ready for analysis.",
      });
    }
  };

  const analyzeVideo = async () => {
    if (!recordedVideo) return;
    
    if (!userName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name before analyzing the video.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Generate a session ID for tracking
      const sessionId = crypto.randomUUID();
      
      // Create FormData and send to webhook
      const formData = new FormData();
      const fileExtension = recordedVideo.type.includes('webm') ? 'webm' : 'mp4';
      formData.append('video', recordedVideo, `speech-recording.${fileExtension}`);
      formData.append('session_id', sessionId);
      formData.append('user_name', userName.trim());

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send video for analysis');
      }

      toast({
        title: "Video Sent for Analysis",
        description: `Sent to ${useProductionWebhook ? 'Production' : 'Test'} webhook. Waiting for analysis results...`,
      });

      // Poll for results every 3 seconds - look for completed analysis for this specific user
      const pollForResults = async () => {
        try {
          console.log(`Checking for completed analysis for user: ${userName.trim()}`);
          
          const { data, error } = await supabase
            .from('speech_analyses')
            .select('*')
            .eq('user_name', userName.trim())
            .eq('status', 'done')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (error) {
            console.error('Error polling for results:', error);
            setTimeout(pollForResults, 3000);
            return;
          }

          if (data) {
            console.log('Found completed analysis for user:', data);
            // Found completed analysis for this user, navigate to results using the found session_id
            navigate(`/results/${data.session_id}`);
            setIsAnalyzing(false);
            return;
          }

          console.log(`No completed analysis found yet for user ${userName.trim()}, continuing to poll...`);
          // No completed analysis yet for this user, continue polling
          setTimeout(pollForResults, 3000); // Poll every 3 seconds
        } catch (err) {
          console.error('Polling error:', err);
          setTimeout(pollForResults, 3000); // Continue polling even on error
        }
      };

      // Start polling after a short delay
      setTimeout(pollForResults, 3000);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze video. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Video Recording
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">Keep Under 30 Seconds</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="webhook-switch" className="text-sm font-medium">
              Test
            </label>
            <Switch
              id="webhook-switch"
              checked={useProductionWebhook}
              onCheckedChange={setUseProductionWebhook}
            />
            <label htmlFor="webhook-switch" className="text-sm font-medium">
              Production
            </label>
          </div>
          <div className="text-xs text-gray-500">
            Using: {useProductionWebhook ? 'Production' : 'Test'} webhook
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="user-name" className="text-sm font-medium">
            Your Name
          </label>
          <Input
            id="user-name"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-96 object-cover"
            style={{ display: isRecording ? 'block' : 'none' }}
          />
          {recordedVideo && !isRecording && (
            <video
              src={URL.createObjectURL(recordedVideo)}
              controls
              className="w-full h-96 object-cover"
            />
          )}
          {!isRecording && !recordedVideo && (
            <div className="w-full h-96 flex items-center justify-center text-white">
              <div className="text-center">
                <Video className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Click "Start Recording" to begin</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          {!isRecording && !recordedVideo && (
            <Button onClick={startRecording} size="lg">
              <Play className="h-4 w-4 mr-2" />
              Start Recording
            </Button>
          )}
          
          {isRecording && (
            <Button onClick={stopRecording} variant="destructive" size="lg">
              <StopCircle className="h-4 w-4 mr-2" />
              Stop Recording
            </Button>
          )}
          
          {recordedVideo && !isRecording && (
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setRecordedVideo(null);
                  if (videoRef.current) {
                    videoRef.current.srcObject = null;
                  }
                }}
                variant="outline"
                size="lg"
              >
                Record Again
              </Button>
              <Button
                onClick={analyzeVideo}
                disabled={isAnalyzing}
                size="lg"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isAnalyzing ? "Analyzing..." : "Analyze Video"}
              </Button>
            </div>
          )}
        </div>

        {isAnalyzing && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full mb-2"></div>
            <p className="text-blue-800">
              Analyzing your speech... This may take a few minutes.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoRecorder;
