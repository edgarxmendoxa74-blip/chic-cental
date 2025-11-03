-- ═══════════════════════════════════════════════════════════════════════════
-- FIX: Add image column to variations table
-- ═══════════════════════════════════════════════════════════════════════════
-- 
-- This migration adds the 'image' column to store flavor variation images.
-- Your uploaded images will now be saved to the database!
--
-- HOW TO RUN THIS:
-- 1. Go to your Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Select your project
-- 3. Click "SQL Editor" in the left sidebar
-- 4. Click "New query"
-- 5. Copy and paste this entire file
-- 6. Click "Run" button
-- 7. Done! ✅
-- ═══════════════════════════════════════════════════════════════════════════

-- Add image column to variations table
ALTER TABLE variations ADD COLUMN IF NOT EXISTS image text;

-- Add comment to explain the column
COMMENT ON COLUMN variations.image IS 'URL or Base64 data URL for the variation image uploaded in admin dashboard';

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'variations' 
ORDER BY ordinal_position;

-- Show success message
DO $$
BEGIN
  RAISE NOTICE '✅ SUCCESS! Image column added to variations table.';
  RAISE NOTICE '📸 Your flavor variation images will now be saved!';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Refresh your browser (Ctrl + Shift + R)';
  RAISE NOTICE '2. Upload images in admin dashboard';
  RAISE NOTICE '3. Save the menu item';
  RAISE NOTICE '4. Images will persist! ✨';
END $$;

