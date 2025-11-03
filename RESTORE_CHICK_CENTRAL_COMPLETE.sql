-- ========================================
-- 🐔 CHICK CENTRAL - COMPLETE RESTORATION
-- ========================================
-- This script restores EVERYTHING:
-- ✅ Site Settings
-- ✅ All Categories (4 total)
-- ✅ All Menu Items (20 total including 30pcs)
-- ✅ All Flavors (8 flavors each)
-- ✅ All Add-ons
-- ========================================
-- Run this ONCE in Supabase SQL Editor
-- ========================================

-- ========================================
-- STEP 1: DELETE EVERYTHING (Clean Slate)
-- ========================================

DELETE FROM menu_items;
DELETE FROM categories;

-- ========================================
-- STEP 2: Update Site Settings
-- ========================================

INSERT INTO site_settings (id, value, type, description) VALUES
  ('site_name', 'Chick Central 🍗', 'text', 'Site name'),
  ('site_description', 'Flavored wings that hit different! 🔥 | 8 saucy flavors | Rice meals & ala carte | Pang-masa sarap 💯', 'text', 'Site description'),
  ('currency', '₱', 'text', 'Currency symbol'),
  ('currency_code', 'PHP', 'text', 'Currency code')
ON CONFLICT (id) DO UPDATE SET
  value = EXCLUDED.value;

-- ========================================
-- STEP 3: Create Categories (4 total)
-- ========================================

INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('fun-bites', 'Fun Bites 🌟', '⭐', 1, true),
  ('wings-jumbo', 'Wings - Jumbo', '🟡', 2, true),
  ('wings-junior', 'Wings - Junior', '🔴', 3, true),
  ('drumstick', 'Drumstick', '🍗', 4, true);

-- ========================================
-- CATEGORY 1: FUN BITES (Yellow)
-- ========================================

-- FBR - Fun Bites with Rice ₱59
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('FBR - Fun Bites with Rice 🍚', 'Our best-selling fun bites served with steaming rice. Choose your favorite flavor!', 59.00, 'fun-bites', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), 'BBQ Buzz', 0);

INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'FBR - Fun Bites with Rice 🍚'), '🍚 Extra Rice', 15.00, 'extras');

-- FB - Fun Bites Ala Carte ₱49
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('FB - Fun Bites Ala Carte', 'Our best-selling fun bites without rice. Choose your favorite flavor!', 49.00, 'fun-bites', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'FB - Fun Bites Ala Carte'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'FB - Fun Bites Ala Carte'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'FB - Fun Bites Ala Carte'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'FB - Fun Bites Ala Carte'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'FB - Fun Bites Ala Carte'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'FB - Fun Bites Ala Carte'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'FB - Fun Bites Ala Carte'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'FB - Fun Bites Ala Carte'), 'BBQ Buzz', 0);

-- ========================================
-- CATEGORY 2: WINGS - JUMBO (Yellow)
-- ========================================

-- JBW2 - 2 pcs with Rice ₱99
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JBW2 - 2 pcs with Rice 🍚', 'Jumbo wings (2 pcs) with rice. Choose 1 flavor!', 99.00, 'wings-jumbo', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), 'BBQ Buzz', 0);

INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBW2 - 2 pcs with Rice 🍚'), '🍚 Extra Rice', 15.00, 'extras');

-- JBW4 - 4 pcs with Rice ₱179
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JBW4 - 4 pcs with Rice 🍚', 'Jumbo wings (4 pcs) with rice. Choose 1 flavor!', 179.00, 'wings-jumbo', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), 'BBQ Buzz', 0);

INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBW4 - 4 pcs with Rice 🍚'), '🍚 Extra Rice', 15.00, 'extras');

-- JBA4 - 4 pcs Ala Carte ₱169
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JBA4 - 4 pcs Ala Carte', 'Jumbo wings (4 pcs). Choose 1 flavor!', 169.00, 'wings-jumbo', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBA4 - 4 pcs Ala Carte'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA4 - 4 pcs Ala Carte'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA4 - 4 pcs Ala Carte'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA4 - 4 pcs Ala Carte'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA4 - 4 pcs Ala Carte'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA4 - 4 pcs Ala Carte'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA4 - 4 pcs Ala Carte'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA4 - 4 pcs Ala Carte'), 'BBQ Buzz', 0);

