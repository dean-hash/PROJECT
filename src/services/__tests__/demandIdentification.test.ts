// ... (previous tests remain the same)

describe('Accuracy Tests', () => {
  it('should return accurate trending topics', async () => {
    const mockUIF = UnifiedIntelligenceField.getInstance as jest.Mock;
    mockUIF.mockReturnValue({
      getTrendingTopics: jest.fn().mockResolvedValue([
        { name: 'COVID-19', tweet_volume: 500000 },
        { name: 'Climate Change', tweet_volume: 300000 },
        { name: 'Cryptocurrency', tweet_volume: 200000 }
      ])
    });

    const result = await identifyDemand();
    expect(result.trendingTopics).toContainEqual(expect.objectContaining({ name: 'COVID-19' }));
    expect(result.trendingTopics).toContainEqual(expect.objectContaining({ name: 'Climate Change' }));
    expect(result.trendingTopics).toContainEqual(expect.objectContaining({ name: 'Cryptocurrency' }));
  });
});

describe('Fallback Tests', () => {
  it('should fallback to RapidAPI for trending topics when UIF fails', async () => {
    const mockUIF = UnifiedIntelligenceField.getInstance as jest.Mock;
    mockUIF.mockReturnValue({
      getTrendingTopics: jest.fn().mockRejectedValue(new Error('UIF error')),
      getProductReviews: jest.fn().mockResolvedValue([{ text: 'UIF Review', rating: 5 }]),
      analyzeMarketTrends: jest.fn().mockResolvedValue({
        topTrends: [],
        keywordInsights: [],
        averageProductRating: 0
      })
    });

    (apiService.getTrendingTopics as jest.Mock).mockResolvedValue([
      { name: 'Fallback Topic', tweet_volume: 100000 }
    ]);

    const result = await identifyDemand();
    expect(result.trendingTopics).toContainEqual(expect.objectContaining({ name: 'Fallback Topic' }));
    expect(apiService.getTrendingTopics).toHaveBeenCalled();
  });
});