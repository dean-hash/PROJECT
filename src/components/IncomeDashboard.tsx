import React, { useState, useEffect } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'

// Mock function to fetch income data
const fetchIncomeData = async () => {
  // In a real scenario, this would be an API call to fetch actual income data
  return {
    totalEarnings: 1250.75,
    monthlyEarnings: 450.25,
    topPrograms: [
      { name: 'EcoStore', earnings: 350.50 },
      { name: 'TechGadgets', earnings: 275.00 },
      { name: 'HealthyLife', earnings: 125.25 },
    ]
  };
};

const IncomeDashboard: React.FC = () => {
  const [incomeData, setIncomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getIncomeData = async () => {
      try {
        const data = await fetchIncomeData();
        setIncomeData(data);
      } catch (err) {
        setError('Failed to fetch income data');
      } finally {
        setLoading(false);
      }
    };

    getIncomeData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <DollarSign className="mr-2" /> Income Dashboard
      </h2>
      {loading && <p>Loading income data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {incomeData && (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-semibold">Total Earnings</h3>
              <p className="text-2xl font-bold">${incomeData.totalEarnings.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-semibold">Monthly Earnings</h3>
              <p className="text-2xl font-bold">${incomeData.monthlyEarnings.toFixed(2)}</p>
            </div>
          </div>
          <h3 className="font-semibold mt-4">Top Performing Programs</h3>
          <ul className="mt-2">
            {incomeData.topPrograms.map((program: any, index: number) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{program.name}</span>
                <span className="font-semibold">${program.earnings.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default IncomeDashboard