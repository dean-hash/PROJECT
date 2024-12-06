import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';
import * as apiService from './apiService';

interface TrendingTopic {
  name: string;
  tweet_volume: number;
}

interface GoogleReview {
  text: string;
  rating: number;
}

export async function identifyDemand() {
  try {
    const uif = UnifiedIntelligenceField.getInstance();

    let twitterTrends: TrendingTopic[];
    let googleReviews: GoogleReview[];

    try {
      // Try using UIF first
      twitterTrends = await uif.getTrendingTopics();
      googleReviews = await uif.getProductReviews();
    } catch (uifError) {
      console.warn('UIF method failed, falling back to API:', uifError);
      // Fallback to RapidAPI
      twitterTrends = await apiService.getTrendingTopics();
      googleReviews = await apiService.getProductReviews();
    }

    const analyzedData = await analyzeData(twitterTrends, googleReviews);

    return analyzedData;
  } catch (error) {
    console.error('Error in demand identification:', error);
    throw error;
  }
}

async function analyzeData(twitterTrends: TrendingTopic[], googleReviews: GoogleReview[]) {
  const uif = UnifiedIntelligenceField.getInstance();

  try {
    // Try using UIF for analysis
    const analysis = await uif.analyzeMarketTrends({
      trendingTopics: twitterTrends,
      productReviews: googleReviews
    });

    return {
      trendingTopics: analysis.topTrends,
      highDemandKeywords: analysis.keywordInsights,
      averageRating: analysis.averageProductRating
    };
  } catch (uifError) {
    console.warn('UIF analysis failed, falling back to local analysis:', uifError);
    // Fallback to local analysis
    const trendingKeywords = twitterTrends.map(trend => trend.name.toLowerCase());
    const reviewKeywords = googleReviews.flatMap(review => review.text.toLowerCase().split(' '));

    const allKeywords = [...trendingKeywords, ...reviewKeywords];
    const keywordCounts = allKeywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});

    const sortedKeywords = Object.entries(keywordCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([keyword]) => keyword);

    return {
      trendingTopics: twitterTrends.slice(0, 5),
      highDemandKeywords: sortedKeywords,
      averageRating: googleReviews.reduce((sum, review) => sum + review.rating, 0) / googleReviews.length
    };
  }
}

export async function generateDemandReport(demandData: any) {
  const report = `
    Demand Report:
    Top Trending Topics: ${demandData.trendingTopics.map(topic => topic.name).join(', ')}
    High Demand Keywords: ${demandData.highDemandKeywords.join(', ')}
    Average Product Rating: ${demandData.averageRating.toFixed(2)}
  `;

  return report;
}