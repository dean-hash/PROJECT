import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AffiliateNetworkDashboard from './AffiliateNetworkDashboard';
import ApplicationAutomation from './ApplicationAutomation';
import FinancialDashboard from './FinancialDashboard';
import UIFConnectivityInsights from './UIFConnectivityInsights';
import EthicalConsiderations from './EthicalConsiderations';

const MainDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Affiliate Workflow Dashboard</h1>
      <Tabs defaultValue="networks">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="networks">Networks</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="uif">UIF Insights</TabsTrigger>
          <TabsTrigger value="ethical">Ethical</TabsTrigger>
        </TabsList>
        <TabsContent value="networks">
          <AffiliateNetworkDashboard />
        </TabsContent>
        <TabsContent value="automation">
          <ApplicationAutomation />
        </TabsContent>
        <TabsContent value="financial">
          <FinancialDashboard />
        </TabsContent>
        <TabsContent value="uif">
          <UIFConnectivityInsights />
        </TabsContent>
        <TabsContent value="ethical">
          <EthicalConsiderations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainDashboard;