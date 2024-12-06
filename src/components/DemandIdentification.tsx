import React from 'react'

interface Props {
  onIdentify: (data: any) => void
}

const DemandIdentification: React.FC<Props> = ({ onIdentify }) => {
  const identifyDemand = () => {
    // Simulate demand identification process
    const mockData = { highDemandProducts: ['Product A', 'Product B'] }
    onIdentify(mockData)
  }

  return (
    <div>
      <h2>Demand Identification</h2>
      <button onClick={identifyDemand}>Identify High-Demand Products</button>
    </div>
  )
}

export default DemandIdentification