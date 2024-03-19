import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const header = screen.getByText(/Image finder/i);
  expect(header).toBeInTheDocument();
  const inputForm = screen.getByTestId('input-form');
  expect(inputForm).toBeInTheDocument();
  const preview = screen.queryByTestId('preview');
  expect(preview).toBeNull();
  const result = screen.queryByTestId('result');
  expect(result).toBeNull();
});
