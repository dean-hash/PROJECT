import React, { useState, useEffect } from 'react';
import { supporterAccountManager } from '../services/supporterAccountManager';
import { dynamicPricingEngine } from '../services/dynamicPricingEngine';
import { daoRewardSystem } from '../services/daoRewardSystem';

const FinancialDashboard: React.FC = () => {
  const [supporterData, setSupporterData] = useState<any[]>([]);
  const [pricingScenario, setPricingScenario] = useState<any>(null);
  const [daoRewards, setDaoRewards] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSupporterData(supporterAccountManager.getSupporters());
        
        const scenario = await dynamicPricingEngine.simulatePricingScenario(
          { wholesale: 5, retail: 10 },
          [{ purchasingPower: 'high' }, { purchasingPower: 'low' }]
        );
        setPricingScenario(scenario);

        const rewards = await daoRewardSystem.calculateRewards();
        setDaoRewards(rewards);
      } catch (error) {
        console.error('Error fetching financial data:', error);
        setError('Failed to fetch some financial data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Financial Dashboard</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Supporter Accounts</h3>
        <ul>
          {supporterData.map((supporter, index) => (
            <li key={index}>
              {supporter.name}: ${supporter.amountOwed} (Priority: {supporter.repaymentPriority})
            </li>
          ))}
        </ul>
      </div>

      {pricingScenario && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Dynamic Pricing Scenario</h3>
          <p>
            High purchasing power price: ${pricingScenario.highPrice.toFixed(2)}<br />
            Low purchasing power price: ${pricingScenario.lowPrice.toFixed(2)}
          </p>
        </div>
      )}

      {daoRewards && (
        <div>
          <h3 className="text-xl font-semibold mb-2">DAO Rewards</h3>
          <ul>
            {Object.entries(daoRewards).map(([participant, reward]: [string, any]) => (
              <li key={participant}>
                {participant}: {reward.score} points
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FinancialDashboard;