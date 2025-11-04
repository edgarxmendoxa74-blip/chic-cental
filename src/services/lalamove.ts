import { getLalamoveConfig } from '../config/lalamove';

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

// Generate signature for Lalamove API (simplified - should be done on backend in production)
const generateSignature = (timestamp: number, method: string, path: string, body: string) => {
  // In production, this should be done on your backend for security
  // This is a placeholder - implement proper HMAC-SHA256 signing
  console.warn('Lalamove signature generation should be done on backend for security');
  return 'PLACEHOLDER_SIGNATURE';
};

export class LalamoveService {
  private config = getLalamoveConfig();

  // Get quotation (price estimate)
  async getQuotation(request: QuotationRequest): Promise<LalamoveQuotation | null> {
    try {
      const endpoint = `${this.config.apiUrl}/v3/quotations`;
      const timestamp = Date.now();
      const body = JSON.stringify(request);

      // In production, call your backend to get the quotation
      // For now, return a mock quotation
      console.log('Getting Lalamove quotation for:', request);
      
      // Mock response for development
      const distance = this.calculateDistance(
        request.stops[0].coordinates,
        request.stops[1].coordinates
      );
      
      const mockQuotation: LalamoveQuotation = {
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

      return mockQuotation;
    } catch (error) {
      console.error('Error getting Lalamove quotation:', error);
      return null;
    }
  }

  // Place order
  async placeOrder(request: OrderRequest): Promise<LalamoveOrder | null> {
    try {
      console.log('Placing Lalamove order:', request);
      
      // In production, this should call your backend which then calls Lalamove API
      // Mock response for development
      const mockOrder: LalamoveOrder = {
        orderId: `LAL${Date.now()}`,
        status: 'ASSIGNING_DRIVER',
        trackingUrl: 'https://www.lalamove.com/track/order',
      };

      return mockOrder;
    } catch (error) {
      console.error('Error placing Lalamove order:', error);
      return null;
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
      SEDAN: 80,
      VAN: 120,
    };

    const perKmRate: Record<string, number> = {
      MOTORCYCLE: 10,
      SEDAN: 15,
      VAN: 20,
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

