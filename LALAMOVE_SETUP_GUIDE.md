# 🚚 Lalamove Delivery Integration Setup

## 📋 Overview

This guide will help you integrate Lalamove delivery service into your Chick Central website.

---

## 🔑 Step 1: Get Lalamove API Credentials

### Create Lalamove Account:

1. **Go to Lalamove Developer Portal**
   - Sandbox (Testing): https://developers.lalamove.com/
   - Production: https://www.lalamove.com/

2. **Sign Up / Login**
   - Create a business account
   - Complete your profile

3. **Get API Credentials**
   - Go to **Developer Portal** → **API Keys**
   - You'll get:
     - **API Key** (Public Key)
     - **API Secret** (Private Key)

---

## 🔧 Step 2: Add API Keys to Your Project

### Local Development (.env file):

Open your `.env` file and update these values:

```env
# Lalamove API Configuration
VITE_LALAMOVE_API_KEY=your_actual_api_key_here
VITE_LALAMOVE_API_SECRET=your_actual_api_secret_here
VITE_LALAMOVE_ENVIRONMENT=sandbox
VITE_LALAMOVE_REGION=PH
```

**Important:**
- Use `sandbox` for testing
- Use `production` for live orders
- Keep your **API Secret** private!

---

## 🌐 Step 3: Deploy to Vercel

### Add Environment Variables in Vercel:

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings** → **Environment Variables**
4. **Add these variables:**

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_LALAMOVE_API_KEY` | Your API Key | Production, Preview, Development |
| `VITE_LALAMOVE_API_SECRET` | Your API Secret | Production, Preview, Development |
| `VITE_LALAMOVE_ENVIRONMENT` | `sandbox` or `production` | All |
| `VITE_LALAMOVE_REGION` | `PH` | All |

5. **Save** and **Redeploy**

---

## 📍 Step 4: Update Store Location

Edit `src/config/lalamove.ts`:

```typescript
storeLocation: {
  coordinates: {
    lat: '14.5995',  // ← Update with your latitude
    lng: '120.9842'  // ← Update with your longitude
  },
  address: 'Your Store Address Here', // ← Update with your full address
}
```

**How to get coordinates:**
1. Go to Google Maps
2. Right-click on your store location
3. Click on the coordinates to copy them
4. Paste into the config file

---

## 🚀 Step 5: Lalamove Features

### What You Can Do:

✅ **Get Delivery Quotation** - Calculate delivery cost  
✅ **Place Delivery Order** - Book a driver  
✅ **Track Delivery** - Real-time tracking  
✅ **Delivery History** - View past deliveries  
✅ **Multiple Vehicle Types** - Motorcycle, Car, Van, Truck  

### Service Types:

- `MOTORCYCLE` - Small orders, fast delivery
- `CAR` - Medium orders
- `VAN` - Large orders
- `TRUCK` - Bulk orders

---

## 📱 Step 6: How It Works

### Customer Flow:

1. **Customer places order**
2. **Selects "Delivery"** service type
3. **Enters delivery address**
4. **System calculates delivery fee** (via Lalamove API)
5. **Total = Food + Delivery Fee**
6. **Customer confirms order**
7. **System books Lalamove driver** automatically
8. **Customer gets tracking link**

### Integration Points:

```typescript
// Check if configured
import { isLalamoveConfigured } from './config/lalamove';

if (isLalamoveConfigured()) {
  // Enable Lalamove delivery
}

// Get quotation
const quote = await getLalamoveQuote(pickupAddress, deliveryAddress);

// Book delivery
const delivery = await bookLalamoveDelivery(orderDetails);

// Track delivery
const status = await trackLalamoveDelivery(deliveryId);
```

---

## 🔒 Security Best Practices

1. **Never commit API keys to Git**
   - ✅ `.env` is in `.gitignore`
   - ❌ Don't share your API Secret publicly

2. **Use Sandbox for Testing**
   - Test all features in sandbox first
   - Switch to production when ready

3. **Rotate Keys Regularly**
   - Change API keys periodically
   - Update in both `.env` and Vercel

4. **Monitor API Usage**
   - Check Lalamove dashboard for usage
   - Set up alerts for unusual activity

---

## 📊 API Limits & Costs

### Sandbox (Free Testing):
- Unlimited test requests
- No real deliveries
- No charges

### Production:
- Pay per delivery
- Pricing varies by:
  - Distance
  - Vehicle type
  - Time of day
  - Demand

**Check Lalamove pricing:** https://www.lalamove.com/philippines/pricing

---

## 🛠️ Configuration File

Your Lalamove settings are in:
```
src/config/lalamove.ts
```

This file contains:
- ✅ API credentials (from .env)
- ✅ Environment settings
- ✅ Store location
- ✅ Default service type
- ✅ Helper functions

---

## ✅ Checklist

Before going live:

- [ ] Got API credentials from Lalamove
- [ ] Added keys to `.env` file
- [ ] Updated store location in `lalamove.ts`
- [ ] Tested in sandbox environment
- [ ] Added keys to Vercel environment variables
- [ ] Tested delivery quotation
- [ ] Tested booking delivery
- [ ] Switched to production environment
- [ ] Monitored first few deliveries

---

## 📞 Support

### Lalamove Support:
- **Email:** partners@lalamove.com
- **Phone:** +63 2 8234 2222
- **Developer Docs:** https://developers.lalamove.com/

### Issues:
- Check API credentials are correct
- Verify environment (sandbox vs production)
- Check store coordinates are accurate
- Review API response errors in console

---

## 📝 Next Steps

1. ✅ **Get API credentials** from Lalamove
2. ✅ **Paste them in `.env`** file
3. ✅ **Update store location** in config
4. ✅ **Test in sandbox** mode
5. ✅ **Deploy to Vercel** with environment variables
6. ✅ **Switch to production** when ready

---

**Your Lalamove integration is ready! Just add your API keys!** 🚚✨

