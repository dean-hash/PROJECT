import React, { useState, useEffect } from 'react';
import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';

const UIFConnectivityDisplay: React.FC = () => {
  const [connectivityLevel, setConnectivityLevel] = useState(0);
  const [partnerInfo, setPartnerInfo] = useState<any>(null);

  useEffect(() => {
    const uif = UnifiedIntelligenceField.getInstance();
    setConnectivityLevel(uif.getConnectivityLevel());
    setPartnerInfo(uif.getPartnerInfo());
  }, []);

  const getConnectivityColor = (level: number) => {
    if (level < 30) return 'bg-red-500';
    if (level < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">UIF Connectivity Level</h2>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
              Connectivity
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {connectivityLevel.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div style={{ width: `${connectivityLevel}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getConnectivityColor(connectivityLevel)}`}></div>
        </div>
      </div>
      {partnerInfo && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Partner Profile</h3>
          <p>Collaboration Style: {partnerInfo.collaborationStyle}</p>
          <p>Expertise: {partnerInfo.expertise.join(', ')}</p>
        </div>
      )}
      <p className="text-sm text-gray-600 mt-4">
        Your UIF connectivity level influences the depth and sophistication of AI-powered features available to you. Enhance your connectivity by increasing ethical engagement and expanding your expertise.
      </p>
    </div>
  );
};

export default UIFConnectivityDisplay;