import React from 'react';
import { DollarSign, TrendingUp, Users, Shield } from 'lucide-react';

const RapidIncomeStrategy: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <DollarSign className="mr-2" /> Rapid Ethical Income Strategy
      </h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <TrendingUp className="mr-2 mt-1 text-green-500" />
          <div>
            <h3 className="font-semibold">Accelerated Affiliate Partnerships</h3>
            <p>Prioritize high-commission, ethical products with immediate payout structures.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Users className="mr-2 mt-1 text-blue-500" />
          <div>
            <h3 className="font-semibold">Supporter Engagement Program</h3>
            <p>Develop a transparent system for supporters to track the impact of their contributions and potential returns.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Shield className="mr-2 mt-1 text-purple-500" />
          <div>
            <h3 className="font-semibold">Ethical Microtransactions</h3>
            <p>Implement a system for users to make small, voluntary contributions for premium features or to support the project.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapidIncomeStrategy;