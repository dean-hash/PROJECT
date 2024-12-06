import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';

export const connectEmailProvider = async (provider: string, token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/email/connect`, {
      provider,
      token
    });
    return response.data;
  } catch (error) {
    console.error('Error connecting email provider:', error);
    throw error;
  }
};

export const checkEmailForConfirmations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/email/check-confirmations`);
    return response.data;
  } catch (error) {
    console.error('Error checking email for confirmations:', error);
    throw error;
  }
};