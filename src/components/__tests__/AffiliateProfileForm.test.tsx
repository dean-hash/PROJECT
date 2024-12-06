import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AffiliateProfileForm from '../AffiliateProfileForm';
import { useUser } from '../../contexts/UserContext';

jest.mock('../../contexts/UserContext');

describe('AffiliateProfileForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      userProfile: null,
      setUserProfile: jest.fn()
    });
  });

  it('renders the form correctly', () => {
    render(<AffiliateProfileForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tax ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Affiliate Network/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<AffiliateProfileForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getAllByText('This field is required')).toHaveLength(4);
    });
  });

  it('validates email format', async () => {
    render(<AffiliateProfileForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(<AffiliateProfileForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Website/i), { target: { value: 'https://example.com' } });
    fireEvent.change(screen.getByLabelText(/Tax ID/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/Select Affiliate Network/i), { target: { value: 'ShareASale' } });

    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        website: 'https://example.com',
        taxId: '123456789',
        network: 'ShareASale'
      });
    });
  });
});