-- JBA6 - 6 pcs Ala Carte ₱249
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JBA6 - 6 pcs Ala Carte', 'Jumbo wings (6 pcs). Choose up to 2 flavors!', 249.00, 'wings-jumbo', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBA6 - 6 pcs Ala Carte'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA6 - 6 pcs Ala Carte'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA6 - 6 pcs Ala Carte'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA6 - 6 pcs Ala Carte'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA6 - 6 pcs Ala Carte'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA6 - 6 pcs Ala Carte'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA6 - 6 pcs Ala Carte'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA6 - 6 pcs Ala Carte'), 'BBQ Buzz', 0);

-- JBA12 - 12 pcs Ala Carte ₱499
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JBA12 - 12 pcs Ala Carte 🔥', 'Jumbo wings (12 pcs). Choose up to 3 flavors! PARTY SIZE!', 499.00, 'wings-jumbo', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBA12 - 12 pcs Ala Carte 🔥'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA12 - 12 pcs Ala Carte 🔥'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA12 - 12 pcs Ala Carte 🔥'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA12 - 12 pcs Ala Carte 🔥'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA12 - 12 pcs Ala Carte 🔥'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA12 - 12 pcs Ala Carte 🔥'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA12 - 12 pcs Ala Carte 🔥'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA12 - 12 pcs Ala Carte 🔥'), 'BBQ Buzz', 0);

-- JBA30 - 30 pcs Ala Carte ₱1,180 [MEGA PARTY SIZE!]
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JBA30 - 30 pcs Ala Carte 🎉', 'Jumbo wings (30 pcs). Choose up to 6 flavors! MEGA PARTY SIZE!', 1180.00, 'wings-jumbo', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JBA30 - 30 pcs Ala Carte 🎉'), 'BBQ Buzz', 0);

-- ========================================
-- CATEGORY 3: WINGS - JUNIOR (Red) [NEW!]
-- ========================================

-- JRW2 - 2 pcs with Rice ₱69
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JRW2 - 2 pcs with Rice 🍚', 'Junior wings (2 pcs) with rice. Choose 1 flavor!', 69.00, 'wings-junior', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), 'BBQ Buzz', 0);

INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRW2 - 2 pcs with Rice 🍚'), '🍚 Extra Rice', 15.00, 'extras');

-- JRW4 - 4 pcs with Rice ₱119
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JRW4 - 4 pcs with Rice 🍚', 'Junior wings (4 pcs) with rice. Choose 1 flavor!', 119.00, 'wings-junior', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), 'BBQ Buzz', 0);

INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRW4 - 4 pcs with Rice 🍚'), '🍚 Extra Rice', 15.00, 'extras');

-- JRA4 - 4 pcs Ala Carte ₱109
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JRA4 - 4 pcs Ala Carte', 'Junior wings (4 pcs). Choose 1 flavor!', 109.00, 'wings-junior', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA4 - 4 pcs Ala Carte'), 'BBQ Buzz', 0);

-- JRA6 - 6 pcs Ala Carte ₱159
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JRA6 - 6 pcs Ala Carte', 'Junior wings (6 pcs). Choose up to 2 flavors!', 159.00, 'wings-junior', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRA6 - 6 pcs Ala Carte'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA6 - 6 pcs Ala Carte'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA6 - 6 pcs Ala Carte'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA6 - 6 pcs Ala Carte'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA6 - 6 pcs Ala Carte'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA6 - 6 pcs Ala Carte'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA6 - 6 pcs Ala Carte'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA6 - 6 pcs Ala Carte'), 'BBQ Buzz', 0);

-- JRA12 - 12 pcs Ala Carte ₱299
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JRA12 - 12 pcs Ala Carte 🔥', 'Junior wings (12 pcs). Choose up to 3 flavors! PARTY SIZE!', 299.00, 'wings-junior', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRA12 - 12 pcs Ala Carte 🔥'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA12 - 12 pcs Ala Carte 🔥'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA12 - 12 pcs Ala Carte 🔥'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA12 - 12 pcs Ala Carte 🔥'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA12 - 12 pcs Ala Carte 🔥'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA12 - 12 pcs Ala Carte 🔥'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA12 - 12 pcs Ala Carte 🔥'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA12 - 12 pcs Ala Carte 🔥'), 'BBQ Buzz', 0);

