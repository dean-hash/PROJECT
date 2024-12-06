import React, { useState, useEffect } from 'react'
import { ShoppingBag, DollarSign, Clock } from 'lucide-react'
import { affiliateApiService } from '../services/affiliateApiService'

const AffiliatePrograms: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const fetchedPrograms = await affiliateApiService.searchPrograms('high commission quick payout ethical');
        const sortedPrograms = fetchedPrograms.sort((a, b) => 
          (b.commissionRate * b.averageOrderValue) - (a.commissionRate * a.averageOrderValue)
        );
        setPrograms(sortedPrograms.slice(0, 5)); // Top 5 programs
        setLoading(false);
      } catch (error) {
        console.error('Error fetching affiliate programs:', error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ShoppingBag className="mr-2" /> High-Value Affiliate Programs
      </h2>
      {loading ? (
        <p>Loading programs...</p>
      ) : (
        <ul className="space-y-4">
          {programs.map((program, index) => (
            <li key={index} className="border-b pb-2">
              <h3 className="font-semibold">{program.name}</h3>
              <div className="flex items-center mt-1">
                <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                <span>Commission: {program.commissionRate}%</span>
              </div>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                <span>Payout: {program.payoutFrequency}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{program.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AffiliatePrograms