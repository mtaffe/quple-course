-- Weekly Module Progress Tracking
CREATE TABLE IF NOT EXISTS student_week_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    week_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
    
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    -- Theory progress
    theory_progress JSONB DEFAULT '{"sectionsCompleted": [], "readingTime": 0}'::jsonb,
    
    -- Challenges progress
    challenges_progress JSONB DEFAULT '[]'::jsonb,
    
    -- Project progress
    project_progress JSONB DEFAULT '{"status": "not_started"}'::jsonb,
    
    -- Pre-class checklist
    pre_class_checklist_completed BOOLEAN DEFAULT FALSE,
    ready_for_live_class BOOLEAN DEFAULT FALSE,
    
    -- Totals
    total_xp_earned INTEGER DEFAULT 0,
    total_time_spent INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(student_id, week_id)
);

-- Cohort and Live Class Management
CREATE TABLE IF NOT EXISTS cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    mentor_id TEXT NOT NULL,
    max_students INTEGER DEFAULT 5 CHECK (max_students > 0 AND max_students <= 5),
    timezone TEXT DEFAULT 'America/Sao_Paulo',
    language TEXT DEFAULT 'pt-BR',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cohort_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(cohort_id, student_id)
);

CREATE TABLE IF NOT EXISTS live_class_schedule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    week_id TEXT NOT NULL,
    class_date TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    one_on_one_slots_available BOOLEAN DEFAULT TRUE,
    
    meeting_link TEXT,
    recording_link TEXT,
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(cohort_id, week_number)
);

CREATE TABLE IF NOT EXISTS one_on_one_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    mentor_id TEXT NOT NULL,
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    
    meeting_link TEXT,
    notes TEXT,
    mentor_feedback TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weekly Challenge Submissions
CREATE TABLE IF NOT EXISTS challenge_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    week_id TEXT NOT NULL,
    challenge_id TEXT NOT NULL,
    
    code TEXT NOT NULL,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'passed', 'failed')),
    
    xp_earned INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 1,
    
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(student_id, week_id, challenge_id, submitted_at)
);

-- Weekly Project Submissions
CREATE TABLE IF NOT EXISTS project_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    week_id TEXT NOT NULL,
    
    repository_url TEXT,
    live_url TEXT,
    description TEXT,
    
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'needs_revision')),
    grade TEXT CHECK (grade IN ('excellent', 'good', 'needs_improvement')),
    
    mentor_feedback TEXT,
    xp_earned INTEGER DEFAULT 0,
    
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    
    UNIQUE(student_id, week_id)
);

-- Indexes for performance
CREATE INDEX idx_student_week_progress_student ON student_week_progress(student_id);
CREATE INDEX idx_student_week_progress_week ON student_week_progress(week_id);
CREATE INDEX idx_student_week_progress_status ON student_week_progress(status);

CREATE INDEX idx_cohort_students_cohort ON cohort_students(cohort_id);
CREATE INDEX idx_cohort_students_student ON cohort_students(student_id);

CREATE INDEX idx_live_class_schedule_cohort ON live_class_schedule(cohort_id);
CREATE INDEX idx_live_class_schedule_date ON live_class_schedule(class_date);

CREATE INDEX idx_challenge_submissions_student ON challenge_submissions(student_id);
CREATE INDEX idx_challenge_submissions_week ON challenge_submissions(week_id);

CREATE INDEX idx_project_submissions_student ON project_submissions(student_id);
CREATE INDEX idx_project_submissions_week ON project_submissions(week_id);
CREATE INDEX idx_project_submissions_status ON project_submissions(status);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_student_week_progress_updated_at
    BEFORE UPDATE ON student_week_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cohorts_updated_at
    BEFORE UPDATE ON cohorts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_live_class_schedule_updated_at
    BEFORE UPDATE ON live_class_schedule
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_one_on_one_sessions_updated_at
    BEFORE UPDATE ON one_on_one_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE student_week_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_class_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE one_on_one_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;

-- Students can view and update their own progress
CREATE POLICY "Students can view own week progress"
    ON student_week_progress FOR SELECT
    USING (student_id = auth.uid());

CREATE POLICY "Students can update own week progress"
    ON student_week_progress FOR UPDATE
    USING (student_id = auth.uid());

CREATE POLICY "Students can insert own week progress"
    ON student_week_progress FOR INSERT
    WITH CHECK (student_id = auth.uid());

-- Students can view cohorts they're part of
CREATE POLICY "Students can view own cohorts"
    ON cohorts FOR SELECT
    USING (id IN (SELECT cohort_id FROM cohort_students WHERE student_id = auth.uid()));

-- Students can view their cohort memberships
CREATE POLICY "Students can view own cohort memberships"
    ON cohort_students FOR SELECT
    USING (student_id = auth.uid());

-- Students can view live classes for their cohorts
CREATE POLICY "Students can view cohort live classes"
    ON live_class_schedule FOR SELECT
    USING (cohort_id IN (SELECT cohort_id FROM cohort_students WHERE student_id = auth.uid()));

-- Students can manage their own 1:1 sessions
CREATE POLICY "Students can manage own 1:1 sessions"
    ON one_on_one_sessions FOR ALL
    USING (student_id = auth.uid());

-- Challenge submissions
CREATE POLICY "Students can manage own challenge submissions"
    ON challenge_submissions FOR ALL
    USING (student_id = auth.uid());

-- Project submissions
CREATE POLICY "Students can manage own project submissions"
    ON project_submissions FOR ALL
    USING (student_id = auth.uid());
