import React, { useState } from 'react';
import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';

interface CollaboratorInfo {
  name: string;
  email: string;
  website: string;
  alternativePresence: string;
  ethicalScore: number;
  trustLevel: number;
}

interface Props {
  onSubmit: (collaboratorInfo: CollaboratorInfo) => void;
}

const CollaboratorInfoForm: React.FC<Props> = ({ onSubmit }) => {
  const [collaboratorInfo, setCollaboratorInfo] = useState<CollaboratorInfo>({
    name: '',
    email: '',
    website: '',
    alternativePresence: '',
    ethicalScore: 50,
    trustLevel: 50,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCollaboratorInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UnifiedIntelligenceField.getInstance().setCollaboratorInfo(collaboratorInfo);
    onSubmit(collaboratorInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={collaboratorInfo.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {/* Other form fields remain the same */}
      <div>
        <label htmlFor="ethicalScore" className="block text-sm font-medium text-gray-700">Ethical Score (0-100)</label>
        <input
          type="number"
          id="ethicalScore"
          name="ethicalScore"
          min="0"
          max="100"
          value={collaboratorInfo.ethicalScore}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="trustLevel" className="block text-sm font-medium text-gray-700">Trust Level (0-100)</label>
        <input
          type="number"
          id="trustLevel"
          name="trustLevel"
          min="0"
          max="100"
          value={collaboratorInfo.trustLevel}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save Collaborator Information
      </button>
    </form>
  );
};

export default CollaboratorInfoForm;