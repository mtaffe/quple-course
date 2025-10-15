-- ============================================================================
-- QUIZ ATTEMPTS TRACKING
-- ============================================================================
-- Tracks student quiz attempts, scores, and XP earned
-- Created: 2025-01-15
-- ============================================================================

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Quiz identification
  quiz_id TEXT NOT NULL,              -- e.g., 'html-fundamentals-lesson-1-quiz'
  topic_slug TEXT NOT NULL,           -- e.g., 'html-fundamentals'
  lesson_id TEXT NOT NULL,            -- e.g., 'lesson-1'

  -- Attempt details
  attempt_number INTEGER DEFAULT 1,   -- 1st, 2nd, 3rd attempt

  -- Scoring
  score INTEGER NOT NULL,             -- Points obtained
  max_score INTEGER NOT NULL,         -- Maximum possible points
  percentage INTEGER NOT NULL,        -- Score percentage (0-100)
  passed BOOLEAN NOT NULL DEFAULT FALSE, -- Whether student passed

  -- XP and rewards
  xp_earned INTEGER DEFAULT 0,        -- XP earned from this attempt

  -- Question-level details (JSON)
  answers JSONB,                      -- Array of {questionId, answer, correct, pointsEarned}

  -- Time tracking
  time_spent INTEGER,                 -- Time in seconds
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP DEFAULT NOW(),

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),

  -- Constraints
  CHECK (score >= 0),
  CHECK (max_score > 0),
  CHECK (percentage >= 0 AND percentage <= 100),
  CHECK (xp_earned >= 0),
  CHECK (attempt_number > 0)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student
  ON quiz_attempts(student_id);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz
  ON quiz_attempts(quiz_id);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_topic
  ON quiz_attempts(topic_slug);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_quiz
  ON quiz_attempts(student_id, quiz_id);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_completed
  ON quiz_attempts(completed_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Students can only see their own attempts
CREATE POLICY "Students can view own quiz attempts"
  ON quiz_attempts
  FOR SELECT
  USING (auth.uid() = student_id);

-- Students can insert their own attempts
CREATE POLICY "Students can insert own quiz attempts"
  ON quiz_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Students CANNOT update or delete attempts (immutable record)
-- No UPDATE or DELETE policies = attempts are permanent

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get best attempt for a quiz
CREATE OR REPLACE FUNCTION get_best_quiz_attempt(
  p_student_id UUID,
  p_quiz_id TEXT
)
RETURNS TABLE (
  id UUID,
  score INTEGER,
  max_score INTEGER,
  percentage INTEGER,
  xp_earned INTEGER,
  completed_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    qa.id,
    qa.score,
    qa.max_score,
    qa.percentage,
    qa.xp_earned,
    qa.completed_at
  FROM quiz_attempts qa
  WHERE qa.student_id = p_student_id
    AND qa.quiz_id = p_quiz_id
  ORDER BY qa.percentage DESC, qa.completed_at ASC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get quiz statistics for a student
CREATE OR REPLACE FUNCTION get_student_quiz_stats(
  p_student_id UUID
)
RETURNS TABLE (
  total_quizzes_taken INTEGER,
  total_quizzes_passed INTEGER,
  average_score INTEGER,
  total_xp_earned INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT quiz_id)::INTEGER as total_quizzes_taken,
    COUNT(DISTINCT quiz_id) FILTER (WHERE passed = true)::INTEGER as total_quizzes_passed,
    COALESCE(AVG(percentage)::INTEGER, 0) as average_score,
    COALESCE(SUM(xp_earned)::INTEGER, 0) as total_xp_earned
  FROM (
    -- Get only the best attempt for each quiz
    SELECT DISTINCT ON (quiz_id)
      quiz_id,
      passed,
      percentage,
      xp_earned
    FROM quiz_attempts
    WHERE student_id = p_student_id
    ORDER BY quiz_id, percentage DESC, completed_at ASC
  ) best_attempts;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get recent quiz activity
CREATE OR REPLACE FUNCTION get_recent_quiz_attempts(
  p_student_id UUID,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  quiz_id TEXT,
  topic_slug TEXT,
  percentage INTEGER,
  passed BOOLEAN,
  xp_earned INTEGER,
  completed_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    qa.id,
    qa.quiz_id,
    qa.topic_slug,
    qa.percentage,
    qa.passed,
    qa.xp_earned,
    qa.completed_at
  FROM quiz_attempts qa
  WHERE qa.student_id = p_student_id
  ORDER BY qa.completed_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if quiz was already completed successfully
CREATE OR REPLACE FUNCTION has_passed_quiz(
  p_student_id UUID,
  p_quiz_id TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM quiz_attempts
    WHERE student_id = p_student_id
      AND quiz_id = p_quiz_id
      AND passed = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- TRIGGER: Auto-update student XP after quiz completion
-- ============================================================================

CREATE OR REPLACE FUNCTION update_student_xp_from_quiz()
RETURNS TRIGGER AS $$
BEGIN
  -- Only add XP if student passed and it's their first time passing this quiz
  IF NEW.passed = true AND NOT has_passed_quiz(NEW.student_id, NEW.quiz_id) THEN
    UPDATE students
    SET
      total_xp = total_xp + NEW.xp_earned,
      updated_at = NOW()
    WHERE id = NEW.student_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_student_xp_from_quiz
  AFTER INSERT ON quiz_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_student_xp_from_quiz();

-- ============================================================================
-- SAMPLE QUERIES (for testing)
-- ============================================================================

-- Get all attempts for a student
-- SELECT * FROM quiz_attempts WHERE student_id = 'user-id' ORDER BY completed_at DESC;

-- Get best score for each quiz
-- SELECT DISTINCT ON (quiz_id)
--   quiz_id, score, max_score, percentage, xp_earned
-- FROM quiz_attempts
-- WHERE student_id = 'user-id'
-- ORDER BY quiz_id, percentage DESC;

-- Get quiz statistics
-- SELECT * FROM get_student_quiz_stats('user-id');

-- Get recent activity
-- SELECT * FROM get_recent_quiz_attempts('user-id', 5);

-- Check if passed
-- SELECT has_passed_quiz('user-id', 'html-fundamentals-lesson-1-quiz');
