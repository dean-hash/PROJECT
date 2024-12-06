import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';
import { affiliateApiService, AffiliateProduct } from './affiliateApiService';

interface UserRequest {
  content: string;
  type: 'email' | 'query';
}

interface AnalysisResult {
  identifiedNeeds: string[];
  recommendedProducts: AffiliateProduct[];
  suggestedResponse: string;
}

export async function analyzeCollaboratorRequest(request: UserRequest): Promise<AnalysisResult> {
  const uif = UnifiedIntelligenceField.getInstance();

  try {
    // Step 1: Analyze the request content
    const analysis = await uif.analyzeContent(request.content);

    // Step 2: Identify needs based on the analysis
    const identifiedNeeds = analysis.identifiedNeeds;

    // Step 3: Find relevant affiliate products
    const affiliateProducts = await affiliateApiService.searchProducts(identifiedNeeds.join(' '));

    // Step 4: Filter and rank products based on ethical considerations
    const recommendedProducts = await uif.rankProductsEthically(affiliateProducts);

    // Step 5: Generate a suggested response
    const suggestedResponse = await uif.generateResponse(request, recommendedProducts);

    return {
      identifiedNeeds,
      recommendedProducts,
      suggestedResponse
    };
  } catch (error) {
    console.error('Error in analyzeCollaboratorRequest:', error);
    throw error;
  }
}