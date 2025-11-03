-- Add GCash Payment Method to Chick Central
-- This script adds the GCash payment option with QR code

-- Delete existing GCash entry if it exists (to avoid duplicates)
DELETE FROM payment_methods WHERE id = 'gcash';

-- Insert GCash payment method
INSERT INTO payment_methods (id, name, account_number, account_name, qr_code_url, sort_order, active) VALUES
  (
    'gcash',                                        -- ID
    'GCash',                                        -- Display Name
    '+63 905 293 ****',                             -- Mobile Number (partially hidden for security)
    'FR**Z EM**N T.',                               -- Account Name (from your QR code)
    '/images/payment-qr/gcash-qr.png',             -- Path to your QR code image
    1,                                              -- Sort order (displays first)
    true                                            -- Active (enabled)
  );

-- Verify the insertion
SELECT * FROM payment_methods WHERE id = 'gcash';

