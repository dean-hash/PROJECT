import axios from 'axios';

class AIService {
  private apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  async analyzeData(data: any) {
    try {
      const response = await axios.post('https://api.ai-service.com/analyze', data, {
        headers: { Authorization: `Bearer ${this.apiToken}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing data:', error);
      throw error;
    }
  }

  async generateRecommendations(context: any) {
    try {
      const response = await axios.post('https://api.ai-service.com/recommend', context, {
        headers: { Authorization: `Bearer ${this.apiToken}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  }
}

export const createAIService = (apiToken: string) => new AIService(apiToken);