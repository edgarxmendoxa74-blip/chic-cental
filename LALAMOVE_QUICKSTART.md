# 🚀 Lalamove Integration Quick Start Guide

This guide will help you get the complete Lalamove delivery integration running in under 5 minutes.

## 📋 Prerequisites

- Node.js installed (v16 or higher)
- npm or yarn package manager
- Lalamove API credentials (already configured)

## 🎯 Quick Start

### Step 1: Start the Backend API

Open **Terminal 1**:

```bash
cd backend
npm install
npm start
```

You should see:
```
✅ ====================================
✅ Server running on port 4000
✅ Lalamove Backend API Ready!
✅ ====================================

📍 API Endpoints:
   GET  http://localhost:4000/
   POST http://localhost:4000/get-quotation
   POST http://localhost:4000/create-delivery
   GET  http://localhost:4000/order-status/:orderId

🏪 Pickup Location: 52 Ballecer Street, Zone 2, Central Signal Village, Taguig
🔐 Using API Key: pk_test_43dc7dc...
🌐 Environment: Sandbox
```

✅ **Backend is ready!**

---

### Step 2: Start the Frontend

Open **Terminal 2** (keep Terminal 1 running):

```bash
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **Frontend is ready!**

---

### Step 3: Test the Integration

1. **Open your browser:** http://localhost:5173/

2. **Add items to cart** and proceed to checkout

3. **Select "Delivery" service type**

4. **Choose "Lalamove"** as delivery method

5. **Select vehicle type:**
   - 🏍️ Motorcycle (fastest)
   - 🚗 Sedan (comfortable)
   - 🚐 Van (bulk orders)

6. **Enter delivery address** 
   - You'll see real-time quotation with:
     - Delivery fee
     - Distance
     - Estimated time

7. **Click "Proceed to Payment"**
   - Lalamove order is created automatically
   - Tracking link opens in new tab
   - Order details shown on payment page

8. **Click "Track Your Lalamove Delivery"**
   - Opens Lalamove tracking page
   - Monitor driver location in real-time

---

## 🧪 Test Backend Independently

### Test with PowerShell (Windows):

```powershell
cd backend
.\test-api.ps1
```

### Test with cURL:

**Get Quotation:**
```bash
curl -X POST http://localhost:4000/get-quotation \
  -H "Content-Type: application/json" \
  -d '{
    "dropoff": {
      "address": "SM Aura, Taguig",
      "lat": "14.5536",
      "lng": "121.0492"
    },
    "serviceType": "MOTORCYCLE"
  }'
```

**Create Delivery:**
```bash
curl -X POST http://localhost:4000/create-delivery \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Juan Dela Cruz",
    "phone": "09171234567",
    "dropoff": {
      "address": "SM Aura, Taguig",
      "lat": "14.5536",
      "lng": "121.0492"
    },
    "serviceType": "MOTORCYCLE"
  }'
```

---

## 🔧 Configuration

### Current Setup (Sandbox Mode)

**Backend:** `backend/.env`
```env
LALAMOVE_API_KEY=pk_test_your_api_key_here
LALAMOVE_SECRET_KEY=sk_test_your_secret_key_here
PORT=4000
```
*(Your actual keys are already configured in the file)*

**Frontend:** `.env`
```env
VITE_BACKEND_URL=http://localhost:4000
```

**Pickup Location (Fixed):**
- 📍 52 Ballecer Street, Zone 2, Central Signal Village, Taguig
- 📌 Coordinates: 14.4973, 121.0450
- 📞 Phone: +639052931408

---

## 🌐 Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│             │         │             │         │             │
│  Frontend   │────────▶│   Backend   │────────▶│  Lalamove   │
│  (React)    │◀────────│  (Node.js)  │◀────────│     API     │
│             │         │             │         │             │
│ Port 5173   │         │ Port 4000   │         │   Sandbox   │
└─────────────┘         └─────────────┘         └─────────────┘
```

