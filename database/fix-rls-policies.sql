-- Fix RLS policies for user_preferences to properly handle UUID conversion

-- Drop existing policy
DROP POLICY IF EXISTS "Users can manage their preferences" ON user_preferences;

-- Recreate with proper UUID casting
CREATE POLICY "Users can manage their preferences" ON user_preferences
  FOR ALL USING (auth.uid()::uuid = student_id);

-- Fix other policies that might have the same issue
DROP POLICY IF EXISTS "Users can manage their custom themes" ON custom_themes;
CREATE POLICY "Users can manage their custom themes" ON custom_themes
  FOR ALL USING (auth.uid()::uuid = student_id);

-- Analytics policies fixes
DROP POLICY IF EXISTS "Users can manage their own analytics" ON analytics_events;
CREATE POLICY "Users can manage their own analytics" ON analytics_events
  FOR ALL USING (auth.uid()::uuid = student_id);

DROP POLICY IF EXISTS "Users can manage their own sessions" ON analytics_sessions;
CREATE POLICY "Users can manage their own sessions" ON analytics_sessions
  FOR ALL USING (auth.uid()::uuid = student_id);

DROP POLICY IF EXISTS "Users can view their own heatmap data" ON heatmap_data;
CREATE POLICY "Users can view their own heatmap data" ON heatmap_data
  FOR ALL USING (auth.uid()::uuid = student_id);

-- Social policies fixes
DROP POLICY IF EXISTS "Users can manage their friendships" ON friendships;
CREATE POLICY "Users can manage their friendships" ON friendships
  FOR ALL USING (auth.uid()::uuid = requester_id OR auth.uid()::uuid = addressee_id);

DROP POLICY IF EXISTS "Users can manage their friend codes" ON friend_codes;
CREATE POLICY "Users can manage their friend codes" ON friend_codes
  FOR ALL USING (auth.uid()::uuid = student_id);

DROP POLICY IF EXISTS "Users can manage their group memberships" ON study_group_members;
CREATE POLICY "Users can manage their group memberships" ON study_group_members
  FOR ALL USING (auth.uid()::uuid = student_id);

DROP POLICY IF EXISTS "Users can manage their challenge participation" ON social_challenge_participants;
CREATE POLICY "Users can manage their challenge participation" ON social_challenge_participants
  FOR ALL USING (auth.uid()::uuid = student_id);

-- Goals policies fixes
DROP POLICY IF EXISTS "Users can manage their daily goals" ON daily_goals;
CREATE POLICY "Users can manage their daily goals" ON daily_goals
  FOR ALL USING (auth.uid()::uuid = student_id);

-- Hints policies fixes
DROP POLICY IF EXISTS "Users can manage their hint history" ON hint_history;
CREATE POLICY "Users can manage their hint history" ON hint_history
  FOR ALL USING (auth.uid()::uuid = student_id);