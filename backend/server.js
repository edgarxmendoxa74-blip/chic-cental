import express from 'express';
import fetch from 'node-fetch';
import crypto from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Lalamove Configuration
const BASE_URL = "https://rest.sandbox.lalamove.com";
const LALAMOVE_API_KEY = process.env.LALAMOVE_API_KEY;
const LALAMOVE_SECRET_KEY = process.env.LALAMOVE_SECRET_KEY;

// Validate required environment variables
if (!LALAMOVE_API_KEY || !LALAMOVE_SECRET_KEY) {
  console.error('❌ Missing required environment variables!');
  console.error('   Please set LALAMOVE_API_KEY and LALAMOVE_SECRET_KEY in .env file');
  process.exit(1);
}

// Fixed pickup location for Chick Central
const PICKUP_LOCATION = {
  address: "52 Ballecer Street, Zone 2, Central Signal Village, Taguig",
  lat: "14.4973",
  lng: "121.0450",
  contact: {
    name: "Chick Central",
    phone: "+639052931408"
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`\n📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  next();
});

/**
 * Generate HMAC SHA256 signature for Lalamove API
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} path - API endpoint path
 * @param {object} body - Request body object
 * @returns {string} Base64 encoded signature
 */
function generateSignature(timestamp, method, path, body) {
  const bodyString = body ? JSON.stringify(body) : '';
  const rawSignature = `${timestamp}\r\n${method}\r\n${path}\r\n\r\n${bodyString}`;
  
  console.log('🔐 Generating signature...');
  console.log('Raw signature string:', rawSignature);
  
  const signature = crypto
    .createHmac('sha256', LALAMOVE_SECRET_KEY)
    .update(rawSignature)
    .digest('hex');
  
  console.log('Generated signature:', signature);
  return signature;
}

/**
 * Make authenticated request to Lalamove API
 * @param {string} path - API endpoint path
 * @param {string} method - HTTP method
 * @param {object} body - Request body
 * @returns {Promise<object>} API response
 */
async function lalamoveRequest(path, method = 'POST', body = null) {
  const timestamp = Date.now().toString();
  const signature = generateSignature(timestamp, method, path, body);
  
  const headers = {
    'Authorization': `hmac ${LALAMOVE_API_KEY}:${timestamp}:${signature}`,
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Market': 'PH'
  };

  console.log('📤 Request headers:', headers);
  console.log('📤 Request URL:', `${BASE_URL}${path}`);
  
  const options = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json();
    
    console.log('📨 Response status:', response.status);
    console.log('📨 Response data:', JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    
    return data;
  } catch (error) {
    console.error('❌ Lalamove API Error:', error.message);
    throw error;
  }
}

// ==================== ENDPOINTS ====================

/**
 * Health check endpoint
 */
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Chick Central Lalamove Backend API',
    endpoints: {
      quotation: 'POST /get-quotation',
      booking: 'POST /create-delivery',
      health: 'GET /'
    }
  });
});

/**
 * 1️⃣ Get Quotation Endpoint
 * POST /get-quotation
 * 
 * Body:
 * {
 *   "pickup": { "address": "...", "lat": "14.4973", "lng": "121.0450" },
 *   "dropoff": { "address": "...", "lat": "14.5500", "lng": "121.0300" },
 *   "serviceType": "MOTORCYCLE"
 * }
 */
app.post('/get-quotation', async (req, res) => {
  try {
    const { pickup, dropoff, serviceType = 'MOTORCYCLE' } = req.body;

    // Validation
    if (!dropoff?.address || !dropoff?.lat || !dropoff?.lng) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'dropoff.address, dropoff.lat, and dropoff.lng are required'
      });
    }

    // Use provided pickup or default to Chick Central location
    const pickupLocation = pickup || {
      address: PICKUP_LOCATION.address,
      lat: PICKUP_LOCATION.lat,
      lng: PICKUP_LOCATION.lng
    };

    // Prepare quotation request
    const quotationBody = {
      data: {
        serviceType: serviceType,
        stops: [
          {
            coordinates: {
              lat: pickupLocation.lat,
              lng: pickupLocation.lng
            },
            address: pickupLocation.address
          },
          {
            coordinates: {
              lat: dropoff.lat,
              lng: dropoff.lng
            },
            address: dropoff.address
          }
        ],
        language: "en_PH"
      }
    };

    console.log('🎯 Getting quotation...');
    const result = await lalamoveRequest('/v3/quotations', 'POST', quotationBody);

    res.json({
      success: true,
      data: {
        serviceType: result.data?.serviceType || serviceType,
        totalFee: result.data?.priceBreakdown?.total,
        currency: result.data?.priceBreakdown?.currency || 'PHP',
        distance: result.data?.distance,
        estimatedTime: result.data?.estimatedDeliveryTime,
        priceBreakdown: result.data?.priceBreakdown
      }
    });

  } catch (error) {
    console.error('❌ Quotation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get quotation',
      message: error.message
    });
  }
});

/**
 * 2️⃣ Create Delivery Endpoint
 * POST /create-delivery
 * 
 * Body:
 * {
 *   "customerName": "Juan Dela Cruz",
 *   "phone": "09171234567",
 *   "dropoff": { "address": "...", "lat": "14.5500", "lng": "121.0300" },
 *   "serviceType": "MOTORCYCLE",
 *   "remarks": "Please call upon arrival"
 * }
 */
app.post('/create-delivery', async (req, res) => {
  try {
    const { 
      customerName, 
      phone, 
      dropoff, 
      serviceType = 'MOTORCYCLE',
      remarks = 'Please call upon arrival',
      orderTotal
    } = req.body;

    // Validation
    if (!customerName || !phone || !dropoff?.address || !dropoff?.lat || !dropoff?.lng) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'customerName, phone, and dropoff details are required'
      });
    }

    // Format phone number (ensure it starts with +63)
    let formattedPhone = phone.replace(/\s+/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '+63' + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+63' + formattedPhone;
    }

    // Prepare order request
    const orderBody = {
      data: {
        quotedTotalFee: {
          amount: "0",
          currency: "PHP"
        },
        sms: true,
        serviceType: serviceType,
        stops: [
          // Pickup stop
          {
            coordinates: {
              lat: PICKUP_LOCATION.lat,
              lng: PICKUP_LOCATION.lng
            },
            address: PICKUP_LOCATION.address,
            contactName: PICKUP_LOCATION.contact.name,
            contactPhone: PICKUP_LOCATION.contact.phone
          },
          // Dropoff stop
          {
            coordinates: {
              lat: dropoff.lat,
              lng: dropoff.lng
            },
            address: dropoff.address,
            contactName: customerName,
            contactPhone: formattedPhone,
            remarks: orderTotal ? `${remarks} | Order Total: ₱${orderTotal}` : remarks
          }
        ],
        deliveries: [
          {
            toStop: 1,
            toContact: {
              name: customerName,
              phone: formattedPhone
            },
            remarks: orderTotal ? `Chick Central Order - Total: ₱${orderTotal}` : 'Chick Central Order'
          }
        ],
        language: "en_PH",
        metadata: {
          source: "Chick Central Website",
          customer: customerName,
          orderTotal: orderTotal || "N/A"
        }
      }
    };

    console.log('🚚 Creating delivery order...');
    const result = await lalamoveRequest('/v3/orders', 'POST', orderBody);

    res.json({
      success: true,
      data: {
        orderId: result.data?.orderId,
        customerOrderId: result.data?.customerOrderId,
        status: result.data?.status,
        shareLink: result.data?.shareLink,
        trackingLink: result.data?.shareLink, // Same as shareLink
        estimatedDeliveryTime: result.data?.estimatedDeliveryTime,
        priceBreakdown: result.data?.priceBreakdown
      }
    });

  } catch (error) {
    console.error('❌ Create delivery error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create delivery',
      message: error.message
    });
  }
});

/**
 * 3️⃣ Get Order Status Endpoint (optional)
 * GET /order-status/:orderId
 */
app.get('/order-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        error: 'Missing orderId',
        message: 'orderId parameter is required'
      });
    }

    console.log('📦 Getting order status...');
    const result = await lalamoveRequest(`/v3/orders/${orderId}`, 'GET');

    res.json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('❌ Order status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get order status',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n✅ ====================================');
  console.log('✅ Server running on port', PORT);
  console.log('✅ Lalamove Backend API Ready!');
  console.log('✅ ====================================');
  console.log('\n📍 API Endpoints:');
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   POST http://localhost:${PORT}/get-quotation`);
  console.log(`   POST http://localhost:${PORT}/create-delivery`);
  console.log(`   GET  http://localhost:${PORT}/order-status/:orderId`);
  console.log('\n🏪 Pickup Location:', PICKUP_LOCATION.address);
  console.log('🔐 Using API Key:', LALAMOVE_API_KEY.substring(0, 15) + '...');
  console.log('🌐 Environment: Sandbox\n');
});

