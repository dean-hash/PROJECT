import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';
import { logger } from '../utils/logger';
import memoize from 'lodash/memoize';

// ... existing code ...

class AffiliateNetworkService {
  private uif: UnifiedIntelligenceField;

  constructor() {
    this.uif = UnifiedIntelligenceField.getInstance();
  }

  // Memoize the getNetworkCredentials method to cache results
  getNetworkCredentials = memoize(async (networkName: string): Promise<NetworkCredentials | null> => {
    const encryptedCredentials = await this.uif.retrieveEncryptedData(networkName);
    if (!encryptedCredentials) {
      logger.log(`No credentials found for ${networkName}`);
      return null;
    }
    const key = await this.uif.generateSecureKey(networkName);
    return this.uif.decryptSensitiveData(encryptedCredentials, key);
  });

  // ... other methods ...

  // Clear memoized cache when necessary
  clearCredentialsCache() {
    this.getNetworkCredentials.cache.clear();
  }
}

export const affiliateNetworkService = new AffiliateNetworkService();