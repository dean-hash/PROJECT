import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';
import { affiliateApiService, AffiliateProduct } from './affiliateApiService';

interface PartnerInfo {
  name: string;
  email: string;
  website: string;
  // Add other relevant fields
}

export async function automateApplication(demandData: any, partnerInfo: PartnerInfo) {
  console.log('Starting automated application process with demand data:', demandData);
  const uif = UnifiedIntelligenceField.getInstance();

  try {
    const relevantProducts = await affiliateApiService.searchProducts(demandData.highDemandProducts.join(' '));
    console.log(`Found ${relevantProducts.length} relevant products`);

    const matchedProducts = await uif.rankProductsEthically(relevantProducts);
    console.log(`Matched ${matchedProducts.length} products for application`);

    const preparedApplications = matchedProducts.map(product => prepareApplication(product, partnerInfo, demandData));

    console.log(`Application preparation completed. Prepared ${preparedApplications.length} applications`);
    return preparedApplications;
  } catch (error) {
    console.error('Error in automateApplication:', error);
    throw error;
  }
}

function prepareApplication(product: AffiliateProduct, partnerInfo: PartnerInfo, demandData: any) {
  // Prepare application data without sensitive information
  return {
    programName: product.merchantName,
    product: product.name,
    estimatedCommission: product.price * 0.1, // Assuming 10% commission for example
    partnerName: partnerInfo.name,
    partnerWebsite: partnerInfo.website,
    // Add other relevant fields, but exclude sensitive data like banking info
  };
}