-- React Learning Playground - Supabase Database Schema

-- Users table extending Supabase Auth
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  username VARCHAR(20) UNIQUE NOT NULL,
  data_nascimento DATE NOT NULL,
  nivel_experiencia VARCHAR(20) NOT NULL CHECK (nivel_experiencia IN ('iniciante', 'basico', 'intermediario', 'avancado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Additional profile fields
  avatar_url VARCHAR(500),
  bio TEXT,

  -- Preferences
  theme VARCHAR(10) DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  language VARCHAR(5) DEFAULT 'pt-BR',

  CONSTRAINT username_length CHECK (LENGTH(username) >= 3 AND LENGTH(username) <= 20),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$'),
  CONSTRAINT nome_length CHECK (LENGTH(nome) >= 2),
  CONSTRAINT sobrenome_length CHECK (LENGTH(sobrenome) >= 2)
);

-- Student progress tracking
CREATE TABLE public.student_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,

  -- XP and Level System
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  xp_to_next_level INTEGER DEFAULT 100,

  -- Streak tracking
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  last_activity_date DATE,

  -- Challenge progress
  challenges_completed INTEGER DEFAULT 0,
  total_challenges INTEGER DEFAULT 5,

  -- Time tracking
  total_study_time INTEGER DEFAULT 0, -- in minutes
  average_session_time INTEGER DEFAULT 0, -- in minutes

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Challenge completions
CREATE TABLE public.challenge_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_id VARCHAR(50) NOT NULL,

  -- Completion details
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  completion_time INTEGER, -- in seconds
  attempts INTEGER DEFAULT 1,
  xp_earned INTEGER DEFAULT 0,

  -- Code submission
  final_code TEXT,
  passed_tests INTEGER DEFAULT 0,
  total_tests INTEGER DEFAULT 0,

  -- Hints used
  hints_used INTEGER DEFAULT 0,
  hint_penalty INTEGER DEFAULT 0,

  UNIQUE(user_id, challenge_id)
);

-- Badges system
CREATE TABLE public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id VARCHAR(50) NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),

  -- Badge details
  badge_name VARCHAR(100) NOT NULL,
  badge_description TEXT,
  badge_icon VARCHAR(10),
  badge_color VARCHAR(20),

  UNIQUE(user_id, badge_id)
);

-- Study sessions
CREATE TABLE public.study_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,

  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration INTEGER, -- in minutes

  challenges_attempted TEXT[], -- array of challenge IDs
  challenges_completed TEXT[], -- array of challenge IDs
  xp_gained INTEGER DEFAULT 0,

  session_type VARCHAR(20) DEFAULT 'practice' CHECK (session_type IN ('practice', 'review', 'challenge'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see and update their own data

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Student progress policies
CREATE POLICY "Users can view their own progress" ON public.student_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.student_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.student_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Challenge completions policies
CREATE POLICY "Users can view their own completions" ON public.challenge_completions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own completions" ON public.challenge_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User badges policies
CREATE POLICY "Users can view their own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Study sessions policies
CREATE POLICY "Users can view their own sessions" ON public.study_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" ON public.study_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON public.study_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, nome, sobrenome, username, data_nascimento, nivel_experiencia)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'sobrenome', 'Name'),
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || EXTRACT(EPOCH FROM NOW())::INTEGER),
    COALESCE((NEW.raw_user_meta_data->>'data_nascimento')::DATE, CURRENT_DATE - INTERVAL '18 years'),
    COALESCE(NEW.raw_user_meta_data->>'nivel_experiencia', 'iniciante')
  );

  INSERT INTO public.student_progress (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update progress
CREATE OR REPLACE FUNCTION public.update_user_progress(
  p_user_id UUID,
  p_xp_gained INTEGER,
  p_challenge_id VARCHAR(50)
)
RETURNS VOID AS $$
DECLARE
  current_progress RECORD;
BEGIN
  -- Get current progress
  SELECT * INTO current_progress
  FROM public.student_progress
  WHERE user_id = p_user_id;

  -- Update progress
  UPDATE public.student_progress
  SET
    total_xp = total_xp + p_xp_gained,
    challenges_completed = challenges_completed + 1,
    last_activity_date = CURRENT_DATE,
    updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Check for level up
  PERFORM public.check_level_up(p_user_id);

  -- Update streak
  PERFORM public.update_streak(p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check level up
CREATE OR REPLACE FUNCTION public.check_level_up(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  current_progress RECORD;
  new_level INTEGER;
BEGIN
  SELECT * INTO current_progress
  FROM public.student_progress
  WHERE user_id = p_user_id;

  -- Calculate new level (100 XP per level, increasing)
  new_level := FLOOR(current_progress.total_xp / 100) + 1;

  IF new_level > current_progress.current_level THEN
    UPDATE public.student_progress
    SET
      current_level = new_level,
      xp_to_next_level = (new_level * 100) - current_progress.total_xp,
      updated_at = NOW()
    WHERE user_id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update streak
CREATE OR REPLACE FUNCTION public.update_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  last_date DATE;
  current_streak_val INTEGER;
BEGIN
  SELECT last_activity_date, current_streak
  INTO last_date, current_streak_val
  FROM public.student_progress
  WHERE user_id = p_user_id;

  IF last_date = CURRENT_DATE THEN
    -- Already studied today, no change
    RETURN;
  ELSIF last_date = CURRENT_DATE - INTERVAL '1 day' THEN
    -- Consecutive day, increment streak
    UPDATE public.student_progress
    SET
      current_streak = current_streak + 1,
      best_streak = GREATEST(best_streak, current_streak + 1),
      last_activity_date = CURRENT_DATE,
      updated_at = NOW()
    WHERE user_id = p_user_id;
  ELSE
    -- Streak broken, reset to 1
    UPDATE public.student_progress
    SET
      current_streak = 1,
      last_activity_date = CURRENT_DATE,
      updated_at = NOW()
    WHERE user_id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Indexes for performance
CREATE INDEX idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX idx_user_profiles_created_at ON public.user_profiles(created_at);
CREATE INDEX idx_student_progress_user_id ON public.student_progress(user_id);
CREATE INDEX idx_challenge_completions_user_id ON public.challenge_completions(user_id);
CREATE INDEX idx_challenge_completions_challenge_id ON public.challenge_completions(challenge_id);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_study_sessions_user_id ON public.study_sessions(user_id);
CREATE INDEX idx_study_sessions_started_at ON public.study_sessions(started_at);

-- Sample badges data
INSERT INTO public.user_badges (user_id, badge_id, badge_name, badge_description, badge_icon, badge_color)
SELECT
  '00000000-0000-0000-0000-000000000000'::UUID, -- Replace with actual user ID
  unnest(ARRAY['first-challenge', 'streak-3', 'streak-7', 'html-master', 'css-expert', 'js-ninja', 'react-hero']),
  unnest(ARRAY['Primeiro Desafio', 'Streak de 3 dias', 'Streak de 7 dias', 'Mestre HTML', 'Expert CSS', 'Ninja JavaScript', 'Herói React']),
  unnest(ARRAY['Completou o primeiro desafio', 'Estudou por 3 dias consecutivos', 'Estudou por 7 dias consecutivos', 'Dominou HTML básico', 'Especialista em CSS', 'Expert em JavaScript', 'Dominou React básico']),
  unnest(ARRAY['🏆', '🔥', '💫', '📄', '🎨', '⚡', '⚛️']),
  unnest(ARRAY['yellow', 'orange', 'purple', 'blue', 'green', 'red', 'cyan'])
WHERE FALSE; -- Don't actually insert, this is just for reference