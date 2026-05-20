import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Catalog from '../pages/Catalog';
import api from '../services/api';

jest.mock('../services/api');

describe('Catalog Page', () => {
  test('renders catalog items', async () => {
    const mockItems = [
      { id: 1, name: 'Item A', description: 'Desc A' },
      { id: 2, name: 'Item B', description: 'Desc B' },
    ];
    api.get.mockResolvedValueOnce({ data: mockItems });

    render(<Catalog />);

    expect(screen.getByText(/loading catalog/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Item A')).toBeInTheDocument();
      expect(screen.getByText('Item B')).toBeInTheDocument();
      expect(screen.getByText('Desc A')).toBeInTheDocument();
    });
  });

  test('shows empty message when no items', async () => {
    api.get.mockResolvedValueOnce({ data: [] });
    render(<Catalog />);
    await waitFor(() => {
      expect(screen.getByText(/no items found/i)).toBeInTheDocument();
    });
  });

  test('handles fetch error gracefully', async () => {
    api.get.mockRejectedValueOnce(new Error('API Error'));
    render(<Catalog />);
    await waitFor(() => {
      expect(screen.getByText(/no items found/i)).toBeInTheDocument();
    });
  });
});
