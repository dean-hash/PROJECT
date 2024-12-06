import { automateApplication } from '../applicationAutomation';
import { affiliateApiService } from '../affiliateApiService';
import { UnifiedIntelligenceField } from '../../utils/unifiedIntelligenceField';

jest.mock('../affiliateApiService');
jest.mock('../../utils/unifiedIntelligenceField');

describe('automateApplication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process demand data and apply to matched programs', async () => {
    const mockDemandData = {
      highDemandProducts: ['eco-friendly', 'tech gadgets']
    };

    const mockPrograms = [
      { id: '1', name: 'EcoStore', category: 'Sustainable Living' },
      { id: '2', name: 'TechGadgets', category: 'Technology' }
    ];

    (affiliateApiService.searchPrograms as jest.Mock).mockResolvedValue(mockPrograms);
    (UnifiedIntelligenceField.getInstance().matchDemandWithPrograms as jest.Mock).mockResolvedValue(mockPrograms);
    (affiliateApiService.applyToProgram as jest.Mock).mockResolvedValue({ success: true, message: 'Applied successfully' });

    const result = await automateApplication(mockDemandData);

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('EcoStore');
    expect(result[1].name).toBe('TechGadgets');
    expect(affiliateApiService.searchPrograms).toHaveBeenCalledWith('eco-friendly tech gadgets');
    expect(UnifiedIntelligenceField.getInstance().matchDemandWithPrograms).toHaveBeenCalledWith(mockDemandData, mockPrograms);
    expect(affiliateApiService.applyToProgram).toHaveBeenCalledTimes(2);
  });

  it('should handle errors and return an empty array', async () => {
    const mockDemandData = {
      highDemandProducts: ['invalid product']
    };

    (affiliateApiService.searchPrograms as jest.Mock).mockRejectedValue(new Error('API error'));

    const result = await automateApplication(mockDemandData);

    expect(result).toEqual([]);
    expect(affiliateApiService.searchPrograms).toHaveBeenCalledWith('invalid product');
  });
});