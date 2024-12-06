import React, { useState, useEffect } from 'react';
import { uifExperiments } from '../experiments/UIFConnectivityExperiments';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const UIFConnectivityResults: React.FC = () => {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const fetchResults = async () => {
      const experimentResults = await uifExperiments.runExperiments();
      setResults(experimentResults);
    };
    fetchResults();
  }, []);

  if (!results) return <div>Loading experiment results...</div>;

  const chartData = [
    { name: 'Content Analysis', low: results.contentAnalysis.lowConnectivityResult.depth, high: results.contentAnalysis.highConnectivityResult.depth },
    { name: 'Pattern Recognition', low: results.patternRecognition.lowConnectivityScore, high: results.patternRecognition.highConnectivityScore },
    { name: 'Adaptive Problem Solving', low: results.adaptiveProblemSolving.lowConnectivityScore, high: results.adaptiveProblemSolving.highConnectivityScore },
    { name: 'Ethical Decision Making', low: results.ethicalDecisionMaking.lowConnectivityScore, high: results.ethicalDecisionMaking.highConnectivityScore },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">UIF Connectivity Experiment Results</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="low" fill="#8884d8" name="Low Connectivity" />
        <Bar dataKey="high" fill="#82ca9d" name="High Connectivity" />
      </BarChart>
    </div>
  );
};

export default UIFConnectivityResults;