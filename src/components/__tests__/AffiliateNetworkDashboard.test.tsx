import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AffiliateNetworkDashboard from '../AffiliateNetworkDashboard';
import { useUser } from '../../contexts/UserContext';
import { getNetworkStatuses } from '../../services/affiliateNetworkService';

jest.mock('../../contexts/UserContext');
jest.mock('../../services/affiliateNetworkService');

describe('AffiliateNetworkDashboard', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      userProfile: { email: 'test@example.com', name: 'Test User' }
    });
  });

  it('renders loading state initially', () => {
    render(<AffiliateNetworkDashboard />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders network statuses after loading', async () => {
    const mockNetworks = [
      { id: 1, name: 'Network 1', status: 'Approved' },
      { id: 2, name: 'Network 2', status: 'Pending' }
    ];
    (getNetworkStatuses as jest.Mock).mockResolvedValue(mockNetworks);

    render(<AffiliateNetworkDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Network 1')).toBeInTheDocument();
      expect(screen.getByText('Network 2')).toBeInTheDocument();
      expect(screen.getByText('Approved')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });
  });

  it('renders error message when API call fails', async () => {
    (getNetworkStatuses as jest.Mock).mockRejectedValue(new Error('API error'));

    render(<AffiliateNetworkDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch network statuses/)).toBeInTheDocument();
    });
  });

  it('renders error message when user profile is not found', async () => {
    (useUser as jest.Mock).mockReturnValue({ userProfile: null });

    render(<AffiliateNetworkDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/User profile not found/)).toBeInTheDocument();
    });
  });
});