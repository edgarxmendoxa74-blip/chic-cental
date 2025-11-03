-- ========================================
-- 🐔 UPDATE ALL MENU ITEM IMAGES TO CHICK CENTRAL LOGO
-- ========================================
-- This script updates all existing menu items to use the 
-- Chick Central logo image at /images/chick-central-logo.jpg
-- ========================================

-- Update all menu items to use the Chick Central logo
UPDATE menu_items 
SET image_url = '/images/chick-central-logo.jpg',
    updated_at = now()
WHERE image_url IS NULL 
   OR image_url != '/images/chick-central-logo.jpg';

-- Show the results
SELECT 
  name, 
  category, 
  image_url,
  updated_at
FROM menu_items
ORDER BY category, name;

-- ========================================
-- ✅ DONE!
-- ========================================
-- All menu items now use: /images/chick-central-logo.jpg
-- 
-- Next steps:
-- 1. Save your logo image to: public/images/chick-central-logo.jpg
-- 2. Refresh your app to see all items with the new logo!
-- ========================================

