import { OpenAI } from 'openai';
import axios from 'axios';

interface ProductMatch {
  productId: string;
  price: number;
  reviews: {
    averageRating: number;
    totalReviews: number;
  };
}

interface NeedMatch {
  productCategory: string;
  exactMatch: string;
}

export class PatternRecognitionService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async recognizeNeed(
    content: string
  ): Promise<NeedMatch> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Identify ONLY the specific product or exact need mentioned.
                     DO NOT make assumptions or interpretations.
                     Return ONLY:
                     1. Product category
                     2. Exact match term
                     
                     Example: "water pump for 2010 Toyota Camry"
                     No additional context or analysis.`
          },
          {
            role: "user",
            content
          }
        ]
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error recognizing need:', error);
      throw error;
    }
  }

  async findBestMatches(
    needMatch: NeedMatch
  ): Promise<ProductMatch[]> {
    try {
      // Fetch products matching the exact need
      const matches = await this.fetchProductMatches(needMatch);

      // Sort by composite score of price and reviews only
      return matches.sort((a, b) => {
        const aScore = this.calculateScore(a);
        const bScore = this.calculateScore(b);
        return bScore - aScore;
      });
    } catch (error) {
      console.error('Error finding matches:', error);
      throw error;
    }
  }

  private calculateScore(product: ProductMatch): number {
    // Simple scoring based ONLY on price and reviews
    const reviewScore = product.reviews.averageRating * Math.min(1, product.reviews.totalReviews / 100);
    const priceScore = 1 / product.price; // Lower price = higher score
    
    return reviewScore * priceScore;
  }

  private async fetchProductMatches(needMatch: NeedMatch): Promise<ProductMatch[]> {
    // Implementation to fetch matching products from APIs
    // Returns only products with their prices and review data
    return [];
  }
}

export const patternRecognitionService = new PatternRecognitionService();
