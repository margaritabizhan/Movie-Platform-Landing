import { render, screen } from '@testing-library/react';
import App from '../App';

test('test render', () => {
  render(<App />);
  const linkElement = screen.getByText('React App');
  expect(linkElement).toBeInTheDocument();
});
