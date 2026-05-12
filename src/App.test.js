import { render, screen } from '@testing-library/react';
import App from './App';

test('renders The Pick Zone branding', () => {
  render(<App />);
  expect(screen.getAllByText(/THE PICK ZONE/i).length).toBeGreaterThan(0);
});
