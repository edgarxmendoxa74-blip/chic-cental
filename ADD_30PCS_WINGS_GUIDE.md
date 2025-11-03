# 📋 Add 30 Pieces Wings to Menu

## What's Being Added:

### 1. **Junior Wings - 30 pcs Ala Carte** 🐔
- **Code**: JRA30
- **Price**: ₱790
- **Flavors**: Choose up to 6 flavors (8 available)
- **Category**: Wings - Junior
- **Description**: "Junior wings (30 pcs). Choose up to 6 flavors! MEGA PARTY SIZE!"

### 2. **Jumbo Wings - 30 pcs Ala Carte** 🟡
- **Code**: JBA30
- **Price**: ₱1,180
- **Flavors**: Choose up to 6 flavors (8 available)
- **Category**: Wings - Jumbo
- **Description**: "Jumbo wings (30 pcs). Choose up to 6 flavors! MEGA PARTY SIZE!"

---

## 🚀 How to Add Them:

### Option 1: Using SQL (Recommended)

#### Step 1: Go to Supabase
1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Click **"New Query"**

#### Step 2: Copy and Run the SQL
1. Open the file: `ADD_30PCS_WINGS.sql`
2. **Copy ALL the SQL code**
3. **Paste it** into Supabase SQL Editor
4. Click **"Run"** or press **Ctrl+Enter**

#### Step 3: Verify
The SQL includes a verification query at the end. You should see:
```
JBA30 - 30 pcs Ala Carte 🎉 | 1180.00 | wings-jumbo  | 8 flavors
JRA30 - 30 pcs Ala Carte 🎉 |  790.00 | wings-junior | 8 flavors
```

---

### Option 2: Using Admin Dashboard

#### Step 1: Go to Admin Dashboard
- Open: http://localhost:5173/admin

#### Step 2: Add Junior Wings 30pcs
1. Click **"Add New Item"**
2. Fill in:
   - **Name**: `JRA30 - 30 pcs Ala Carte 🎉`
   - **Description**: `Junior wings (30 pcs). Choose up to 6 flavors! MEGA PARTY SIZE!`
   - **Price**: `790`
   - **Category**: Select **"Wings - Junior"**
   - **Popular**: ✅ Check (mark as popular)
   - **Available**: ✅ Check
3. **Add 8 Flavor Variations** (all at ₱0):
   - Buffalo Blaze
   - Soy Garlic Glaze
   - Honey Butter Bliss
   - Garlic Parmesan Charm
   - Snow Cheese Magic
   - Teriyaki Twist
   - Yangneum Heat
   - BBQ Buzz
4. Click **"Save Menu Item"**

#### Step 3: Add Jumbo Wings 30pcs
1. Click **"Add New Item"** again
2. Fill in:
   - **Name**: `JBA30 - 30 pcs Ala Carte 🎉`
   - **Description**: `Jumbo wings (30 pcs). Choose up to 6 flavors! MEGA PARTY SIZE!`
   - **Price**: `1180`
   - **Category**: Select **"Wings - Jumbo"**
   - **Popular**: ✅ Check (mark as popular)
   - **Available**: ✅ Check
3. **Add 8 Flavor Variations** (all at ₱0):
   - Buffalo Blaze
   - Soy Garlic Glaze
   - Honey Butter Bliss
   - Garlic Parmesan Charm
   - Snow Cheese Magic
   - Teriyaki Twist
   - Yangneum Heat
   - BBQ Buzz
4. Click **"Save Menu Item"**

---

## 📱 View on Website

After adding:
1. **Refresh your website** (Ctrl+Shift+R)
2. **Scroll to Wings sections**:
   - **Wings - Jumbo**: You'll see JBA30 (₱1,180)
   - **Wings - Junior**: You'll see JRA30 (₱790)
3. **Click on the items** to see all 8 flavors available

---

## 🎉 What Customers See:

### Jr. Wings - 30 pcs:
```
┌──────────────────────────────────────┐
│  JRA30 - 30 pcs Ala Carte 🎉        │
│                                      │
│  Junior wings (30 pcs)               │
│  Choose up to 6 flavors!             │
│  MEGA PARTY SIZE!                    │
│                                      │
│  ₱790.00                             │
│                                      │
│  [Add to Cart]                       │
└──────────────────────────────────────┘
```

### Jumbo Wings - 30 pcs:
```
┌──────────────────────────────────────┐
│  JBA30 - 30 pcs Ala Carte 🎉        │
│                                      │
│  Jumbo wings (30 pcs)                │
│  Choose up to 6 flavors!             │
│  MEGA PARTY SIZE!                    │
│                                      │
│  ₱1,180.00                           │
│                                      │
│  [Add to Cart]                       │
└──────────────────────────────────────┘
```

---

## ✅ Checklist:

- [ ] Run SQL script in Supabase (or add via Admin Dashboard)
- [ ] Verify items appear in database
- [ ] Refresh website
- [ ] Check Wings - Junior section for JRA30
- [ ] Check Wings - Jumbo section for JBA30
- [ ] Test adding to cart
- [ ] Test flavor selection (should allow up to 6 flavors)

---

## 🎯 Quick Summary:

| Item | Code | Price | Pieces | Flavors | Category |
|------|------|-------|--------|---------|----------|
| Jr. Wings 30pc | JRA30 | ₱790 | 30 pcs | 6 flavors | Wings - Junior |
| Jumbo Wings 30pc | JBA30 | ₱1,180 | 30 pcs | 6 flavors | Wings - Jumbo |

**Perfect for parties and big groups!** 🎉

---

**Which option do you prefer?**
1. **SQL** (faster, run one script)
2. **Admin Dashboard** (visual, step-by-step)

Let me know and I'll guide you through it! 🚀

