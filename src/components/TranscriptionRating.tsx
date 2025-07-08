
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TranscriptionRatingProps {
  sessionId: string;
  transcript: string;
}

const TranscriptionRating = ({ sessionId, transcript }: TranscriptionRatingProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();

  const handleRatingSubmit = async (rating: number) => {
    if (!transcript) {
      toast({
        title: "Error",
        description: "No transcript available to rate.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSelectedRating(rating);

    try {
      const { error } = await supabase
        .from('transcription_ratings')
        .insert({
          session_id: sessionId,
          transcript: transcript,
          accuracy_rating: rating,
        });

      if (error) {
        console.error('Error submitting rating:', error);
        toast({
          title: "Error",
          description: "Failed to submit rating. Please try again.",
          variant: "destructive",
        });
      } else {
        setHasSubmitted(true);
        toast({
          title: "Rating Submitted",
          description: `Thank you for rating the transcription accuracy: ${rating}/5`,
        });
      }
    } catch (err) {
      console.error('Rating submission error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmitted) {
    return (
      <Card className="mt-4 border-green-200 bg-green-50">
        <CardContent className="pt-4">
          <div className="text-center">
            <div className="flex justify-center items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  className={`h-6 w-6 ${
                    num <= (selectedRating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-green-800 font-medium">
              Thank you for your feedback! You rated this transcription {selectedRating}/5
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Rate Transcription Accuracy</CardTitle>
        <p className="text-sm text-gray-600">
          PLEASE FILL OUT THIS QUICK SURVEY IT HELPS A LOT! How accurate is this transcription? (1 = Not accurate at all, 5 = Perfectly accurate)
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant={selectedRating === rating ? "default" : "outline"}
              size="lg"
              className="w-16 h-16 text-xl font-bold"
              onClick={() => handleRatingSubmit(rating)}
              disabled={isSubmitting}
            >
              {rating}
            </Button>
          ))}
        </div>
        {isSubmitting && (
          <div className="text-center mt-4">
            <div className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-blue-600 rounded-full"></div>
            <p className="text-sm text-gray-600 mt-2">Submitting rating...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TranscriptionRating;
