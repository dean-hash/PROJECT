import React, { useState } from 'react';
import { sanitizeInput } from '../utils/sanitize';

// ... existing imports ...

const AffiliateProfileForm: React.FC<Props> = ({ onSubmit }) => {
  // ... existing state and functions ...

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedProfile = Object.fromEntries(
      Object.entries(profile).map(([key, value]) => [key, sanitizeInput(value as string)])
    );
    onSubmit(sanitizedProfile);
  };

  // ... rest of the component ...
};

export default AffiliateProfileForm;