import React, { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { applyToNetwork } from '../services/affiliateNetworkService'
import { checkEmailForConfirmations } from '../services/emailService'
import { incomeTrackingService } from '../services/incomeTrackingService'
import { AlertCircle, Loader } from 'lucide-react'

const ApplicationAutomation: React.FC = () => {
  const { userProfile } = useUser()
  const [status, setStatus] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const automateApplications = async () => {
    if (!userProfile) {
      setError('Please complete your profile first.')
      return
    }

    setIsProcessing(true)
    setError(null)
    setStatus('Applying to networks...')
    const networks = ['ShareASale', 'CJ Affiliate', 'Amazon Associates']
    
    try {
      for (const network of networks) {
        const result = await applyToNetwork(network, userProfile)
        setStatus(prev => prev + `\n${network}: ${result.message}`)
      }

      setStatus(prev => prev + '\nChecking email for confirmations...')
      const confirmations = await checkEmailForConfirmations()
      setStatus(prev => prev + `\nConfirmations found: ${confirmations.confirmations.length}`)

      // Simulate a sale for income tracking
      await incomeTrackingService.addIncome({
        date: new Date(),
        amount: 100,
        source: 'Affiliate Sale',
        programName: 'Example Program'
      })

      setStatus(prev => prev + '\nIncome recorded for a simulated sale.')
    } catch (err) {
      console.error('Error in automation process:', err)
      setError('An error occurred during the automation process. Please try again later.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Application Automation</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Start the automated application process for multiple affiliate networks.</p>
        </div>
        <div className="mt-5">
          <button 
            onClick={automateApplications}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Processing...
              </>
            ) : (
              'Start Automated Applications'
            )}
          </button>
        </div>
        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        {status && (
          <div className="mt-5">
            <h4 className="text-sm font-medium text-gray-900">Status:</h4>
            <pre className="mt-1 text-sm text-gray-500 whitespace-pre-wrap bg-gray-50 p-2 rounded">
              {status}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationAutomation