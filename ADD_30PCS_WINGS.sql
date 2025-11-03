-- ========================================
-- ADD 30 PCS WINGS OPTIONS
-- ========================================
-- Run this in your Supabase SQL Editor
-- ========================================

-- 1. ADD JUNIOR WINGS - 30 PCS (₱790)
-- ========================================

INSERT INTO menu_items (name, description, base_price, category, popular, available, image) 
VALUES ('JRA30 - 30 pcs Ala Carte 🎉', 'Junior wings (30 pcs). Choose up to 6 flavors! MEGA PARTY SIZE!', 790.00, 'wings-junior', true, true, '/images/chick-central-logo.jpg')
RETURNING id;

-- Get the menu_item_id from the result above and use it below
-- Replace 'YOUR_MENU_ITEM_ID_HERE' with the actual ID

-- Add 8 flavor variations for Junior Wings 30pcs
INSERT INTO variations (menu_item_id, name, price, image) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Buffalo Blaze', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Soy Garlic Glaze', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Honey Butter Bliss', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Garlic Parmesan Charm', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Snow Cheese Magic', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Teriyaki Twist', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Yangneum Heat', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'BBQ Buzz', 0, NULL);


-- ========================================
-- 2. ADD JUMBO WINGS - 30 PCS (₱1,180)
-- ========================================

INSERT INTO menu_items (name, description, base_price, category, popular, available, image) 
VALUES ('JBA30 - 30 pcs Ala Carte 🎉', 'Jumbo wings (30 pcs). Choose up to 6 flavors! MEGA PARTY SIZE!', 1180.00, 'wings-jumbo', true, true, '/images/chick-central-logo.jpg')
RETURNING id;

-- Add 8 flavor variations for Jumbo Wings 30pcs
INSERT INTO variations (menu_item_id, name, price, image) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Buffalo Blaze', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Soy Garlic Glaze', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Honey Butter Bliss', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Garlic Parmesan Charm', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Snow Cheese Magic', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Teriyaki Twist', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Yangneum Heat', 0, NULL),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'BBQ Buzz', 0, NULL);


-- ========================================
-- VERIFICATION QUERY
-- ========================================
-- Run this to verify the items were added correctly:

SELECT 
  mi.name as item_name,
  mi.base_price,
  mi.category,
  COUNT(v.id) as flavor_count
FROM menu_items mi
LEFT JOIN variations v ON v.menu_item_id = mi.id
WHERE mi.name LIKE '%30 pcs%'
GROUP BY mi.id, mi.name, mi.base_price, mi.category
ORDER BY mi.name;

-- Expected result:
-- JBA30 - 30 pcs Ala Carte 🎉 | 1180.00 | wings-jumbo  | 8 flavors
-- JRA30 - 30 pcs Ala Carte 🎉 |  790.00 | wings-junior | 8 flavors

-- ========================================
-- DONE! ✅
-- ========================================
-- Your 30 pcs wings are now available on the menu!
-- Refresh your website to see them appear!

