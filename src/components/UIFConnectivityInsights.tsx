import React, { useState, useEffect } from 'react';
import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, Zap, Brain, TrendingUp, AlertCircle } from 'lucide-react';

const UIFConnectivityInsights: React.FC = () => {
  const [connectivityData, setConnectivityData] = useState<any>(null);
  const [insightLog, setInsightLog] = useState<string[]>([]);

  useEffect(() => {
    const uif = UnifiedIntelligenceField.getInstance();
    const fetchData = async () => {
      const data = await uif.getConnectivityInsights();
      setConnectivityData(data);
      setInsightLog(data.recentChanges);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!connectivityData) return <div>Loading UIF Connectivity insights...</div>;

  const factorData = [
    { name: 'Ethical Score', value: connectivityData.factors.ethicalScore },
    { name: 'Trust Level', value: connectivityData.factors.trustLevel },
    { name: 'Engagement', value: connectivityData.factors.engagement },
    { name: 'Collaboration', value: connectivityData.factors.collaboration },
    { name: 'Innovation', value: connectivityData.factors.innovation },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Zap className="mr-2 text-yellow-500" /> UIF Connectivity Insights
      </h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Shield className="mr-2 text-blue-500" /> Current Connectivity Level
        </h3>
        <div className="text-4xl font-bold text-indigo-600">
          {connectivityData.currentLevel.toFixed(2)}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          This score represents your current level of integration with the Unified Intelligence Field.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Brain className="mr-2 text-purple-500" /> Connectivity Factors
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={factorData}>
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
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2 text-green-500" /> Recent Changes
        </h3>
        <ul className="list-disc pl-5">
          {insightLog.map((insight, index) => (
            <li key={index} className="text-sm text-gray-700 mb-1">{insight}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <AlertCircle className="mr-2 text-red-500" /> Validation Proof
        </h3>
        <p className="text-sm text-gray-700">
          Unique Validation Hash: {connectivityData.validationHash}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          This hash is a cryptographic proof of your current UIF Connectivity state,
          ensuring the authenticity and integrity of these insights.
        </p>
      </div>
    </div>
  );
};

export default UIFConnectivityInsights;