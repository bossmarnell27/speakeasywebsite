/*
  # Create core tables for SpeakEasy platform

  1. New Tables
    - `teachers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `created_at` (timestamp)
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `grade` (text)
      - `teacher_id` (uuid, foreign key to teachers)
      - `created_at` (timestamp)
    - `assignments`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `due_date` (date)
      - `time_limit` (integer, minutes)
      - `difficulty` (text)
      - `teacher_id` (uuid, foreign key to teachers)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `student_assignments`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key to students)
      - `assignment_id` (uuid, foreign key to assignments)
      - `status` (text)
      - `submitted_at` (timestamp)
      - `graded_at` (timestamp)
      - `created_at` (timestamp)
    - `assignment_scores`
      - `id` (uuid, primary key)
      - `student_assignment_id` (uuid, foreign key to student_assignments)
      - `overall_score` (integer)
      - `tone_score` (integer)
      - `tone_feedback` (text)
      - `rhythm_score` (integer)
      - `rhythm_feedback` (text)
      - `body_language_score` (integer)
      - `body_language_feedback` (text)
      - `filler_words_um` (integer, default 0)
      - `filler_words_like` (integer, default 0)
      - `filler_words_you_know` (integer, default 0)
      - `recording_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (for prototype)

  3. Sample Data
    - One teacher: Ms. Johnson
    - One student: Emma Thompson
    - One assignment: Persuasive Speech
    - Sample scores and feedback
*/

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  grade text NOT NULL DEFAULT '8A',
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  due_date date NOT NULL,
  time_limit integer NOT NULL DEFAULT 3,
  difficulty text NOT NULL DEFAULT 'Medium',
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create student_assignments junction table
CREATE TABLE IF NOT EXISTS student_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'Not Started',
  submitted_at timestamptz,
  graded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, assignment_id)
);

-- Create assignment_scores table
CREATE TABLE IF NOT EXISTS assignment_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_assignment_id uuid REFERENCES student_assignments(id) ON DELETE CASCADE,
  overall_score integer NOT NULL DEFAULT 0,
  tone_score integer NOT NULL DEFAULT 0,
  tone_feedback text DEFAULT '',
  rhythm_score integer NOT NULL DEFAULT 0,
  rhythm_feedback text DEFAULT '',
  body_language_score integer NOT NULL DEFAULT 0,
  body_language_feedback text DEFAULT '',
  filler_words_um integer DEFAULT 0,
  filler_words_like integer DEFAULT 0,
  filler_words_you_know integer DEFAULT 0,
  recording_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_scores ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for prototype)
CREATE POLICY "Public can view teachers" ON teachers FOR SELECT TO public USING (true);
CREATE POLICY "Public can create teachers" ON teachers FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can update teachers" ON teachers FOR UPDATE TO public USING (true);

CREATE POLICY "Public can view students" ON students FOR SELECT TO public USING (true);
CREATE POLICY "Public can create students" ON students FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can update students" ON students FOR UPDATE TO public USING (true);

CREATE POLICY "Public can view assignments" ON assignments FOR SELECT TO public USING (true);
CREATE POLICY "Public can create assignments" ON assignments FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can update assignments" ON assignments FOR UPDATE TO public USING (true);

CREATE POLICY "Public can view student assignments" ON student_assignments FOR SELECT TO public USING (true);
CREATE POLICY "Public can create student assignments" ON student_assignments FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can update student assignments" ON student_assignments FOR UPDATE TO public USING (true);

CREATE POLICY "Public can view assignment scores" ON assignment_scores FOR SELECT TO public USING (true);
CREATE POLICY "Public can create assignment scores" ON assignment_scores FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public can update assignment scores" ON assignment_scores FOR UPDATE TO public USING (true);

-- Insert sample data
INSERT INTO teachers (id, name, email) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Ms. Johnson', 'ms.johnson@school.edu');

INSERT INTO students (id, name, email, grade, teacher_id) VALUES 
('550e8400-e29b-41d4-a716-446655440002', 'Emma Thompson', 'emma.thompson@school.edu', '8A', '550e8400-e29b-41d4-a716-446655440001');

INSERT INTO assignments (id, title, description, due_date, time_limit, difficulty, teacher_id) VALUES 
('550e8400-e29b-41d4-a716-446655440003', 'Persuasive Speech: Environmental Action', 'Prepare a 3-minute persuasive speech about an environmental issue you care about. Focus on clear arguments, emotional appeal, and call to action.', '2025-05-15', 3, 'Medium', '550e8400-e29b-41d4-a716-446655440001');

INSERT INTO student_assignments (id, student_id, assignment_id, status, submitted_at, graded_at) VALUES 
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'Graded', '2025-05-12T10:30:00Z', '2025-05-13T14:20:00Z');

INSERT INTO assignment_scores (student_assignment_id, overall_score, tone_score, tone_feedback, rhythm_score, rhythm_feedback, body_language_score, body_language_feedback, filler_words_um, filler_words_like, filler_words_you_know, recording_url) VALUES 
('550e8400-e29b-41d4-a716-446655440004', 88, 85, 'Good vocal variety and emotional expression. Try to project your voice more in the conclusion.', 90, 'Excellent pacing throughout the speech. Good use of pauses for emphasis.', 86, 'Strong eye contact and confident posture. Consider using more hand gestures to emphasize key points.', 2, 1, 1, 'https://example.com/recording/emma-speech-1');