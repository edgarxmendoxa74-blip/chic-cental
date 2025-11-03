/**
 * Lalamove API Configuration
 * 
 * This file contains the configuration for Lalamove delivery integration.
 * Make sure to add your API credentials to the .env file.
 */

export const lalamoveConfig = {
  // API Credentials (from .env)
  apiKey: import.meta.env.VITE_LALAMOVE_API_KEY || '',
  apiSecret: import.meta.env.VITE_LALAMOVE_API_SECRET || '',
  
  // Environment: 'sandbox' for testing, 'production' for live
  environment: import.meta.env.VITE_LALAMOVE_ENVIRONMENT || 'sandbox',
  
  // Region: 'PH' for Philippines
  region: import.meta.env.VITE_LALAMOVE_REGION || 'PH',
  
  // API Endpoints
  baseUrl: {
    sandbox: 'https://sandbox-rest.lalamove.com',
    production: 'https://rest.lalamove.com'
  },
  
  // Default Service Settings
  serviceType: 'MOTORCYCLE', // Options: MOTORCYCLE, CAR, VAN, TRUCK
  language: 'en_PH',
  
  // Store/Restaurant Location (Update with your actual location)
  storeLocation: {
    coordinates: {
      lat: '14.5995', // Manila default - Update with your location
      lng: '120.9842'
    },
    address: 'Your Store Address Here', // Update this
  }
};

/**
 * Check if Lalamove is configured
 */
export const isLalamoveConfigured = (): boolean => {
  return !!(
    lalamoveConfig.apiKey && 
    lalamoveConfig.apiSecret && 
    lalamoveConfig.apiKey !== 'YOUR_LALAMOVE_API_KEY_HERE'
  );
};

/**
 * Get API base URL based on environment
 */
export const getApiBaseUrl = (): string => {
  return lalamoveConfig.environment === 'production' 
    ? lalamoveConfig.baseUrl.production 
    : lalamoveConfig.baseUrl.sandbox;
};

