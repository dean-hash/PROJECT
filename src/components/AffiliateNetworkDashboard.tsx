import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const AffiliateNetworkDashboard: React.FC = () => {
  const { networks, status, error } = useSelector((state: RootState) => state.affiliateNetworks);

  const sortedNetworks = useMemo(() => 
    [...networks].sort((a, b) => a.name.localeCompare(b.name)),
    [networks]
  );

  const renderNetworkRow = useCallback((network: any) => (
    <tr key={network.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{network.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          network.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {network.status}
        </span>
      </td>
    </tr>
  ), []);

  // ... rest of the component ...

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {/* ... */}
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... */}
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedNetworks.map(renderNetworkRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(AffiliateNetworkDashboard);