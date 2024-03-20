import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import StateContextProvider, { StateContext } from './contexts/stateContext';
import { StateContextType, View } from './types';
describe('preview tests', () => {
    test('renders app', () => {
      render(<StateContextProvider><App /></StateContextProvider>);
      const header = screen.getByText(/Image finder/i);
      expect(header).toBeInTheDocument();
      const inputForm = screen.getByTestId('input-form');
      expect(inputForm).toBeInTheDocument();
      const preview = screen.queryByTestId('preview');
      expect(preview).toBeNull();
      const result = screen.queryByTestId('result');
      expect(result).toBeNull();
    });

    test('renders preview', () => {
        const mockState = {
            view: View.Preview
        } as unknown as StateContextType;
        render(<StateContext.Provider value={mockState}><App/></StateContext.Provider>);
        const previewView = screen.getByTestId('preview');
        expect(previewView).toBeInTheDocument();
    });

    test('renders result', () => {
      const mockState = {
          view: View.Result
      } as unknown as StateContextType;
      render(<StateContext.Provider value={mockState}><App/></StateContext.Provider>);
      const resultView = screen.getByTestId('result');
      expect(resultView).toBeInTheDocument();
  });
});
