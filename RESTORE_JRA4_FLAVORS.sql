-- ═══════════════════════════════════════════════════════════════════════════
-- RESTORE JRA4 Ala Carte Flavors
-- ═══════════════════════════════════════════════════════════════════════════
-- 
-- This script adds back the 8 flavor variations for JRA4 - 4 pcs Ala Carte
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

-- First, delete any existing variations for JRA4 to avoid duplicates
DELETE FROM variations 
WHERE menu_item_id = (SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte');

-- Insert all 8 flavor variations for JRA4 - 4 pcs Ala Carte
INSERT INTO variations (menu_item_id, name, price, image) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Buffalo Blaze', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Soy Garlic Glaze', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Honey Butter Bliss', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Garlic Parmesan Charm', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Snow Cheese Magic', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Teriyaki Twist', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Yangneum Heat', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'BBQ Buzz', 0, NULL);

-- Verify the variations were added
SELECT 
    mi.name as menu_item,
    v.name as flavor,
    v.price,
    v.image
FROM variations v
JOIN menu_items mi ON v.menu_item_id = mi.id
WHERE mi.name = 'JRA4 - 4 pcs Ala Carte'
ORDER BY v.name;

-- Show success message
DO $$
BEGIN
  RAISE NOTICE '✅ SUCCESS! 8 flavors restored for JRA4 - 4 pcs Ala Carte';
  RAISE NOTICE '';
  RAISE NOTICE 'Flavors added:';
  RAISE NOTICE '1. Buffalo Blaze';
  RAISE NOTICE '2. Soy Garlic Glaze';
  RAISE NOTICE '3. Honey Butter Bliss';
  RAISE NOTICE '4. Garlic Parmesan Charm';
  RAISE NOTICE '5. Snow Cheese Magic';
  RAISE NOTICE '6. Teriyaki Twist';
  RAISE NOTICE '7. Yangneum Heat';
  RAISE NOTICE '8. BBQ Buzz';
  RAISE NOTICE '';
  RAISE NOTICE '🔄 Refresh your browser to see the flavors!';
END $$;

