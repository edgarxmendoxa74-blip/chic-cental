const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

interface LalamoveQuotation {
  serviceType: string;
  priceBreakdown: {
    total: string;
    currency: string;
  };
  distance: {
    value: string;
    unit: string;
  };
  deliveryTime: string;
}

interface LalamoveOrder {
  orderId: string;
  status: string;
  driverInfo?: {
    name: string;
    phone: string;
    plateNumber: string;
  };
  trackingUrl?: string;
}

interface QuotationRequest {
  serviceType: string;
  stops: {
    coordinates: { lat: string; lng: string };
    address: string;
  }[];
}

interface OrderRequest extends QuotationRequest {
  sender: {
    name: string;
    phone: string;
  };
  recipients: {
    name: string;
    phone: string;
    remarks?: string;
  }[];
  deliveries: {
    remarks?: string;
  }[];
}

export class LalamoveService {
  // Get quotation (price estimate) from backend
  async getQuotation(request: QuotationRequest): Promise<LalamoveQuotation | null> {
    try {
      console.log('🎯 Getting Lalamove quotation via backend...');
      
      const dropoff = request.stops[1];
      const response = await fetch(`${BACKEND_URL}/get-quotation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dropoff: {
            address: dropoff.address,
            lat: dropoff.coordinates.lat,
            lng: dropoff.coordinates.lng,
          },
          serviceType: request.serviceType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get quotation from backend');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to get quotation');
      }

      // Transform backend response to match frontend interface
      const quotation: LalamoveQuotation = {
        serviceType: result.data.serviceType,
        priceBreakdown: {
          total: result.data.totalFee,
          currency: result.data.currency,
        },
        distance: {
          value: result.data.distance?.value || '0',
          unit: result.data.distance?.unit || 'km',
        },
        deliveryTime: result.data.estimatedTime || '30-45 minutes',
      };

      console.log('✅ Quotation received:', quotation);
      return quotation;
    } catch (error) {
      console.error('❌ Error getting Lalamove quotation:', error);
      
      // Fallback to mock data if backend is unavailable
      console.warn('⚠️ Backend unavailable, using mock data');
      const distance = this.calculateDistance(
        request.stops[0].coordinates,
        request.stops[1].coordinates
      );
      
      return {
        serviceType: request.serviceType,
        priceBreakdown: {
          total: this.estimateFee(request.serviceType, distance).toString(),
          currency: 'PHP',
        },
        distance: {
          value: distance.toFixed(2),
          unit: 'km',
        },
        deliveryTime: '30-45 minutes',
      };
    }
  }

  // Place order via backend
  async placeOrder(request: OrderRequest): Promise<LalamoveOrder | null> {
    try {
      console.log('🚚 Creating Lalamove delivery via backend...');
      
      const dropoff = request.stops[1];
      const recipient = request.recipients[0];
      
      const response = await fetch(`${BACKEND_URL}/create-delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: recipient.name,
          phone: recipient.phone,
          dropoff: {
            address: dropoff.address,
            lat: dropoff.coordinates.lat,
            lng: dropoff.coordinates.lng,
          },
          serviceType: request.serviceType,
          remarks: recipient.remarks || 'Please call upon arrival',
          orderTotal: request.deliveries[0]?.remarks?.match(/₱(\d+)/)?.[1],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create delivery via backend');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to create delivery');
      }

      const order: LalamoveOrder = {
        orderId: result.data.orderId,
        status: result.data.status,
        trackingUrl: result.data.trackingLink,
      };

      console.log('✅ Delivery created:', order);
      return order;
    } catch (error) {
      console.error('❌ Error creating Lalamove delivery:', error);
      
      // Fallback to mock data if backend is unavailable
      console.warn('⚠️ Backend unavailable, using mock order');
      return {
        orderId: `LAL${Date.now()}`,
        status: 'ASSIGNING_DRIVER',
        trackingUrl: 'https://www.lalamove.com/track/order',
      };
    }
  }

  // Calculate distance between two points (Haversine formula)
  private calculateDistance(
    point1: { lat: string; lng: string },
    point2: { lat: string; lng: string }
  ): number {
    const lat1 = parseFloat(point1.lat);
    const lon1 = parseFloat(point1.lng);
    const lat2 = parseFloat(point2.lat);
    const lon2 = parseFloat(point2.lng);

    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Estimate delivery fee
  private estimateFee(serviceType: string, distance: number): number {
    const baseRates: Record<string, number> = {
      MOTORCYCLE: 50,
    };

    const perKmRate: Record<string, number> = {
      MOTORCYCLE: 10,
    };

    const base = baseRates[serviceType] || 50;
    const perKm = perKmRate[serviceType] || 10;

    return base + distance * perKm;
  }

  // Get order status
  async getOrderStatus(orderId: string): Promise<LalamoveOrder | null> {
    try {
      console.log('Getting order status for:', orderId);
      
      // Mock response
      return {
        orderId,
        status: 'IN_PROGRESS',
        driverInfo: {
          name: 'Juan Dela Cruz',
          phone: '+639171234567',
          plateNumber: 'ABC 1234',
        },
        trackingUrl: `https://www.lalamove.com/track/${orderId}`,
      };
    } catch (error) {
      console.error('Error getting order status:', error);
      return null;
    }
  }
}

export const lalamoveService = new LalamoveService();

