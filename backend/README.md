# 🚀 Chick Central Lalamove Backend API

Complete Node.js + Express backend integration for Lalamove Delivery API (REST v3).

## Features

✅ ES Modules (import syntax)  
✅ Sandbox environment  
✅ HMAC SHA256 authentication  
✅ JSON responses only  
✅ CORS enabled  
✅ Comprehensive logging  

---

## 🔧 Installation

```bash
cd backend
npm install
```

---

## 🏃 Running the Server

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

Server will start on: `http://localhost:4000`

---

## 📡 API Endpoints

### 1️⃣ Health Check
**GET** `/`

**Response:**
```json
{
  "status": "ok",
  "message": "Chick Central Lalamove Backend API",
  "endpoints": {
    "quotation": "POST /get-quotation",
    "booking": "POST /create-delivery",
    "health": "GET /"
  }
}
```

---

### 2️⃣ Get Quotation
**POST** `/get-quotation`

Get delivery price estimate before creating an order.

**Request Body:**
```json
{
  "dropoff": {
    "address": "Bonifacio Global City, Taguig",
    "lat": "14.5500",
    "lng": "121.0300"
  },
  "serviceType": "MOTORCYCLE"
}
```

**Optional Fields:**
- `pickup` - If not provided, uses Chick Central's fixed location
- `serviceType` - Options: `MOTORCYCLE`, `SEDAN`, `VAN` (default: `MOTORCYCLE`)

**Response:**
```json
{
  "success": true,
  "data": {
    "serviceType": "MOTORCYCLE",
    "totalFee": "85.50",
    "currency": "PHP",
    "distance": {
      "value": "3.5",
      "unit": "km"
    },
    "estimatedTime": "20-30 minutes",
    "priceBreakdown": {
      "base": "50.00",
      "perKm": "10.00",
      "total": "85.50"
    }
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4000/get-quotation \
  -H "Content-Type: application/json" \
  -d '{
    "dropoff": {
      "address": "BGC, Taguig",
      "lat": "14.5500",
      "lng": "121.0300"
    },
    "serviceType": "MOTORCYCLE"
  }'
```

---

### 3️⃣ Create Delivery Order
**POST** `/create-delivery`

Create an actual Lalamove delivery order.

**Request Body:**
```json
{
  "customerName": "Juan Dela Cruz",
  "phone": "09171234567",
  "dropoff": {
    "address": "Bonifacio Global City, Taguig",
    "lat": "14.5500",
    "lng": "121.0300"
  },
  "serviceType": "MOTORCYCLE",
  "remarks": "Please call upon arrival",
  "orderTotal": "500"
}
```

**Required Fields:**
- `customerName` - Customer's full name
- `phone` - Contact number (formats: 09171234567, +639171234567)
- `dropoff.address` - Delivery address
- `dropoff.lat` - Latitude
- `dropoff.lng` - Longitude

**Optional Fields:**
- `serviceType` - Vehicle type (default: `MOTORCYCLE`)
- `remarks` - Special instructions for driver
- `orderTotal` - Order amount for reference

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "PH-123456789",
    "customerOrderId": "CHICK-001",
    "status": "ASSIGNING_DRIVER",
    "shareLink": "https://www.lalamove.com/track/PH-123456789",
    "trackingLink": "https://www.lalamove.com/track/PH-123456789",
    "estimatedDeliveryTime": "2025-11-04T20:30:00Z",
    "priceBreakdown": {
      "total": "85.50",
      "currency": "PHP"
    }
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:4000/create-delivery \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Juan Dela Cruz",
    "phone": "09171234567",
    "dropoff": {
      "address": "BGC, Taguig",
      "lat": "14.5500",
      "lng": "121.0300"
    },
    "serviceType": "MOTORCYCLE",
    "orderTotal": "500"
  }'
