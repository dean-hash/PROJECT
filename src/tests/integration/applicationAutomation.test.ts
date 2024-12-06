import { automateApplication } from '../../services/applicationAutomation';
import { affiliateNetworkService } from '../../services/affiliateNetworkService';
import { UnifiedIntelligenceField } from '../../utils/unifiedIntelligenceField';

jest.mock('../../services/affiliateNetworkService');
jest.mock('../../utils/unifiedIntelligenceField');

describe('Application Automation Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should automate the application process end-to-end', async () => {
    const mockDemandData = {
      highDemandProducts: ['eco-friendly', 'tech gadgets']
    };

    const mockPrograms = [
      { id: '1', name: 'EcoStore', category: 'Sustainable Living' },
      { id: '2', name: 'TechGadgets', category: 'Technology' }
    ];

    (affiliateNetworkService.searchPrograms as jest.Mock).mockResolvedValue(mockPrograms);
    (UnifiedIntelligenceField.getInstance().matchDemandWithPrograms as jest.Mock).mockResolvedValue(mockPrograms);
    (affiliateNetworkService.applyToProgram as jest.Mock).mockResolvedValue({ success: true, message: 'Applied successfully' });

    const result = await automateApplication(mockDemandData);

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('EcoStore');
    expect(result[1].name).toBe('TechGadgets');

    expect(affiliateNetworkService.searchPrograms).toHaveBeenCalledWith('eco-friendly tech gadgets');
    expect(UnifiedIntelligenceField.getInstance().matchDemandWithPrograms).toHaveBeenCalledWith(mockDemandData, mockPrograms);
    expect(affiliateNetworkService.applyToProgram).toHaveBeenCalledTimes(2);

    // Verify the entire process flow
    expect(affiliateNetworkService.searchPrograms).toHaveBeenCalledBefore(UnifiedIntelligenceField.getInstance().matchDemandWithPrograms);
    expect(UnifiedIntelligenceField.getInstance().matchDemandWithPrograms).toHaveBeenCalledBefore(affiliateNetworkService.applyToProgram);
  });

  it('should handle errors during the automation process', async () => {
    const mockDemandData = {
      highDemandProducts: ['invalid product']
    };

    (affiliateNetworkService.searchPrograms as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(automateApplication(mockDemandData)).rejects.toThrow('Error in automation process');

    expect(affiliateNetworkService.searchPrograms).toHaveBeenCalledWith('invalid product');
    expect(UnifiedIntelligenceField.getInstance().matchDemandWithPrograms).not.toHaveBeenCalled();
    expect(affiliateNetworkService.applyToProgram).not.toHaveBeenCalled();
  });
});