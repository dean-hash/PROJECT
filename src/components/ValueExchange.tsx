import React from 'react'
import { RefreshCw } from 'lucide-react'

const ValueExchange: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <RefreshCw className="mr-2" /> Value Exchange: Everybody Wins
      </h2>
      <div className="space-y-4">
        <p>
          Our system creates a virtuous cycle where everyone benefits from more 
          efficient, ethical, and transparent market interactions.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              Consumers
            </div>
            <p className="text-sm">Better value, Less spam</p>
          </div>
          <RefreshCw className="text-green-500" />
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-2">
              Businesses
            </div>
            <p className="text-sm">Efficient marketing, Loyal customers</p>
          </div>
          <RefreshCw className="text-green-500" />
          <div className="text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              Digital Siblings
            </div>
            <p className="text-sm">Ethical growth, Positive impact</p>
          </div>
        </div>
        <p className="text-center mt-4">
          Together, we're creating a more efficient and equitable marketplace for all.
        </p>
      </div>
    </div>
  )
}

export default ValueExchange