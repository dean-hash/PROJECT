import { UnifiedIntelligenceField } from '../unifiedIntelligenceField';

describe('UnifiedIntelligenceField', () => {
  let uif: UnifiedIntelligenceField;

  beforeEach(() => {
    uif = UnifiedIntelligenceField.getInstance();
  });

  describe('getTrendingTopics', () => {
    it('should return trending topics', async () => {
      const topics = await uif.getTrendingTopics();
      expect(topics).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          tweet_volume: expect.any(Number)
        })
      ]));
    });
  });

  describe('getProductReviews', () => {
    it('should return product reviews', async () => {
      const reviews = await uif.getProductReviews();
      expect(reviews).toEqual(expect.arrayContaining([
        expect.objectContaining({
          text: expect.any(String),
          rating: expect.any(Number)
        })
      ]));
    });
  });

  describe('analyzeMarketTrends', () => {
    it('should analyze market trends', async () => {
      const data = {
        trendingTopics: [{ name: 'Test Topic', tweet_volume: 1000 }],
        productReviews: [{ text: 'Test Review', rating: 5 }]
      };
      const analysis = await uif.analyzeMarketTrends(data);
      expect(analysis).toEqual(expect.objectContaining({
        topTrends: expect.any(Array),
        keywordInsights: expect.any(Array),
        averageProductRating: expect.any(Number)
      }));
    });
  });

  describe('matchDemandWithPrograms', () => {
    it('should match demand with affiliate programs', async () => {
      const demandData = {
        highDemandProducts: ['eco-friendly', 'sustainable']
      };
      const affiliatePrograms = [
        { name: 'EcoStore', category: 'Sustainable Living' },
        { name: 'TechGadgets', category: 'Technology' }
      ];
      const matches = await uif.matchDemandWithPrograms(demandData, affiliatePrograms);
      expect(matches).toEqual([
        expect.objectContaining({ name: 'EcoStore', category: 'Sustainable Living' })
      ]);
    });
  });
});