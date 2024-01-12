import { render, screen, waitFor } from '@testing-library/react';
import MainContainer from '../components/MainContainer'
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [{ id: '1', title: 'The Little Things', genres: ['Drama'] }] }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it('fetches movies successfully and displays them', async () => {
  render(<MainContainer />);
  expect(fetch).toHaveBeenCalledTimes(1);
});

it('displays error message when fetch fails', async () => {
  fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
  render(<MainContainer />);
  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});

it('renders genre panel, search bar, and info modal', () => {
  render(<MainContainer />);
  expect(screen.getByText(/Genres/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
});