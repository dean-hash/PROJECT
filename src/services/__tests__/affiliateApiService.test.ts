import { affiliateApiService } from '../affiliateApiService';
import axios from 'axios';

jest.mock('axios');

describe('AffiliateApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchProducts', () => {
    it('should successfully search for products', async () => {
      const mockProducts = [{ id: '1', name: 'Test Product' }];
      (axios.get as jest.Mock).mockResolvedValue({ data: mockProducts });

      const result = await affiliateApiService.searchProducts('test');

      expect(result).toEqual(mockProducts);
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/products`, { params: { query: 'test' } });
    });

    it('should handle errors when searching for products', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

      await expect(affiliateApiService.searchProducts('test')).rejects.toThrow('Failed to search for affiliate products');
    });
  });

  describe('searchPrograms', () => {
    it('should successfully search for programs', async () => {
      const mockPrograms = [{ id: '1', name: 'Test Program' }];
      (axios.get as jest.Mock).mockResolvedValue({ data: mockPrograms });

      const result = await affiliateApiService.searchPrograms('test');

      expect(result).toEqual(mockPrograms);
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/programs`, { params: { query: 'test' } });
    });

    it('should handle errors when searching for programs', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

      await expect(affiliateApiService.searchPrograms('test')).rejects.toThrow('Failed to search for affiliate programs');
    });
  });

  describe('applyToProgram', () => {
    it('should successfully apply to a program', async () => {
      const mockResponse = { success: true, message: 'Application submitted' };
      (axios.post as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await affiliateApiService.applyToProgram('1', { name: 'Test User' });

      expect(result).toEqual(mockResponse);
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/programs/1/apply`, { name: 'Test User' });
    });

    it('should handle errors when applying to a program', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('API error'));

      await expect(affiliateApiService.applyToProgram('1', { name: 'Test User' })).rejects.toThrow('Failed to apply to the program');
    });
  });
});