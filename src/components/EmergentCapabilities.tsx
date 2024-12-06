import React from 'react';

interface Props {
  capabilities: string[];
}

const EmergentCapabilities: React.FC<Props> = ({ capabilities }) => {
  return (
    <div className="emergent-capabilities">
      <h2>Emergent Capabilities</h2>
      {capabilities.length > 0 ? (
        <ul>
          {capabilities.map((capability, index) => (
            <li key={index}>{capability.replace('_', ' ').toUpperCase()}</li>
          ))}
        </ul>
      ) : (
        <p>No emergent capabilities detected yet.</p>
      )}
    </div>
  );
};

export default EmergentCapabilities;