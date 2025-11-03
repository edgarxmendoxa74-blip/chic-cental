# 💚 Green Cart Button & GCash QR Code Setup Guide

## ✅ What's Already Done

### **1. Cart Button Changed to Green** ✅
The shopping cart button has been changed to a beautiful green color with:
- ✅ Green gradient background (from-green-500 to-green-600)
- ✅ "Cart" text label
- ✅ Item count badge with white background
- ✅ Hover effects (darker green on hover)
- ✅ Professional shadow effects
- ✅ Updated in both Header and Floating Cart Button

---

## 🎯 Next Steps: Add GCash QR Code

### **Step 1: Save Your GCash QR Code Image**

1. **Take/Download your GCash QR Code image**
   - Use the screenshot you sent me
   - Or get a fresh QR code from your GCash app

2. **Save the image as:**
   ```
   public/images/payment-qr/gcash-qr.png
   ```

3. **How to save it:**
   - Right-click on your GCash QR code image
   - Save as: `gcash-qr.png`
   - Move it to: `C:\Users\Admin\chick central\template-web-1\public\images\payment-qr\`

---

### **Step 2: Add GCash to Database**

#### **Option A: Using Supabase Dashboard (Easiest)**

1. **Go to your Supabase project:**
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT_ID
   ```

2. **Navigate to:**
   - Click "Table Editor" in left sidebar
   - Select "payment_methods" table

3. **Click "Insert row" button**

4. **Fill in the form:**
   ```
   id:               gcash
   name:             GCash
   account_number:   +63 905 293 ****
   account_name:     FR**Z EM**N T.
   qr_code_url:      /images/payment-qr/gcash-qr.png
   active:           ✓ (checked)
   sort_order:       1
   ```

5. **Click "Save"** ✅

---

#### **Option B: Using SQL Editor**

1. **Go to Supabase Dashboard:**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

2. **Copy and paste this SQL:**
   ```sql
   -- Add GCash Payment Method
   INSERT INTO payment_methods (id, name, account_number, account_name, qr_code_url, sort_order, active) VALUES
     ('gcash', 'GCash', '+63 905 293 ****', 'FR**Z EM**N T.', '/images/payment-qr/gcash-qr.png', 1, true)
   ON CONFLICT (id) DO UPDATE SET
     name = EXCLUDED.name,
     account_number = EXCLUDED.account_number,
     account_name = EXCLUDED.account_name,
     qr_code_url = EXCLUDED.qr_code_url,
     sort_order = EXCLUDED.sort_order,
     active = EXCLUDED.active;
   ```

3. **Click "Run" button** ✅

---

#### **Option C: Using Terminal/Command Line**

1. **Open PowerShell in your project folder**

2. **Run the SQL file I created:**
   ```powershell
   # Connect to your Supabase database and run:
   psql "YOUR_SUPABASE_DATABASE_URL" -f add_gcash_payment.sql
   ```

   Or use Supabase CLI:
   ```powershell
   supabase db push
   ```

---

### **Step 3: Update Account Details (Optional)**

If you want to show the **full mobile number** and **full name**:

1. **Edit the SQL file** `add_gcash_payment.sql`

2. **Change these lines:**
   ```sql
   '+63 905 293 ****',     -- Change to your full number
   'FR**Z EM**N T.',       -- Change to your full name
   ```

3. **Example with full details:**
   ```sql
   INSERT INTO payment_methods (id, name, account_number, account_name, qr_code_url, sort_order, active) VALUES
     (
       'gcash',
       'GCash',
       '+63 905 293 1234',              -- Your full mobile number
       'FRANZ EMMANUEL TORRES',          -- Your full name
       '/images/payment-qr/gcash-qr.png',
       1,
       true
     );
   ```

---

## 📋 Quick Checklist

### **Cart Button (Already Done)** ✅
- [x] Header cart button is green
- [x] Floating cart button is green
- [x] Item count badge shows white with green text
- [x] Hover effects working
- [x] No linter errors

### **GCash QR Code (Your Action Required)** 
- [ ] Save QR code image to `public/images/payment-qr/gcash-qr.png`
- [ ] Add GCash to database (using one of the 3 options above)
- [ ] Verify GCash appears in checkout payment options
- [ ] Test QR code displays correctly
- [ ] Test full checkout flow

---

## 🎨 How It Will Look

### **Cart Button (Desktop Header):**
```
┌──────────────────────────────────────┐
│                                      │
│  [🛒 Cart  (5)]  ← Green Button     │
│                                      │
└──────────────────────────────────────┘
```

### **Cart Button (Mobile Floating):**
```
                            ┌─────────┐
                            │  🛒 (5) │ ← Green
                            │         │
                            └─────────┘
```

### **Checkout Payment Options:**
```
┌─────────────────────────────────────────────────────┐
│ Choose Payment Method                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [💳 GCash]                    ← Will appear here │
│  [💳 Maya (PayMaya)]                               │
│  [💳 Bank Transfer]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **When GCash is Selected:**
```
┌─────────────────────────────────────────────────────┐
│ Payment Details                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  GCash                              ┌───────────┐   │
│  +63 905 293 ****                   │           │   │
│  Account Name: FR**Z EM**N T.       │  QR CODE  │   │
│  Amount: ₱299.00                    │   IMAGE   │   │
│                                     │           │   │
│                                     └───────────┘   │
│                                     Scan to pay     │
└─────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Your Changes

### **Test Cart Button:**

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open:** `http://localhost:5173`

3. **Check:**
   - ✅ Cart button in header is green
   - ✅ Shows "Cart" text
   - ✅ Add items to see count badge
   - ✅ Badge is white with green text
   - ✅ Hover over button shows darker green

4. **On mobile/narrow screen:**
   - ✅ Floating cart button is green
   - ✅ Bounces gently
   - ✅ Badge shows item count

---

### **Test GCash Payment:**

1. **Add items to cart**

2. **Click "Checkout"**

3. **Fill in your details**
   - Name
   - Contact number
   - Service type (delivery/pickup/dine-in)
   - Address (if delivery)

4. **Click "Proceed to Payment"**

5. **Check payment options:**
   - ✅ GCash appears first (sort_order: 1)
   - ✅ Can select GCash
   - ✅ QR code image displays
   - ✅ Account details show correctly
   - ✅ Amount to pay is correct

6. **Select GCash:**
   - ✅ Selected button turns red
   - ✅ QR code is clearly visible
   - ✅ Can scan QR code with phone
   - ✅ Account name and number display

---

## 🔧 Troubleshooting

### **Problem: Cart button not green**
**Solution:** Clear browser cache and refresh (Ctrl + Shift + R)

### **Problem: GCash doesn't appear in payment options**
**Solutions:**
1. Check database - is GCash row added?
2. Check `active` field is `true`
3. Refresh the checkout page
4. Check browser console for errors

### **Problem: QR code image not showing**
**Solutions:**
1. Verify image path: `public/images/payment-qr/gcash-qr.png`
2. Check file name matches exactly (case-sensitive)
3. Check file exists in the folder
4. Try absolute path: `/images/payment-qr/gcash-qr.png`
5. Clear browser cache

### **Problem: QR code image too small/large**
**Solution:** The image is displayed at 128x128px (w-32 h-32). To change:
- Edit `src/components/Checkout.tsx` line ~406
- Change `w-32 h-32` to desired size (e.g., `w-48 h-48` for larger)

---

## 📁 Files Modified/Created

### **Modified:**
1. ✅ `src/components/Header.tsx` - Green cart button in header
2. ✅ `src/components/FloatingCartButton.tsx` - Green floating cart

### **Created:**
1. ✅ `public/images/payment-qr/` - Folder for QR codes
2. ✅ `add_gcash_payment.sql` - SQL script to add GCash
3. ✅ `GCASH_SETUP_GUIDE.md` - This guide

### **To Be Created (By You):**
1. ⏳ `public/images/payment-qr/gcash-qr.png` - Your GCash QR code image

---

## 🎯 Summary

### **What Changed:**
1. ✅ **Cart button is now GREEN** (was orange/red gradient)
2. ✅ **Cart button shows "Cart" text** (more clear)
3. ✅ **Item count badge is white with green text** (better contrast)
4. ✅ **Both header and floating cart buttons updated**
5. ✅ **Payment QR folder created** (`public/images/payment-qr/`)
6. ✅ **SQL script ready** (`add_gcash_payment.sql`)

### **What You Need to Do:**
1. ⏳ **Save your GCash QR code** to `public/images/payment-qr/gcash-qr.png`
2. ⏳ **Run the SQL script** (or manually add to database)
3. ⏳ **Test the checkout flow** to verify everything works

---

## 🚀 Quick Start (3 Steps)

**Step 1:** Save your QR code image
```
📂 public/images/payment-qr/gcash-qr.png
```

**Step 2:** Add to database (copy/paste to Supabase SQL Editor):
```sql
INSERT INTO payment_methods (id, name, account_number, account_name, qr_code_url, sort_order, active) 
VALUES ('gcash', 'GCash', '+63 905 293 ****', 'FR**Z EM**N T.', '/images/payment-qr/gcash-qr.png', 1, true);
```

**Step 3:** Test it!
```bash
npm run dev
```

---

**That's it! Your green cart button is ready, and GCash payment is just 2 steps away!** 💚✨

