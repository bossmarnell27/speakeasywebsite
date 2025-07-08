
-- Create a table to store transcription accuracy ratings
CREATE TABLE public.transcription_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  transcript TEXT NOT NULL,
  accuracy_rating INTEGER NOT NULL CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.transcription_ratings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access (since this is a public analysis tool)
CREATE POLICY "Public can view all ratings" 
  ON public.transcription_ratings 
  FOR SELECT 
  TO public 
  USING (true);

-- Create policy to allow public insert
CREATE POLICY "Public can create ratings" 
  ON public.transcription_ratings 
  FOR INSERT 
  TO public 
  WITH CHECK (true);
