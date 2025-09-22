import { environment } from '../../environments/environment';

// Centralized API configuration
export const API_CONFIG = {
  BASE_URL: environment.apiUrl,
  ENDPOINTS: {
    HOLDINGS: '/holdings',
    PRICING: '/pricing',
    DETAILS: '/details',
  },
};
