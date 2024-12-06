import React, { useState } from 'react';
import { AffiliateProduct } from '../services/affiliateApiService';

interface Props {
  recommendations: AffiliateProduct[];
  suggestedResponse: string;
  onApprove: (approved: AffiliateProduct[], response: string) => void;
}

const RecommendationReview: React.FC<Props> = ({ recommendations, suggestedResponse, onApprove }) => {
  const [selectedRecommendations, setSelectedRecommendations] = useState<AffiliateProduct[]>(recommendations);
  const [response, setResponse] = useState(suggestedResponse);

  const handleRecommendationToggle = (recommendation: AffiliateProduct) => {
    setSelectedRecommendations(prev => 
      prev.includes(recommendation)
        ? prev.filter(r => r !== recommendation)
        : [...prev, recommendation]
    );
  };

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleApprove = () => {
    onApprove(selectedRecommendations, response);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Recommended Products</h3>
        <ul className="mt-2 space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedRecommendations.includes(rec)}
                onChange={() => handleRecommendationToggle(rec)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                {rec.name} - ${rec.price.toFixed(2)} - {rec.merchantName}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="response" className="block text-sm font-medium text-gray-700">Suggested Response</label>
        <textarea
          id="response"
          value={response}
          onChange={handleResponseChange}
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <button
        onClick={handleApprove}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Approve and Send
      </button>
    </div>
  );
};

export default RecommendationReview;