```

---

### 4️⃣ Get Order Status
**GET** `/order-status/:orderId`

Track an existing delivery order.

**Example:**
```
GET http://localhost:4000/order-status/PH-123456789
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "PH-123456789",
    "status": "IN_TRANSIT",
    "driver": {
      "name": "Pedro Santos",
      "phone": "+639171234567",
      "plateNumber": "ABC 1234"
    },
    "estimatedArrival": "2025-11-04T20:30:00Z"
  }
}
```

---

## 🏪 Fixed Pickup Location

All deliveries automatically use Chick Central's location:

```
Address: 52 Ballecer Street, Zone 2, Central Signal Village, Taguig
Latitude: 14.4973
Longitude: 121.0450
Contact: Chick Central (+639052931408)
```

---

## 🔐 Authentication

The server automatically handles HMAC SHA256 authentication:

```javascript
signature = HMAC_SHA256(
  timestamp + "\r\n" + 
  method + "\r\n" + 
  path + "\r\n\r\n" + 
  JSON.stringify(body), 
  SECRET_KEY
)
```

Headers sent to Lalamove:
```
Authorization: hmac API_KEY:timestamp:signature
Market: PH
Content-Type: application/json; charset=utf-8
Accept: application/json
```

---

## 🚗 Service Types

Available vehicle types:

| Service Type | Description | Best For |
|-------------|-------------|----------|
| `MOTORCYCLE` | Fast, economical | Small orders, light items |
| `SEDAN` | Standard car | Regular orders, multiple items |
| `VAN` | Large vehicle | Bulk orders, catering |

---

## 🐛 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

**Common Errors:**

- `400` - Missing required fields
- `500` - Lalamove API error or server error

---

## 📝 Logging

The server logs all requests and responses for debugging:

```
📥 2025-11-04T12:00:00.000Z - POST /get-quotation
Body: { "dropoff": { ... } }
🔐 Generating signature...
📤 Request headers: { ... }
📨 Response status: 200
📨 Response data: { ... }
```

---

## 🌐 Environment Variables

Create a `.env` file:

```env
LALAMOVE_API_KEY=your_lalamove_api_key_here
LALAMOVE_SECRET_KEY=your_lalamove_secret_key_here
PORT=4000
```

**Important:** Get your API credentials from [Lalamove Developer Portal](https://developers.lalamove.com/)

---

## 🔄 Integration with Frontend

Update your frontend `.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Example frontend fetch:

```javascript
// Get quotation
const response = await fetch('http://localhost:4000/get-quotation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dropoff: {
      address: customerAddress,
      lat: '14.5500',
      lng: '121.0300'
    },
    serviceType: 'MOTORCYCLE'
  })
});

const data = await response.json();
console.log('Delivery fee:', data.data.totalFee);

// Create delivery
const orderResponse = await fetch('http://localhost:4000/create-delivery', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'Juan Dela Cruz',
    phone: '09171234567',
    dropoff: {
      address: customerAddress,
      lat: '14.5500',
      lng: '121.0300'
    },
    orderTotal: '500'
  })
});

const orderData = await orderResponse.json();
window.open(orderData.data.trackingLink, '_blank');
```

---

## 🚀 Deployment

### Deploy to Vercel, Railway, or Render

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables in dashboard
4. Deploy!

### For Production

Update `BASE_URL` in `server.js`:
```javascript
const BASE_URL = "https://rest.lalamove.com"; // Remove .sandbox
```

Use production API keys in `.env`

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "node-fetch": "^3.3.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

---

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:4000/

# Test quotation
curl -X POST http://localhost:4000/get-quotation \
  -H "Content-Type: application/json" \
  -d '{"dropoff":{"address":"BGC, Taguig","lat":"14.5500","lng":"121.0300"}}'

# Test delivery creation
curl -X POST http://localhost:4000/create-delivery \
  -H "Content-Type: application/json" \
  -d '{
    "customerName":"Test User",
    "phone":"09171234567",
    "dropoff":{"address":"BGC","lat":"14.5500","lng":"121.0300"}
  }'
```

---

## 📚 Lalamove API Documentation

Official docs: https://developers.lalamove.com/

---

## 💡 Tips

1. **Always get quotation first** before creating an order
2. **Use proper coordinates** - Wrong lat/lng will cause delivery failures
3. **Phone format matters** - The server auto-formats to +63 format
4. **Check logs** - All requests/responses are logged for debugging
5. **Test in sandbox** - Use test credentials before going live

---

## 🛠️ Troubleshooting

### Port already in use
```bash
# Kill process on port 4000 (Windows)
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Or use different port
PORT=5000 npm start
```

### CORS issues
- Frontend and backend must run on different ports
- CORS is already enabled in the server

### Authentication errors
- Check API keys in `.env`
- Verify signature generation matches Lalamove specs
- Check timestamp format

---

## ✅ Success!

You now have a fully functional Lalamove delivery backend! 🎉

Start the server and test the endpoints to see it in action.

