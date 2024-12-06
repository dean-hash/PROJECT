import React, { useState } from 'react';
import { affiliateNetworkService } from '../services/affiliateNetworkService';

interface Props {
  onSignup: () => void;
}

const NetworkSignup: React.FC<Props> = ({ onSignup }) => {
  const [networkName, setNetworkName] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    website: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await affiliateNetworkService.signUpForNetwork(networkName, userInfo);
      setMessage(result.message);
      if (result.success) {
        onSignup();
      }
    } catch (error) {
      setMessage('An error occurred during signup.');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="network-signup">
      <h2>Sign Up for Affiliate Network</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Network Name"
          value={networkName}
          onChange={(e) => setNetworkName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Your Name"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Your Website"
          value={userInfo.website}
          onChange={(e) => setUserInfo({ ...userInfo, website: e.target.value })}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NetworkSignup;