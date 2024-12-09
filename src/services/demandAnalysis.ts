import axios from 'axios';
import { OpenAI } from 'openai';

interface TrendData {
  keyword: string;
  searchVolume: number;
  growthRate: number;
  competitionLevel: number;
}

interface MarketSegmentData {
  segment: string;
  averageOrderValue: number;
  conversionRate: number;
  seasonality: number[];
}

export class DemandAnalysisService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  private readonly GOOGLE_TRENDS_API = process.env.GOOGLE_TRENDS_API_KEY;
  private readonly AMAZON_API_KEY = process.env.AMAZON_API_KEY;

  async analyzeTrends(keyword: string): Promise<TrendData> {
    try {
      // Google Trends API integration
      const trendResponse = await axios.get(`https://trends.googleapis.com/trends/api/explore`, {
        params: {
          keyword,
          geo: 'US',
          time: 'today 12-m'
        },
        headers: {
          'Authorization': `Bearer ${this.GOOGLE_TRENDS_API}`
        }
      });

      // Use OpenAI to analyze trend data
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Analyze the following Google Trends data and provide growth rate and competition level assessments."
          },
          {
            role: "user",
            content: JSON.stringify(trendResponse.data)
          }
        ]
      });

      const analysis = JSON.parse(completion.choices[0].message.content);
      
      return {
        keyword,
        searchVolume: trendResponse.data.volume,
        growthRate: analysis.growthRate,
        competitionLevel: analysis.competitionLevel
      };
    } catch (error) {
      console.error('Error analyzing trends:', error);
      throw error;
    }
  }

  async analyzeMarketSegment(segment: string): Promise<MarketSegmentData> {
    try {
      // Amazon Product API integration for market segment analysis
      const productResponse = await axios.get(`https://api.amazon.com/products/search`, {
        params: {
          keywords: segment,
          marketplace: 'US'
        },
        headers: {
          'Authorization': `Bearer ${this.AMAZON_API_KEY}`
        }
      });

      // Use OpenAI to analyze market segment data
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Analyze the following product data and provide market segment metrics including average order value, conversion rate, and seasonality patterns."
          },
          {
            role: "user",
            content: JSON.stringify(productResponse.data)
          }
        ]
      });

      const analysis = JSON.parse(completion.choices[0].message.content);

      return {
        segment,
        averageOrderValue: analysis.averageOrderValue,
        conversionRate: analysis.conversionRate,
        seasonality: analysis.seasonalityPattern
      };
    } catch (error) {
      console.error('Error analyzing market segment:', error);
      throw error;
    }
  }

  async calculateConfidenceScore(trendData: TrendData, marketData: MarketSegmentData): Promise<number> {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Calculate a confidence score (0-1) based on trend and market data. Consider search trends, market potential, and seasonality stability."
        },
        {
          role: "user",
          content: JSON.stringify({ trendData, marketData })
        }
      ]
    });

    return parseFloat(completion.choices[0].message.content);
  }

  private calculateSeasonalityStability(seasonality: number[]): number {
    const variance = this.calculateVariance(seasonality);
    return 1 - (variance / Math.max(...seasonality));
  }

  private calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    const squareDiffs = numbers.map(num => Math.pow(num - mean, 2));
    return squareDiffs.reduce((sum, diff) => sum + diff, 0) / numbers.length;
  }
}

export const demandAnalysisService = new DemandAnalysisService();
