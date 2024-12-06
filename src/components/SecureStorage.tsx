import React from 'react'
import { Lock } from 'lucide-react'

const SecureStorage: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Lock className="mr-2" /> Secure Storage
      </h2>
      <p className="mb-4">Implements secure storage for sensitive user data, ensuring compliance with privacy regulations.</p>
      <ul className="list-disc pl-5">
        <li>Encrypts sensitive data (banking details, SSN) using AES-256</li>
        <li>Ensures data security both in transit and at rest</li>
        <li>Complies with GDPR and CCPA regulations</li>
      </ul>
    </div>
  )
}

export default SecureStorage