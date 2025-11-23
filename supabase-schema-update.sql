-- DnB Santa Database Schema Updates
-- Run this in your Supabase SQL Editor to add new fields

-- Add notes field for admin to save scripts and references
ALTER TABLE video_requests
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS script_used TEXT,
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English',
ADD COLUMN IF NOT EXISTS video_path TEXT,
ADD COLUMN IF NOT EXISTS error_message TEXT,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS progress TEXT;

-- Add bonus video tracking
ALTER TABLE video_requests
ADD COLUMN IF NOT EXISTS is_bonus_video BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS bonus_recipient_name TEXT;

-- Create index for bonus videos
CREATE INDEX IF NOT EXISTS idx_video_requests_bonus ON video_requests(is_bonus_video);

-- Update policy to allow service role to update
DROP POLICY IF EXISTS "Service role has full access" ON video_requests;
CREATE POLICY "Service role has full access"
  ON video_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
