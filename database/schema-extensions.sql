-- =====================================================
-- SCHEMA EXTENSIONS FOR ADVANCED FEATURES
-- Analytics, Social, Themes & Preferences
-- =====================================================

-- 1. ANALYTICS TABLES
-- =====================================================

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'page_view', 'challenge_start', 'challenge_complete',
    'hint_used', 'code_change', 'error_encountered',
    'goal_completed', 'session_start', 'session_end',
    'user_inactive'
  )),
  challenge_id INTEGER,
  section_id TEXT,
  duration INTEGER, -- em milissegundos
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Sessions Table
CREATE TABLE IF NOT EXISTS analytics_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  session_id TEXT UNIQUE NOT NULL,
  challenge_id INTEGER,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  total_time INTEGER DEFAULT 0, -- em milissegundos
  active_time INTEGER DEFAULT 0,
  inactive_time INTEGER DEFAULT 0,
  events_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

-- Heatmap Data Table
CREATE TABLE IF NOT EXISTS heatmap_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  challenge_id INTEGER NOT NULL,
  section_id TEXT,
  difficulty_score DECIMAL(3,1) CHECK (difficulty_score >= 1 AND difficulty_score <= 10),
  error_count INTEGER DEFAULT 0,
  average_time INTEGER DEFAULT 0,
  completion_rate DECIMAL(3,2) DEFAULT 0,
  common_errors TEXT[] DEFAULT '{}',
  hint_usage_rate DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SOCIAL SYSTEM TABLES
-- =====================================================

-- Friends Table
CREATE TABLE IF NOT EXISTS friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES students(id) ON DELETE CASCADE,
  addressee_id UUID REFERENCES students(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(requester_id, addressee_id)
);

-- Friend Codes Table
CREATE TABLE IF NOT EXISTS friend_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Study Groups Table
CREATE TABLE IF NOT EXISTS study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES students(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT true,
  member_count INTEGER DEFAULT 1,
  max_members INTEGER DEFAULT 20,
  average_level DECIMAL(3,1) DEFAULT 1,
  total_xp INTEGER DEFAULT 0,
  current_challenge JSONB, -- {id, name, deadline, participants}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study Group Members Table
CREATE TABLE IF NOT EXISTS study_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, student_id)
);

-- Social Challenges Table
CREATE TABLE IF NOT EXISTS social_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('individual', 'group', 'global')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  participants_count INTEGER DEFAULT 0,
  prizes TEXT[] DEFAULT '{}',
  requirements JSONB DEFAULT '{}', -- {challengesCompleted, xpGained, etc}
  current_leader_id UUID REFERENCES students(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Challenge Participants Table
CREATE TABLE IF NOT EXISTS social_challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES social_challenges(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  progress JSONB DEFAULT '{}',
  completed BOOLEAN DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(challenge_id, student_id)
);

-- 3. THEMES & PREFERENCES TABLES
-- =====================================================

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  theme_id TEXT DEFAULT 'carbon-dark',
  reduced_motion BOOLEAN DEFAULT false,
  font_size TEXT DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large')),
  code_theme TEXT DEFAULT 'dark' CHECK (code_theme IN ('dark', 'light', 'high-contrast')),
  sound_effects BOOLEAN DEFAULT true,
  notifications BOOLEAN DEFAULT true,
  auto_save BOOLEAN DEFAULT true,
  compact_mode BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'pt' CHECK (language IN ('pt', 'en')),
  learning_style TEXT DEFAULT 'visual' CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic', 'reading')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom Themes Table
CREATE TABLE IF NOT EXISTS custom_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  theme_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  colors JSONB NOT NULL,
  effects JSONB DEFAULT '{}',
  category TEXT DEFAULT 'custom',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. DAILY GOALS TABLES
-- =====================================================

-- Daily Goals Table
CREATE TABLE IF NOT EXISTS daily_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('time', 'challenge', 'concept', 'custom')),
  target_value INTEGER NOT NULL,
  current_value INTEGER DEFAULT 0,
  unit TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  due_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 5. INTELLIGENT HINTS TABLE
-- =====================================================

-- User Hint History Table
CREATE TABLE IF NOT EXISTS hint_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  challenge_id INTEGER,
  hint_type TEXT NOT NULL,
  hint_content TEXT NOT NULL,
  error_context TEXT,
  was_helpful BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. INDEXES FOR PERFORMANCE
