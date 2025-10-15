-- ============================================================================
-- READING PROGRESS TRACKING
-- ============================================================================
-- Tracks student progress through learning content (lessons, sections)
-- Created: 2025-01-15
-- ============================================================================

-- Create reading_progress table
CREATE TABLE IF NOT EXISTS reading_progress (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Content identification
  topic_slug TEXT NOT NULL,           -- e.g., 'html-fundamentals'
  lesson_id TEXT NOT NULL,            -- e.g., 'lesson-1'
  section_id TEXT,                    -- Optional: specific section

  -- Progress tracking
  status TEXT NOT NULL DEFAULT 'in_progress',  -- 'not_started', 'in_progress', 'completed'
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),

  -- Time tracking
  time_spent INTEGER DEFAULT 0,       -- Total time in seconds
  started_at TIMESTAMP DEFAULT NOW(),
  last_accessed_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Constraints
  UNIQUE(student_id, topic_slug, lesson_id, section_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reading_progress_student
  ON reading_progress(student_id);

CREATE INDEX IF NOT EXISTS idx_reading_progress_topic
  ON reading_progress(topic_slug);

CREATE INDEX IF NOT EXISTS idx_reading_progress_status
  ON reading_progress(student_id, status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;

-- Students can only see their own progress
CREATE POLICY "Students can view own reading progress"
  ON reading_progress
  FOR SELECT
  USING (auth.uid() = student_id);

-- Students can insert their own progress
CREATE POLICY "Students can insert own reading progress"
  ON reading_progress
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Students can update their own progress
CREATE POLICY "Students can update own reading progress"
  ON reading_progress
  FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- Students can delete their own progress (optional - for reset)
CREATE POLICY "Students can delete own reading progress"
  ON reading_progress
  FOR DELETE
  USING (auth.uid() = student_id);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_reading_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_reading_progress_updated_at
  BEFORE UPDATE ON reading_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_reading_progress_updated_at();

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get total time spent on a topic
CREATE OR REPLACE FUNCTION get_topic_time_spent(
  p_student_id UUID,
  p_topic_slug TEXT
)
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE(
    (SELECT SUM(time_spent)
     FROM reading_progress
     WHERE student_id = p_student_id
       AND topic_slug = p_topic_slug),
    0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get topic completion percentage
CREATE OR REPLACE FUNCTION get_topic_completion_percentage(
  p_student_id UUID,
  p_topic_slug TEXT
)
RETURNS INTEGER AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
BEGIN
  -- Count total unique lessons in this topic
  SELECT COUNT(DISTINCT lesson_id)
  INTO total_lessons
  FROM reading_progress
  WHERE student_id = p_student_id
    AND topic_slug = p_topic_slug;

  -- Count completed lessons
  SELECT COUNT(DISTINCT lesson_id)
  INTO completed_lessons
  FROM reading_progress
  WHERE student_id = p_student_id
    AND topic_slug = p_topic_slug
    AND status = 'completed';

  -- Return percentage
  IF total_lessons = 0 THEN
    RETURN 0;
  END IF;

  RETURN (completed_lessons * 100) / total_lessons;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SAMPLE QUERIES (for testing)
-- ============================================================================

-- Get all progress for a student
-- SELECT * FROM reading_progress WHERE student_id = 'user-id' ORDER BY last_accessed_at DESC;

-- Get progress for specific topic
-- SELECT * FROM reading_progress WHERE student_id = 'user-id' AND topic_slug = 'html-fundamentals';

-- Get recently accessed content
-- SELECT * FROM reading_progress WHERE student_id = 'user-id' ORDER BY last_accessed_at DESC LIMIT 5;

-- Get completion stats
-- SELECT
--   topic_slug,
--   COUNT(*) as total_lessons,
--   COUNT(*) FILTER (WHERE status = 'completed') as completed_lessons,
--   SUM(time_spent) as total_time
-- FROM reading_progress
-- WHERE student_id = 'user-id'
-- GROUP BY topic_slug;
