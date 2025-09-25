-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    current_challenge INTEGER DEFAULT 1,
    total_xp INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    badges TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenges_metadata table
CREATE TABLE IF NOT EXISTS challenges_metadata (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) NOT NULL,
    xp_reward INTEGER NOT NULL,
    estimated_time INTEGER NOT NULL, -- in minutes
    prerequisites INTEGER[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    challenge_id INTEGER REFERENCES challenges_metadata(id),
    code TEXT NOT NULL,
    status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    attempts INTEGER DEFAULT 1,
    time_spent INTEGER DEFAULT 0, -- in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Insert initial challenge metadata
INSERT INTO challenges_metadata (id, title, description, difficulty, xp_reward, estimated_time, prerequisites) VALUES
(1, 'Página em Branco', 'O Quple está com uma página completamente em branco! Os usuários não conseguem fazer login. Você precisa criar a estrutura HTML básica para a tela de login.', 'easy', 50, 30, '{}'),
(2, 'Formulário Incompleto', 'O formulário de cadastro do Quple está incompleto! Faltam alguns campos importantes que os usuários precisam preencher.', 'easy', 60, 45, '{1}'),
(3, 'Links Quebrados', 'A navegação do Quple está quebrada! Os links não estão levando para lugar nenhum e alguns botões importantes sumiram.', 'easy', 70, 45, '{2}'),
(4, 'Conteúdo Bagunçado', 'O HTML do Quple está todo bagunçado! A hierarquia de títulos está errada e o conteúdo está sem organização semântica.', 'medium', 80, 60, '{3}'),
(5, 'App Sem Cor', 'O Quple está todo sem cor e sem personalidade! Os usuários estão reclamando que está muito feio. Adicione cores, tipografia e estilo básico.', 'medium', 90, 90, '{4}');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_submissions_student_id ON submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_challenge_id ON submissions(challenge_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges_metadata ENABLE ROW LEVEL SECURITY;

-- Create policies for students table
CREATE POLICY "Students can view their own data" ON students
    FOR SELECT USING (auth.uid()::uuid = id OR auth.uid() IS NULL);

CREATE POLICY "Students can insert their own data" ON students
    FOR INSERT WITH CHECK (auth.uid()::uuid = id OR auth.uid() IS NULL);

CREATE POLICY "Students can update their own data" ON students
    FOR UPDATE USING (auth.uid()::uuid = id OR auth.uid() IS NULL);

-- Create policies for submissions table
CREATE POLICY "Students can view their own submissions" ON submissions
    FOR SELECT USING (auth.uid()::uuid = student_id OR auth.uid() IS NULL);

CREATE POLICY "Students can insert their own submissions" ON submissions
    FOR INSERT WITH CHECK (auth.uid()::uuid = student_id OR auth.uid() IS NULL);

CREATE POLICY "Students can update their own submissions" ON submissions
    FOR UPDATE USING (auth.uid()::uuid = student_id OR auth.uid() IS NULL);

-- Create policies for challenges_metadata table (read-only for all users)
CREATE POLICY "Anyone can read challenges metadata" ON challenges_metadata
    FOR SELECT USING (true);