### Flow:
1. Customer fills delivery details
2. Frontend calls backend for quotation
3. Backend signs request with HMAC SHA256
4. Backend calls Lalamove API
5. Quotation returned to frontend
6. Customer proceeds to payment
7. Backend creates delivery order
8. Lalamove assigns driver
9. Customer gets tracking link
10. Real-time delivery tracking

---

## 🐛 Troubleshooting

### Backend won't start

**Error:** `Missing required environment variables`
- **Fix:** Check `backend/.env` file exists with correct API keys

**Error:** `Port 4000 already in use`
- **Fix:** Change PORT in `backend/.env` to another port (e.g., 4001)
- **Fix:** Update `VITE_BACKEND_URL` in frontend `.env` accordingly

### Frontend can't connect to backend

**Error:** `Failed to fetch`
- **Fix:** Ensure backend is running on port 4000
- **Fix:** Check `VITE_BACKEND_URL` in `.env` is correct
- **Fix:** Restart frontend dev server after changing .env

### Lalamove API errors

**Error:** `Authentication failed`
- **Fix:** Verify API keys in `backend/.env` are correct
- **Fix:** Ensure no extra spaces in .env file

**Error:** `Invalid coordinates`
- **Fix:** Ensure lat/lng are strings: `"14.5536"` not `14.5536`

### Quotation not loading

- **Check:** Backend logs in Terminal 1 for errors
- **Check:** Browser console (F12) for error messages
- **Check:** Address is valid and has coordinates

---

## 📊 Monitoring

### Backend Logs

Watch Terminal 1 for detailed logs:
```
📥 2024-01-15T10:00:00.000Z - POST /get-quotation
Body: {...}
🔐 Generating signature...
📤 Request URL: https://rest.sandbox.lalamove.com/v3/quotations
📨 Response status: 200
✅ Quotation received
```

### Frontend Console

Open browser DevTools (F12) to see:
```
📤 Getting Lalamove quotation...
✅ Quotation received: {...}
📤 Creating Lalamove delivery order...
✅ Order created: {...}
```

---

## 🚀 Going to Production

### 1. Deploy Backend

Deploy to Railway, Render, or Heroku:

```bash
# Example: Railway
railway login
railway init
railway up
```

Get your backend URL: `https://your-app.railway.app`

### 2. Update Frontend .env

```env
VITE_BACKEND_URL=https://your-app.railway.app
```

### 3. Switch to Production API

In `backend/server.js`:
```javascript
const BASE_URL = "https://rest.lalamove.com"; // Remove 'sandbox'
```

Update `backend/.env` with production keys:
```env
LALAMOVE_API_KEY=pk_prod_your_key
LALAMOVE_SECRET_KEY=sk_prod_your_secret
```

### 4. Deploy Frontend

Deploy to Vercel, Netlify, or Cloudflare Pages.

Add environment variables in dashboard:
- `VITE_BACKEND_URL=https://your-backend.railway.app`

---

## 📚 Further Reading

- [Backend API Documentation](backend/README.md)
- [Lalamove Integration Guide](LALAMOVE_INTEGRATION.md)
- [Lalamove API Docs](https://developers.lalamove.com/)

---

## ✅ Checklist

- [ ] Backend running on port 4000
- [ ] Frontend running on port 5173
- [ ] Can access http://localhost:5173/ in browser
- [ ] Can get quotation for delivery address
- [ ] Can create delivery order
- [ ] Tracking link opens successfully
- [ ] Backend logs show successful API calls

---

## 🆘 Need Help?

1. **Check logs** - Backend Terminal 1 + Browser Console
2. **Verify config** - `.env` files have correct values
3. **Test backend** - Run `backend/test-api.ps1` independently
4. **Restart services** - Stop both terminals and start fresh

---

**🎉 You're all set! Happy delivering with Lalamove! 🚀**

