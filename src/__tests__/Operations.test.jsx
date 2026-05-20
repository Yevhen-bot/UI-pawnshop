import React from 'react';
import { render, screen } from '@testing-library/react';
import Operations from '../pages/Operations';
import api from '../services/api';

jest.mock('../services/api');

describe('Operations Page', () => {
  const mockHistory = {
    count: 50,
    results: [
      { id: 1, date: '2023-01-01', operation: 1, client: 1, item: 1, store: 1, price: '10' },
    ],
  };
  const mockOpTypes = [{ id: 1, operation: 'selling' }];
  const mockClients = [{ id: 1, first_name: 'Bob', last_name: 'Marley' }];
  const mockItems = [{ id: 1, name: 'Phone' }];
  const mockStores = [{ id: 1, name: 'City Store' }];

  beforeEach(() => {
    jest.clearAllMocks();
    api.get.mockImplementation((url) => {
      if (url.includes('/op-his/')) return Promise.resolve({ data: mockHistory });
      if (url.includes('/operations/')) return Promise.resolve({ data: mockOpTypes });
      if (url.includes('/clients/')) return Promise.resolve({ data: mockClients });
      if (url.includes('/items/')) return Promise.resolve({ data: mockItems });
      if (url.includes('/stores/')) return Promise.resolve({ data: mockStores });
      return Promise.resolve({ data: [] });
    });
  });

  test('renders operations and calculates stats', async () => {
    render(<Operations />);
    await screen.findByText('Bob Marley');
    expect(screen.getByText('selling')).toBeInTheDocument();
  });

  test('handles history as a raw array', async () => {
    const rawHistory = [
      { id: 1, date: '2023-01-01', operation: 1, client: 1, item: 1, store: 1, price: '10' },
    ];
    api.get.mockImplementation((url) => {
      if (url.includes('/op-his/')) return Promise.resolve({ data: rawHistory });
      return Promise.resolve({ data: [] });
    });
    render(<Operations />);
    await screen.findByText(/client #1/i);
  });

  test('handles missing price field in history', async () => {
    const weirdHistory = [
      { id: 1, date: '2023-01-01', operation: 1, client: 1, item: 1, store: 1 },
    ];
    api.get.mockImplementation((url) => {
      if (url.includes('/op-his/')) return Promise.resolve({ data: weirdHistory });
      return Promise.resolve({ data: [] });
    });
    render(<Operations />);
    await screen.findByText(/client #1/i);
    expect(screen.getByText('Page Value')).toBeInTheDocument();
  });
});
