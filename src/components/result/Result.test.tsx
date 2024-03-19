import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import Result from './Result';


describe('result tests', () => {
    test('renders result', () => {
        const mockAccept = jest.fn();
        const mockReject = jest.fn();
        render(<Result filter={{firstName: 'Name', lastName: 'Surname'}} response={
            {urls: {small: 'small', regular: 'regular', thumb: 'thumb', full: 'full'}, alt_description: 'description', id: '0', height: 1, width: 1}
        }/>);

        const caption = screen.getByText(/Name Surname/i);
        expect(caption).toBeInTheDocument();
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    });
});