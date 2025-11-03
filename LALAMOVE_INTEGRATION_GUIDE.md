# 🚚 Lalamove Integration - How to Make It Functional

## ✅ What's Already Working:

- ✅ UI/UX - Customers can select Lalamove option
- ✅ Credentials configured (API Key & Secret)
- ✅ Config file ready (`src/config/lalamove.ts`)
- ✅ Visual selection working

---

## 🎯 What Needs to Be Added for Full Functionality:

To make Lalamove fully functional, you need to implement these features:

### 1. **Get Delivery Quote** (Calculate Cost)
When customer enters address, calculate delivery fee using Lalamove API

### 2. **Book Delivery** (Create Order)
When order is placed, automatically book a Lalamove driver

### 3. **Track Delivery** (Get Status)
Allow customer to track their delivery in real-time

### 4. **Handle Webhooks** (Get Updates)
Receive updates when driver is assigned, picked up, delivered

---

## 📋 Step-by-Step Implementation:

### **STEP 1: Create Lalamove API Service**

Create a new file: `src/services/lalamoveService.ts`

```typescript
import { lalamoveConfig, getApiBaseUrl } from '../config/lalamove';

// Helper to generate signature (required by Lalamove)
const generateSignature = (method: string, path: string, timestamp: string, body: string): string => {
  const crypto = require('crypto');
  const rawSignature = `${timestamp}\r\n${method}\r\n${path}\r\n\r\n${body}`;
  return crypto
    .createHmac('sha256', lalamoveConfig.apiSecret)
    .update(rawSignature)
    .digest('hex');
};

// 1. Get Delivery Quotation
export const getDeliveryQuote = async (
  pickupAddress: string,
  deliveryAddress: string
) => {
  const baseUrl = getApiBaseUrl();
  const path = '/v3/quotations';
  const timestamp = Date.now().toString();
  
  const body = {
    serviceType: lalamoveConfig.serviceType, // MOTORCYCLE
    language: lalamoveConfig.language,
    stops: [
      {
        location: {
          address: pickupAddress // Your store address
        }
      },
      {
        location: {
          address: deliveryAddress // Customer address
        }
      }
    ]
  };

  const bodyString = JSON.stringify(body);
  const signature = generateSignature('POST', path, timestamp, bodyString);

  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `hmac ${lalamoveConfig.apiKey}:${timestamp}:${signature}`,
      'Market': lalamoveConfig.region
    },
    body: bodyString
  });

  const data = await response.json();
  return data;
};

// 2. Book Delivery
export const bookDelivery = async (
  orderDetails: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    items: string;
    totalAmount: number;
  }
) => {
  const baseUrl = getApiBaseUrl();
  const path = '/v3/orders';
  const timestamp = Date.now().toString();

  const body = {
    quotationId: '', // Get this from getDeliveryQuote()
    sender: {
      name: 'Chick Central',
      phone: '+639XXXXXXXXX' // Your store phone
    },
    recipients: [
      {
        name: orderDetails.customerName,
        phone: orderDetails.customerPhone,
        location: {
          address: orderDetails.deliveryAddress
        },
        remarks: `Order: ${orderDetails.items}\nTotal: ₱${orderDetails.totalAmount}`
      }
    ]
  };

  const bodyString = JSON.stringify(body);
  const signature = generateSignature('POST', path, timestamp, bodyString);

  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `hmac ${lalamoveConfig.apiKey}:${timestamp}:${signature}`,
      'Market': lalamoveConfig.region
    },
    body: bodyString
  });

  const data = await response.json();
  return data;
};

// 3. Track Delivery
export const trackDelivery = async (orderId: string) => {
  const baseUrl = getApiBaseUrl();
  const path = `/v3/orders/${orderId}`;
  const timestamp = Date.now().toString();
  
  const signature = generateSignature('GET', path, timestamp, '');

  const response = await fetch(`${baseUrl}${path}`, {
    method: 'GET',
    headers: {
      'Authorization': `hmac ${lalamoveConfig.apiKey}:${timestamp}:${signature}`,
      'Market': lalamoveConfig.region
    }
  });

  const data = await response.json();
  return data;
};
```

---

### **STEP 2: Update Checkout to Calculate Delivery Fee**

In `src/components/Checkout.tsx`, add:

```typescript
import { getDeliveryQuote } from '../services/lalamoveService';

// Add state for delivery fee
const [deliveryFee, setDeliveryFee] = useState(0);
const [calculatingFee, setCalculatingFee] = useState(false);

// Calculate delivery fee when address changes
useEffect(() => {
  if (serviceType === 'delivery' && deliveryMethod === 'lalamove' && address) {
    calculateDeliveryFee();
  }
}, [address, deliveryMethod, serviceType]);

const calculateDeliveryFee = async () => {
  setCalculatingFee(true);
  try {
    const quote = await getDeliveryQuote(
      'Your Store Address', // From config
      address // Customer address
    );
    setDeliveryFee(quote.priceBreakdown.total);
  } catch (error) {
    console.error('Error calculating delivery fee:', error);
    setDeliveryFee(0);
  }
  setCalculatingFee(false);
};

// Show delivery fee in UI
{deliveryMethod === 'lalamove' && address && (
  <div className="mt-3 p-3 bg-green-50 rounded-lg">
    <p className="text-sm text-green-900">
      {calculatingFee ? (
        '⏳ Calculating delivery fee...'
      ) : (
        `🚚 Delivery Fee: ₱${deliveryFee.toFixed(2)}`
      )}
    </p>
  </div>
)}
```

