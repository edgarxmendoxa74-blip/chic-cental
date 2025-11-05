# 🚀 Lalamove Integration Guide

## Overview
Your Chick Central app now supports **Lalamove** delivery integration! Customers can choose between standard delivery (your own riders) or Lalamove for fast, tracked delivery.

## Features Implemented

✅ **Delivery Method Selection**
- Standard Delivery (own riders)
- Lalamove Delivery (tracked, professional)

✅ **Vehicle Type**
- 🏍️ Motorcycle - Fast delivery for small orders

✅ **Real-time Quotations**
- Automatic delivery fee calculation
- Distance estimation
- ETA display

✅ **Smart Integration**
- Seamless checkout flow
- Order details include delivery method
- Messenger integration updated

## Setup Instructions

### 1. Get Lalamove API Credentials

1. Visit [Lalamove API Portal](https://www.lalamove.com/api)
2. Sign up for a business account
3. Go to API Dashboard
4. Get your credentials:
   - API Key
   - API Secret
5. Start with Sandbox (test) environment

### 2. Configure Environment Variables

Update your `.env` file:

```env
# Lalamove Configuration
VITE_LALAMOVE_USE_SANDBOX=true  # Set to false for production
VITE_LALAMOVE_API_KEY=your_sandbox_api_key_here
VITE_LALAMOVE_API_SECRET=your_sandbox_api_secret_here
VITE_LALAMOVE_PROD_API_KEY=your_production_api_key_here
VITE_LALAMOVE_PROD_API_SECRET=your_production_api_secret_here
```

### 3. Update Vercel Environment Variables

Add the same variables to Vercel:
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all Lalamove variables
5. Redeploy

### 4. Update Restaurant Location

Edit `src/config/lalamove.ts`:

```typescript
export const DEFAULT_PICKUP = {
  coordinates: {
    lat: 'YOUR_RESTAURANT_LATITUDE',
    lng: 'YOUR_RESTAURANT_LONGITUDE',
  },
  address: 'Your Restaurant Address',
  contact: {
    name: 'Chick Central',
    phone: '+639052931408',  // Your contact number
  },
};
```

## How It Works

### Customer Flow

1. **Select Delivery Service**
   - Customer adds items to cart
   - Proceeds to checkout
   - Chooses "Delivery" service type

2. **Choose Delivery Method**
   - Standard Delivery (default)
   - Lalamove (with vehicle selection)

3. **Get Quotation**
   - Customer enters delivery address
   - System automatically gets Lalamove quote
   - Shows estimated fee and ETA

4. **Place Order**
   - Order includes Lalamove details
   - Sent via Messenger with delivery info

### Order Processing

When customer selects Lalamove:
- Quotation is fetched automatically
- Delivery fee is calculated based on:
  - Distance from restaurant to customer
  - Vehicle type selected
  - Current Lalamove rates
  
## Pricing

### Lalamove Rates (Approximate)

**Motorcycle 🏍️**
- Base: ₱50
- Per km: ₱10

*Actual rates may vary based on Lalamove's current pricing*

## Important Security Notes

⚠️ **For Production:**

The current implementation uses client-side API calls for demonstration. For production:

1. **Create Backend API**
   - Never expose API keys in frontend
   - Create backend endpoints for:
     - `/api/lalamove/quotation`
     - `/api/lalamove/order`
     - `/api/lalamove/status`

2. **Implement Proper Authentication**
   - Use HMAC-SHA256 signature
   - Implement request signing on backend
   - Verify responses

3. **Add Error Handling**
   - Handle API failures gracefully
   - Show fallback options
   - Log errors for monitoring

## Testing

### Sandbox Testing

1. Set `VITE_LALAMOVE_USE_SANDBOX=true`
2. Use sandbox API credentials
3. Test orders won't be real deliveries
4. Use test addresses in supported cities

### Test Workflow

```javascript
// Test quotation
1. Enter test address
2. Select Lalamove
3. Choose vehicle type
4. Verify quotation displays
5. Check delivery fee calculation

// Test order placement
1. Complete checkout
2. Verify Messenger message includes:
   - Delivery method: Lalamove
   - Vehicle type
   - Estimated fee
   - ETA
```

## Supported Cities

Currently configured for:
- Manila (MNL)
- Cebu (CEB)
- Davao (DVO)

Add more in `src/config/lalamove.ts`

## API Endpoints Used

### Get Quotation
```
POST /v3/quotations
```
Returns price estimate, distance, and ETA

### Place Order
```
POST /v3/orders
```
Creates delivery order and assigns driver

### Track Order
```
GET /v3/orders/{orderId}
```
Gets order status and driver info

## Customization

### Change Vehicle Types

Edit `src/config/lalamove.ts`:

```typescript
export const LALAMOVE_SERVICE_TYPES = {
  // Add or remove vehicle types
  YOUR_TYPE: {
    id: 'YOUR_TYPE',
    name: 'Your Vehicle',
    description: 'Description',
    icon: '🚚',
  },
};
```

### Modify Pricing Calculation

Edit `src/services/lalamove.ts`:

```typescript
private estimateFee(serviceType: string, distance: number): number {
  // Customize base rates
  const baseRates = {
    MOTORCYCLE: 50,
    // Add your rates
  };
  
  const perKmRate = {
    MOTORCYCLE: 10,
    // Add your rates
  };
  
  return base + distance * perKm;
}
```

## Troubleshooting

### Issue: Quotation not loading
- Check API credentials in `.env`
- Verify sandbox mode setting
- Check browser console for errors
- Ensure address is valid

### Issue: Order placement fails
- Verify all required fields are filled
- Check API key permissions
- Review Lalamove API status
- Check network connection

### Issue: Wrong delivery fee
- Verify restaurant coordinates
- Check distance calculation
- Update pricing in config
- Refresh quotation

## Future Enhancements

Possible improvements:
- [ ] Backend API implementation
- [ ] Real-time order tracking
- [ ] Driver location on map
- [ ] Multiple pickup locations
- [ ] Schedule delivery times
- [ ] Delivery history
- [ ] Rating system

## Support

For Lalamove API support:
- Documentation: https://developers.lalamove.com
- Support: api@lalamove.com

For integration issues:
- Check console logs
- Review this guide
- Test in sandbox first
- Verify environment variables

## Resources

- [Lalamove API Docs](https://developers.lalamove.com)
- [Getting Started Guide](https://developers.lalamove.com/#getting-started)
- [API Reference](https://developers.lalamove.com/#api-reference)
- [Rate Card](https://www.lalamove.com/pricing)

---

**Happy Delivering! 🚀🍗**

