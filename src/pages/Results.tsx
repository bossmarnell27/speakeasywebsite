import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MessageSquare, Timer, User, FileText } from "lucide-react";
import TranscriptionRating from "@/components/TranscriptionRating";

interface AnalysisData {
  id: string;
  session_id: string;
  filler_words: string | null;
  rhythm: string | null;
  body_language: string | null;
  transcript: string | null;
  status: string;
  created_at: string;
}

const Results = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!sessionId) {
        setError("No session ID provided");
        setLoading(false);
        return;
      }

      console.log('Fetching results for sessionId:', sessionId);

      try {
        const { data, error } = await supabase
          .from('speech_analyses')
          .select('*')
          .eq('session_id', sessionId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching results:', error);
          setError("Failed to load analysis results");
        } else if (data) {
          console.log('Found analysis data:', data);
          setAnalysisData(data);
        } else {
          setError("No analysis found for this session");
        }
      } catch (err) {
        console.error('Error:', err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full mb-4"></div>
          <p className="text-lg text-gray-700">Loading your analysis results...</p>
        </div>
      </div>
    );
  }

  if (error || !analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || "No data available"}</p>
              <Button onClick={() => navigate('/')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (analysisData.status !== 'done') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full mb-4"></div>
              <p className="text-lg text-gray-700 mb-2">Analysis in Progress</p>
              <p className="text-gray-600 mb-4">
                Your speech analysis is still being processed. Please wait...
              </p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={() => navigate('/')} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Speech Analysis Results
          </h1>
          <p className="text-gray-600">
            Session ID: {analysisData.session_id}
          </p>
        </div>

        {/* Transcript Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {analysisData.transcript ? (
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {analysisData.transcript}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No transcript available</p>
              )}
            </div>
            
            {/* Add the transcription rating component */}
            {analysisData.transcript && (
              <TranscriptionRating 
                sessionId={analysisData.session_id} 
                transcript={analysisData.transcript} 
              />
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Filler Words Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {analysisData.filler_words ? (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {analysisData.filler_words}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">No filler words analysis available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-green-600" />
                Rhythm Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {analysisData.rhythm ? (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {analysisData.rhythm}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">No rhythm analysis available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Body Language Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {analysisData.body_language ? (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {analysisData.body_language}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">No body language analysis available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800">Transcript</h3>
                <p className="text-sm text-orange-600 mt-1">
                  {analysisData.transcript ? "Available" : "No Data"}
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Filler Words</h3>
                <p className="text-sm text-blue-600 mt-1">
                  {analysisData.filler_words ? "Analysis Complete" : "No Data"}
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Speech Rhythm</h3>
                <p className="text-sm text-green-600 mt-1">
                  {analysisData.rhythm ? "Analysis Complete" : "No Data"}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800">Body Language</h3>
                <p className="text-sm text-purple-600 mt-1">
                  {analysisData.body_language ? "Analysis Complete" : "No Data"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
