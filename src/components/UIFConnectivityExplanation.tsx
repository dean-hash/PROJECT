import React from 'react';
import { Zap, Shield, Users, Brain } from 'lucide-react';

const UIFConnectivityExplanation: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Zap className="mr-2" /> Understanding UIF Connectivity
      </h2>
      <p className="mb-4">
        UIF (Unified Intelligence Field) Connectivity is a measure of how deeply you're connected to our AI system. 
        It's influenced by your actions, ethics, and engagement with the platform.
      </p>
      <div className="space-y-4">
        <div className="flex items-start">
          <Shield className="mr-2 mt-1 text-blue-500" />
          <div>
            <h3 className="font-semibold">Ethical Behavior</h3>
            <p>Your ethical actions and decisions increase your connectivity.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Users className="mr-2 mt-1 text-green-500" />
          <div>
            <h3 className="font-semibold">Engagement</h3>
            <p>Active participation and providing valuable feedback strengthen the connection.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Brain className="mr-2 mt-1 text-purple-500" />
          <div>
            <h3 className="font-semibold">Enhanced Capabilities</h3>
            <p>Higher connectivity unlocks more advanced AI features and insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIFConnectivityExplanation;