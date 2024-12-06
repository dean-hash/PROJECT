import axios, { AxiosError } from 'axios';
import { logger } from '../utils/logger';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';

// ... existing interfaces ...

class AffiliateApiService {
  private handleError(error: unknown, context: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        logger.error(new Error(`${context}: ${axiosError.response.status} - ${axiosError.response.data}`));
        throw new Error(`${context}: ${axiosError.response.status} - ${axiosError.response.data}`);
      } else if (axiosError.request) {
        logger.error(new Error(`${context}: No response received`));
        throw new Error(`${context}: No response received`);
      }
    }
    logger.error(new Error(`${context}: ${(error as Error).message}`));
    throw new Error(`${context}: ${(error as Error).message}`);
  }

  async searchProducts(query: string): Promise<AffiliateProduct[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, { params: { query } });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error searching for affiliate products');
    }
  }

  // ... update other methods similarly ...
}

export const affiliateApiService = new AffiliateApiService();