-- =====================================================

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_analytics_events_student_id ON analytics_events(student_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_challenge_id ON analytics_events(challenge_id);

-- Social indexes
CREATE INDEX IF NOT EXISTS idx_friendships_requester ON friendships(requester_id);
CREATE INDEX IF NOT EXISTS idx_friendships_addressee ON friendships(addressee_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_group ON study_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_student ON study_group_members(student_id);

-- Goals indexes
CREATE INDEX IF NOT EXISTS idx_daily_goals_student_date ON daily_goals(student_id, due_date);
CREATE INDEX IF NOT EXISTS idx_daily_goals_completed ON daily_goals(completed, due_date);

-- 7. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE heatmap_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE friend_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE hint_history ENABLE ROW LEVEL SECURITY;

-- Analytics policies
CREATE POLICY "Users can manage their own analytics" ON analytics_events
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Users can manage their own sessions" ON analytics_sessions
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Users can view their own heatmap data" ON heatmap_data
  FOR ALL USING (auth.uid() = student_id);

-- Social policies
CREATE POLICY "Users can manage their friendships" ON friendships
  FOR ALL USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

CREATE POLICY "Users can manage their friend codes" ON friend_codes
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Users can view public groups and manage their groups" ON study_groups
  FOR SELECT USING (is_public = true OR auth.uid() = owner_id);

CREATE POLICY "Group owners can update their groups" ON study_groups
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can manage their group memberships" ON study_group_members
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Users can view active challenges" ON social_challenges
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can manage their challenge participation" ON social_challenge_participants
  FOR ALL USING (auth.uid() = student_id);

-- Preferences policies
CREATE POLICY "Users can manage their preferences" ON user_preferences
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Users can manage their custom themes" ON custom_themes
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Users can view public themes" ON custom_themes
  FOR SELECT USING (is_public = true);

-- Goals policies
CREATE POLICY "Users can manage their daily goals" ON daily_goals
  FOR ALL USING (auth.uid() = student_id);

-- Hints policies
CREATE POLICY "Users can manage their hint history" ON hint_history
  FOR ALL USING (auth.uid() = student_id);

-- 8. FUNCTIONS FOR COMMON OPERATIONS
-- =====================================================

-- Function to generate friend code
CREATE OR REPLACE FUNCTION generate_friend_code()
RETURNS TEXT AS $$
DECLARE
    new_code TEXT;
    exists_code BOOLEAN;
BEGIN
    LOOP
        -- Generate 6-character code
        new_code := UPPER(
            SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 3) ||
            LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0')
        );

        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM friend_codes WHERE code = new_code) INTO exists_code;

        EXIT WHEN NOT exists_code;
    END LOOP;

    RETURN new_code;
END;
$$ LANGUAGE plpgsql;

-- Function to update group stats
CREATE OR REPLACE FUNCTION update_group_stats(group_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE study_groups SET
        member_count = (
            SELECT COUNT(*) FROM study_group_members
            WHERE group_id = group_uuid
        ),
        average_level = (
            SELECT COALESCE(AVG(
                CASE
                    WHEN s.total_xp < 100 THEN 1
                    WHEN s.total_xp < 300 THEN 2
                    WHEN s.total_xp < 600 THEN 3
                    WHEN s.total_xp < 1000 THEN 4
                    WHEN s.total_xp < 1500 THEN 5
                    ELSE 6
                END
            ), 1)
            FROM study_group_members sgm
            JOIN students s ON sgm.student_id = s.id
            WHERE sgm.group_id = group_uuid
        ),
        total_xp = (
            SELECT COALESCE(SUM(s.total_xp), 0)
            FROM study_group_members sgm
            JOIN students s ON sgm.student_id = s.id
            WHERE sgm.group_id = group_uuid
        ),
        updated_at = NOW()
    WHERE id = group_uuid;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update group stats when members change
CREATE OR REPLACE FUNCTION trigger_update_group_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        PERFORM update_group_stats(NEW.group_id);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM update_group_stats(OLD.group_id);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_group_member_stats
    AFTER INSERT OR UPDATE OR DELETE ON study_group_members
    FOR EACH ROW EXECUTE FUNCTION trigger_update_group_stats();

-- 9. INITIAL DATA
-- =====================================================

-- Insert some sample social challenges
INSERT INTO social_challenges (title, description, type, end_date, prizes, requirements) VALUES
('Desafio Semanal HTML', 'Complete 3 desafios HTML em uma semana', 'individual', NOW() + INTERVAL '7 days',
 ARRAY['Badge Especial', '200 XP Bonus'],
 '{"challengesCompleted": 3, "timeSpent": 10800000}'),
('Competição de Grupos', 'Qual grupo consegue mais XP coletivo?', 'group', NOW() + INTERVAL '14 days',
 ARRAY['Título de Grupo Elite', 'Badge Exclusivo'],
 '{"xpGained": 5000}'),
('Maratona Global de Código', 'Evento mundial de programação', 'global', NOW() + INTERVAL '30 days',
 ARRAY['Certificado Especial', '1000 XP', 'Badge Lendário'],
 '{"challengesCompleted": 10, "streakDays": 7}')
ON CONFLICT DO NOTHING;

-- Create default friend codes for existing users
INSERT INTO friend_codes (student_id, code)
SELECT id, generate_friend_code()
FROM students
WHERE id NOT IN (SELECT student_id FROM friend_codes WHERE student_id IS NOT NULL)
ON CONFLICT (student_id) DO NOTHING;