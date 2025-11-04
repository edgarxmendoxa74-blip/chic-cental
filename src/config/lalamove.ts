// Lalamove Configuration

// Service types available for delivery
export const LALAMOVE_SERVICE_TYPES = {
  MOTORCYCLE: {
    id: 'MOTORCYCLE',
    name: 'Motorcycle',
    description: 'Fast delivery for small orders',
    icon: '🏍️',
  },
  SEDAN: {
    id: 'SEDAN',
    name: 'Sedan',
    description: 'Comfortable delivery for regular orders',
    icon: '🚗',
  },
  VAN: {
    id: 'VAN',
    name: 'Van',
    description: 'Large capacity for bulk orders',
    icon: '🚐',
  },
};

// Default pickup location (your restaurant)
export const DEFAULT_PICKUP = {
  coordinates: {
    lat: '14.5547',
    lng: '121.0244',
  },
  address: 'Chick Central, Taguig, Manila',
  contact: {
    name: 'Chick Central',
    phone: '+639052931408',
  },
};

// Lalamove API Configuration
export const LALAMOVE_CONFIG = {
  apiKey: import.meta.env.VITE_LALAMOVE_API_KEY,
  apiSecret: import.meta.env.VITE_LALAMOVE_API_SECRET,
  useSandbox: import.meta.env.VITE_LALAMOVE_USE_SANDBOX === 'true',
  region: 'PH_MNL', // Manila, Philippines
};

