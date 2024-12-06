import React, { useState, useEffect } from 'react';
import { affiliateNetworkService } from '../services/affiliateNetworkService';

interface Props {
  networks: string[];
}

interface NetworkPerformance {
  conversionRate: number;
  averageOrderValue: number;
  totalRevenue: number;
}

const NetworkDashboard: React.FC<Props> = ({ networks }) => {
  const [performanceData, setPerformanceData] = useState<Record<string, NetworkPerformance>>({});
  const [optimizationStrategies, setOptimizationStrategies] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const performancePromises = networks.map(async (network) => {
          try {
            const performance = await affiliateNetworkService.analyzeNetworkPerformance(network);
            return [network, performance];
          } catch (error) {
            console.error(`Error fetching performance for ${network}:`, error);
            return [network, null];
          }
        });

        const results = await Promise.all(performancePromises);
        const newPerformanceData: Record<string, NetworkPerformance> = {};
        results.forEach(([network, performance]) => {
          if (performance) {
            newPerformanceData[network as string] = performance as NetworkPerformance;
          }
        });
        setPerformanceData(newPerformanceData);
      } catch (error) {
        setError('Failed to fetch network performance data');
        console.error('Error fetching performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [networks]);

  const handleOptimize = async (network: string) => {
    try {
      const strategy = await affiliateNetworkService.optimizeNetworkStrategy(network);
      setOptimizationStrategies(prev => ({
        ...prev,
        [network]: strategy.recommendedActions
      }));
    } catch (error) {
      console.error(`Error optimizing strategy for ${network}:`, error);
    }
  };

  if (loading) {
    return <div>Loading network performance data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="network-dashboard">
      <h2>Network Performance Dashboard</h2>
      {networks.length === 0 ? (
        <p>No networks connected yet. Sign up for a network to see performance data.</p>
      ) : (
        networks.map(network => (
          <div key={network} className="network-card">
            <h3>{network}</h3>
            {performanceData[network] ? (
              <>
                <p>Conversion Rate: {(performanceData[network].conversionRate * 100).toFixed(2)}%</p>
                <p>Average Order Value: ${performanceData[network].averageOrderValue.toFixed(2)}</p>
                <p>Total Revenue: ${performanceData[network].totalRevenue.toFixed(2)}</p>
                <button onClick={() => handleOptimize(network)}>Optimize Strategy</button>
                {optimizationStrategies[network] && (
                  <div>
                    <h4>Recommended Actions:</h4>
                    <ul>
                      {optimizationStrategies[network].map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p>No performance data available for this network.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NetworkDashboard;