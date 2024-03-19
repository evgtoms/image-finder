import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import Preview from './Preview';


describe('preview tests', () => {
    test('renders preview', () => {
        const mockAccept = jest.fn();
        const mockReject = jest.fn();
        render(<Preview onAccept={mockAccept} onReject={mockReject} response={
            {urls: {small: 'small', regular: 'regular', thumb: 'thumb', full: 'full'}, alt_description: 'description', id: '0', height: 1, width: 1}
        }/>);

        const btnAccept = screen.getByText(/Accept/i);
        expect(btnAccept).toBeInTheDocument();
        const btnReject = screen.getByText(/Reject/i);
        expect(btnReject).toBeInTheDocument();
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Accept/i));   
        expect(mockAccept).toBeCalled();

        fireEvent.click(screen.getByText(/Reject/i));   
        expect(mockReject).toBeCalled();
    });

    test('renders preview with error', () => {
        const mockAccept = jest.fn();
        const mockReject = jest.fn();
        render(<Preview onAccept={mockAccept} onReject={mockReject} error={'error'}/>);

        const btnReload = screen.getByText(/Reload/i);
        expect(btnReload).toBeInTheDocument();
        const caption = screen.getByText(/retry/i);
        expect(caption).toBeInTheDocument();
        const img = screen.queryByRole('img');
        expect(img).toBeNull();

        fireEvent.click(screen.getByText(/Reload/i));   
        expect(mockReject).toBeCalled();
    });
});