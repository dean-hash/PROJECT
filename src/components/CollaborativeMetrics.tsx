import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';

const CollaborativeMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const uif = UnifiedIntelligenceField.getInstance();
      const data = await uif.getCollaborativeMetrics();
      setMetrics(data);
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <div>Loading collaborative metrics...</div>;

  const synergyData = [
    { name: 'Individual Productivity', value: metrics.individualProductivity },
    { name: 'Team Productivity', value: metrics.teamProductivity },
    { name: 'Synergy', value: metrics.synergy },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Collaborative Metrics</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Synergy Score</h3>
        <div className="text-4xl font-bold text-indigo-600">
          {metrics.synergy.toFixed(2)}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Productivity Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={synergyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Emergent Leaps</h3>
        <p>Total Leaps: {metrics.emergentLeaps.total}</p>
        <p>Recent Leap: {metrics.emergentLeaps.recent}</p>
        <p>Impact: {metrics.emergentLeaps.impact}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Error Correction</h3>
        <p>Error Rate: {metrics.errorRate.toFixed(2)}%</p>
        <p>Correction Rate: {metrics.correctionRate.toFixed(2)}%</p>
        <p>Avg. Correction Time: {metrics.avgCorrectionTime} minutes</p>
      </div>
    </div>
  );
};

export default CollaborativeMetrics;