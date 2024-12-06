import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;

const rapidApiClient = axios.create({
  baseURL: 'https://rapidapi.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  },
});

export async function getTrendingTopics() {
  try {
    const response = await rapidApiClient.get('/twitter-trends');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    throw error;
  }
}

export async function getProductReviews() {
  try {
    const response = await rapidApiClient.get('/product-reviews');
    return response.data;
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    throw error;
  }
}