---

### **STEP 3: Book Delivery When Order is Placed**

Update `handlePlaceOrder`:

```typescript
const handlePlaceOrder = async () => {
  // ... existing code ...

  // If Lalamove selected, book delivery
  if (serviceType === 'delivery' && deliveryMethod === 'lalamove') {
    try {
      const deliveryOrder = await bookDelivery({
        customerName,
        customerPhone: contactNumber,
        deliveryAddress: address,
        items: cartItems.map(item => item.name).join(', '),
        totalAmount: totalPrice
      });
      
      console.log('Lalamove order created:', deliveryOrder);
      // Save orderId for tracking
      const lalamoveOrderId = deliveryOrder.orderId;
    } catch (error) {
      console.error('Error booking Lalamove:', error);
    }
  }

  // Continue with messenger...
};
```

---

## 🎯 Simple Implementation (Recommended for Now):

Since full Lalamove integration requires backend work, here's a **simple approach**:

### **Option 1: Show Lalamove in Order Message**

Just include the delivery method in the WhatsApp message:

```typescript
const orderDetails = `
🛒 Chick Central ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: Delivery ${deliveryMethod === 'lalamove' ? '(via Lalamove 🚚)' : '(Standard 🛵)'}
🏠 Address: ${address}

... rest of order ...
`;
```

**Then manually:**
1. See the order says "Lalamove"
2. Go to Lalamove website/app
3. Book the delivery manually
4. Send tracking link to customer

---

### **Option 2: Add Delivery Fee Input**

Let customer know if they choose Lalamove:

```typescript
{deliveryMethod === 'lalamove' && (
  <div className="mt-3 p-4 bg-green-50 border border-green-300 rounded-lg">
    <p className="text-sm text-green-900 font-semibold mb-2">
      📋 Lalamove Delivery Selected
    </p>
    <p className="text-xs text-green-800">
      • Professional driver will be assigned<br/>
      • You'll receive tracking link after order<br/>
      • Delivery fee will be calculated based on distance<br/>
      • Estimated: ₱50-150
    </p>
  </div>
)}
```

---

## 🚀 Quick Start (What You Can Do Now):

### **1. Update the WhatsApp Message**

Add this to your order message to show delivery method:

```typescript
${serviceType === 'delivery' ? `
🏠 Address: ${address}
${landmark ? `🗺️ Landmark: ${landmark}\n` : ''}
🚚 Delivery Method: ${deliveryMethod === 'lalamove' ? 'Lalamove (Professional)' : 'Standard'}
` : ''}
```

### **2. Test the Selection**

Make sure the selection is being saved:

```typescript
console.log('Delivery method selected:', deliveryMethod);
```

### **3. Add Visual Confirmation**

Show what was selected in the order summary:

```typescript
{serviceType === 'delivery' && (
  <>
    <p className="text-sm text-gray-600">Address: {address}</p>
    <p className="text-sm text-gray-600">
      Delivery: {deliveryMethod === 'lalamove' ? '🚚 Lalamove' : '🛵 Standard'}
    </p>
  </>
)}
```

---

## 📊 Current Status vs Full Integration:

| Feature | Current Status | Full Integration |
|---------|---------------|------------------|
| UI Selection | ✅ Working | ✅ Working |
| Visual Feedback | ✅ Working | ✅ Working |
| Show in Order | ⏳ Need to add | ✅ Included |
| Calculate Fee | ❌ Not implemented | ✅ API call |
| Book Driver | ❌ Not implemented | ✅ Auto-book |
| Tracking | ❌ Not implemented | ✅ Real-time |

---

## 💡 Recommendation:

**For now (Simple approach):**
1. ✅ Keep the selection UI (already done)
2. ✅ Show delivery method in WhatsApp message
3. ✅ Manually book Lalamove when you see the order
4. ✅ Send tracking link to customer manually

**Later (Full integration):**
1. Implement API service
2. Calculate delivery fee automatically
3. Auto-book Lalamove driver
4. Send tracking link automatically

---

## 📝 Next Steps:

Which approach do you want?

**A. Simple (works now):**
- I'll update the order message to show Lalamove selection
- You manually book deliveries
- Quick and easy!

**B. Full Integration (more work):**
- I'll create the API service
- Automatic booking
- Real-time tracking
- More complex but fully automated

---

**Let me know which approach you prefer and I'll implement it!** 🚀