-- JRA30 - 30 pcs Ala Carte ₱790 [MEGA PARTY SIZE!]
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('JRA30 - 30 pcs Ala Carte 🎉', 'Junior wings (30 pcs). Choose up to 6 flavors! MEGA PARTY SIZE!', 790.00, 'wings-junior', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'JRA30 - 30 pcs Ala Carte 🎉'), 'BBQ Buzz', 0);

-- ========================================
-- CATEGORY 4: DRUMSTICK (Red)
-- ========================================

-- DR1 - 1 pc with Rice ₱69
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('DR1 - 1 pc with Rice 🍚', 'Crispy drumstick (1 pc) with rice. Choose 1 flavor!', 69.00, 'drumstick', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), 'BBQ Buzz', 0);

INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DR1 - 1 pc with Rice 🍚'), '🍚 Extra Rice', 15.00, 'extras');

-- DR2 - 2 pcs with Rice ₱119
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('DR2 - 2 pcs with Rice 🍚', 'Crispy drumstick (2 pcs) with rice. Choose 1 flavor!', 119.00, 'drumstick', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), 'BBQ Buzz', 0);

INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DR2 - 2 pcs with Rice 🍚'), '🍚 Extra Rice', 15.00, 'extras');

-- DR3 - 3 pcs with Rice ₱169
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('DR3 - 3 pcs with Rice 🍚', 'Crispy drumstick (3 pcs) with rice. Choose 1 flavor!', 169.00, 'drumstick', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), 'BBQ Buzz', 0);

INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DR3 - 3 pcs with Rice 🍚'), '🍚 Extra Rice', 15.00, 'extras');

-- DRA3 - 3 pcs Ala Carte ₱159
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('DRA3 - 3 pcs Ala Carte', 'Crispy drumstick (3 pcs). Choose 1 flavor!', 159.00, 'drumstick', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DRA3 - 3 pcs Ala Carte'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA3 - 3 pcs Ala Carte'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA3 - 3 pcs Ala Carte'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA3 - 3 pcs Ala Carte'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA3 - 3 pcs Ala Carte'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA3 - 3 pcs Ala Carte'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA3 - 3 pcs Ala Carte'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA3 - 3 pcs Ala Carte'), 'BBQ Buzz', 0);

-- DRA6 - 6 pcs Ala Carte ₱309
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('DRA6 - 6 pcs Ala Carte', 'Crispy drumstick (6 pcs). Choose up to 2 flavors!', 309.00, 'drumstick', false, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DRA6 - 6 pcs Ala Carte'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA6 - 6 pcs Ala Carte'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA6 - 6 pcs Ala Carte'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA6 - 6 pcs Ala Carte'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA6 - 6 pcs Ala Carte'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA6 - 6 pcs Ala Carte'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA6 - 6 pcs Ala Carte'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA6 - 6 pcs Ala Carte'), 'BBQ Buzz', 0);

-- DRA12 - 12 pcs Ala Carte ₱599
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) 
VALUES ('DRA12 - 12 pcs Ala Carte 🔥', 'Crispy drumstick (12 pcs). Choose up to 3 flavors! PARTY SIZE!', 599.00, 'drumstick', true, true, '/images/chick-central-logo.jpg');

INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'DRA12 - 12 pcs Ala Carte 🔥'), 'Buffalo Blaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA12 - 12 pcs Ala Carte 🔥'), 'Soy Garlic Glaze', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA12 - 12 pcs Ala Carte 🔥'), 'Honey Butter Bliss', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA12 - 12 pcs Ala Carte 🔥'), 'Garlic Parmesan Charm', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA12 - 12 pcs Ala Carte 🔥'), 'Snow Cheese Magic', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA12 - 12 pcs Ala Carte 🔥'), 'Teriyaki Twist', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA12 - 12 pcs Ala Carte 🔥'), 'Yangneum Heat', 0),
  ((SELECT id FROM menu_items WHERE name = 'DRA12 - 12 pcs Ala Carte 🔥'), 'BBQ Buzz', 0);

-- ========================================
-- ✅ COMPLETE! 🎉
-- ========================================
-- Your FULL Chick Central menu is now loaded!
-- 
-- 📊 FINAL MENU SUMMARY:
--   ⭐ Fun Bites (2 items)
--   🟡 Wings - Jumbo (6 items including 30pcs!)
--   🔴 Wings - Junior (6 items including 30pcs!)
--   🍗 Drumstick (6 items)
--   🔥 8 Delicious Flavors for each item
--   🍚 Extra Rice add-on for all rice meals
-- 
-- Total: 20 menu items
-- ========================================

