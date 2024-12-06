import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';

interface Income {
  date: Date;
  amount: number;
  source: string;
  programName: string;
}

class IncomeTrackingService {
  async addIncome(income: Income) {
    try {
      const response = await axios.post(`${API_BASE_URL}/income`, income);
      return response.data;
    } catch (error) {
      console.error('Error adding income:', error);
      throw error;
    }
  }

  async getMonthlyReport(month: number, year: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/income/monthly-report`, {
        params: { month, year }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly report:', error);
      throw error;
    }
  }

  async getAnnualReport(year: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/income/annual-report`, {
        params: { year }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching annual report:', error);
      throw error;
    }
  }

  async getTotalIncome(year: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/income/total`, {
        params: { year }
      });
      return response.data.totalIncome;
    } catch (error) {
      console.error('Error fetching total income:', error);
      throw error;
    }
  }

  async generate1099(year: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/income/generate-1099`, {
        params: { year }
      });
      return response.data;
    } catch (error) {
      console.error('Error generating 1099:', error);
      throw error;
    }
  }
}

export const incomeTrackingService = new IncomeTrackingService();