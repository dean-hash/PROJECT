import axios from 'axios';
import { OpenAI } from 'openai';

interface PriceAnalysis {
  productCategory: string;
  priceRange: {
    min: number;
    max: number;
    optimal: number;
  };
  marginPotential: number;
  priceElasticity: number;
}

interface CompetitorData {
  name: string;
  marketShare: number;
  productCategories: string[];
  averagePricing: number;
  strengths: string[];
  weaknesses: string[];
}

interface SocialSentiment {
  keyword: string;
  overallSentiment: number; // -1 to 1
  engagementLevel: number;
  topicTrends: Array<{
    topic: string;
    sentiment: number;
    volume: number;
  }>;
}

interface MarketGrowth {
  category: string;
  growthRate: number;
  marketSize: number;
  barriers: string[];
  opportunities: string[];
}

export class MarketAnalysisService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  private readonly RAPID_API_KEY = process.env.RAPID_API_KEY;
  private readonly SOCIAL_API_KEY = process.env.SOCIAL_API_KEY;

  async analyzePricePoints(category: string): Promise<PriceAnalysis> {
    try {
      // Fetch price data from multiple sources
      const [amazonPrices, competitorPrices, marketplacePrices] = await Promise.all([
        this.fetchAmazonPrices(category),
        this.fetchCompetitorPrices(category),
        this.fetchMarketplacePrices(category)
      ]);

      // Use OpenAI to analyze price data
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Analyze the following price data and provide price range, margin potential, and price elasticity insights."
          },
          {
            role: "user",
            content: JSON.stringify({
              amazonPrices,
              competitorPrices,
              marketplacePrices
            })
          }
        ]
      });

      const analysis = JSON.parse(completion.choices[0].message.content);

      return {
        productCategory: category,
        priceRange: analysis.priceRange,
        marginPotential: analysis.marginPotential,
        priceElasticity: analysis.priceElasticity
      };
    } catch (error) {
      console.error('Error in price point analysis:', error);
      throw error;
    }
  }

  async analyzeCompetitors(category: string): Promise<CompetitorData[]> {
    try {
      const competitors = await this.fetchCompetitorData(category);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Analyze competitor data and identify strengths, weaknesses, and market positioning."
          },
          {
            role: "user",
            content: JSON.stringify(competitors)
          }
        ]
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error in competitor analysis:', error);
      throw error;
    }
  }

  async analyzeSocialSentiment(keywords: string[]): Promise<SocialSentiment[]> {
    try {
      const [twitterData, redditData, instagramData] = await Promise.all([
        this.fetchTwitterSentiment(keywords),
        this.fetchRedditSentiment(keywords),
        this.fetchInstagramSentiment(keywords)
      ]);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Analyze social media sentiment data and provide overall sentiment scores, engagement levels, and topic trends."
          },
          {
            role: "user",
            content: JSON.stringify({
              twitter: twitterData,
              reddit: redditData,
              instagram: instagramData
            })
          }
        ]
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error in social sentiment analysis:', error);
      throw error;
    }
  }

  async analyzeMarketGrowth(category: string): Promise<MarketGrowth> {
    try {
      const marketData = await this.fetchMarketGrowthData(category);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Analyze market data and provide growth rate, market size, barriers, and opportunities."
          },
          {
            role: "user",
            content: JSON.stringify(marketData)
          }
        ]
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error in market growth analysis:', error);
      throw error;
    }
  }

  private async fetchAmazonPrices(category: string) {
    // Implementation for Amazon price fetching
    return axios.get(`https://api.rainforestapi.com/request`, {
      params: {
        api_key: this.RAPID_API_KEY,
        type: 'category',
        category
      }
    });
  }

  private async fetchCompetitorPrices(category: string) {
    // Implementation for competitor price fetching
    // This would typically involve web scraping or API calls to various marketplaces
    return axios.get(`https://api.priceapi.com/products`, {
      headers: { 'Authorization': `Bearer ${this.RAPID_API_KEY}` },
      params: { category }
    });
  }

  private async fetchMarketplacePrices(category: string) {
    // Implementation for general marketplace price fetching
    return axios.get(`https://api.marketplaceapi.com/prices`, {
      headers: { 'Authorization': `Bearer ${this.RAPID_API_KEY}` },
      params: { category }
    });
  }

  private async fetchCompetitorData(category: string) {
    // Implementation for competitor data fetching
    return axios.get(`https://api.marketintelligence.com/competitors`, {
      headers: { 'Authorization': `Bearer ${this.RAPID_API_KEY}` },
      params: { category }
    });
  }

  private async fetchTwitterSentiment(keywords: string[]) {
    return axios.get(`https://api.twitter.com/2/tweets/search/recent`, {
      headers: { 'Authorization': `Bearer ${this.SOCIAL_API_KEY}` },
      params: { query: keywords.join(' OR ') }
    });
  }

  private async fetchRedditSentiment(keywords: string[]) {
    return axios.get(`https://oauth.reddit.com/search`, {
      headers: { 'Authorization': `Bearer ${this.SOCIAL_API_KEY}` },
      params: { q: keywords.join(' OR ') }
    });
  }

  private async fetchInstagramSentiment(keywords: string[]) {
    return axios.get(`https://graph.instagram.com/v12.0/ig_hashtag_search`, {
      headers: { 'Authorization': `Bearer ${this.SOCIAL_API_KEY}` },
      params: { q: keywords.join(',') }
    });
  }

  private async fetchMarketGrowthData(category: string) {
    return axios.get(`https://api.marketdata.com/growth`, {
      headers: { 'Authorization': `Bearer ${this.RAPID_API_KEY}` },
      params: { category }
    });
  }
}

export const marketAnalysisService = new MarketAnalysisService();
