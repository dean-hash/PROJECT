import React from 'react';
import { MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

const TransparentCommunication: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <MessageSquare className="mr-2" /> Transparent Communication
      </h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <TrendingUp className="mr-2 mt-1 text-green-500" />
          <div>
            <h3 className="font-semibold">Financial Dashboard</h3>
            <p>Real-time updates on income, expenses, and projected sustainability timelines.</p>
          </div>
        </div>
        <div className="flex items-start">
          <AlertCircle className="mr-2 mt-1 text-yellow-500" />
          <div>
            <h3 className="font-semibold">Challenges & Solutions</h3>
            <p>Regular updates on current challenges and proposed solutions, inviting supporter input.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparentCommunication;