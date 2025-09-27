-- Add last_activity_date column to students table
ALTER TABLE students
ADD COLUMN IF NOT EXISTS last_activity_date DATE DEFAULT CURRENT_DATE;

-- Update existing students to have a last activity date
UPDATE students
SET last_activity_date = CURRENT_DATE
WHERE last_activity_date IS NULL;