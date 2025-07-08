
-- Create a table to store speech analysis results
CREATE TABLE public.speech_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL UNIQUE,
  filler_words TEXT,
  rhythm TEXT,
  body_language TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.speech_analyses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access (since this is a public analysis tool)
CREATE POLICY "Public can view all analyses" 
  ON public.speech_analyses 
  FOR SELECT 
  TO public 
  USING (true);

-- Create policy to allow public insert
CREATE POLICY "Public can create analyses" 
  ON public.speech_analyses 
  FOR INSERT 
  TO public 
  WITH CHECK (true);

-- Create policy to allow public updates
CREATE POLICY "Public can update analyses" 
  ON public.speech_analyses 
  FOR UPDATE 
  TO public 
  USING (true);
