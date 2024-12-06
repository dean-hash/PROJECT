import React, { useState } from 'react';
import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';

interface UserInfo {
  name: string;
  email: string;
  website: string;
  alternativePresence: string;
  ethicalScore: number;
  trustLevel: number;
}

interface Props {
  onSubmit: (userInfo: UserInfo) => void;
}

const UserInfoForm: React.FC<Props> = ({ onSubmit }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    website: '',
    alternativePresence: '',
    ethicalScore: 50, // Default middle value
    trustLevel: 50, // Default middle value
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UnifiedIntelligenceField.getInstance().setUserInfo(userInfo);
    onSubmit(userInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Existing form fields */}
      <div>
        <label htmlFor="ethicalScore" className="block text-sm font-medium text-gray-700">Ethical Score (0-100)</label>
        <input
          type="number"
          id="ethicalScore"
          name="ethicalScore"
          min="0"
          max="100"
          value={userInfo.ethicalScore}
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
          value={userInfo.trustLevel}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save User Information
      </button>
    </form>
  );
};

export default UserInfoForm;