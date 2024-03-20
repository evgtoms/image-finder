import { fireEvent, render, screen } from "@testing-library/react";
import Preview from './Preview';
import { StateContext } from '../../contexts/stateContext';
import { StateContextType, View } from '../../types';

describe('preview tests', () => {
    test('renders preview', () => {
        const mockSetView = jest.fn();
        const mockGetImage = jest.fn();
        const mockState = {
            imageData: {
                alt_description: 'description',
                urls: {
                    small: 'small'
                }
            },
            error: '',
            isLoading: false,
            setView: mockSetView,
            getImage: mockGetImage,
        } as unknown as StateContextType;
        const mockAccept = jest.fn();
        const mockReject = jest.fn();
        render(<StateContext.Provider value={mockState}><Preview/></StateContext.Provider>);        
        expect(mockGetImage).toBeCalled();

        const btnAccept = screen.getByText(/Accept/i);
        expect(btnAccept).toBeInTheDocument();
        const btnReject = screen.getByText(/Reject/i);
        expect(btnReject).toBeInTheDocument();
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Accept/i));   
        expect(mockSetView).toBeCalledWith(View.Result);

        fireEvent.click(screen.getByText(/Reject/i));   
        expect(mockGetImage).toBeCalled();
    });

    test('renders preview with error', () => {
        const mockSetView = jest.fn();
        const mockGetImage = jest.fn();
        const mockState = {
            error: 'Can not load image, please retry',
            isLoading: false,
            setView: mockSetView,
            getImage: mockGetImage,
        } as unknown as StateContextType;
        render(<StateContext.Provider value={mockState}><Preview/></StateContext.Provider>);
        expect(mockGetImage).toBeCalled();
        const btnReload = screen.getByText(/Reload/i);
        expect(btnReload).toBeInTheDocument();
        const caption = screen.getByText(/retry/i);
        expect(caption).toBeInTheDocument();
        const img = screen.queryByRole('img');
        expect(img).toBeNull();

        fireEvent.click(screen.getByText(/Back to search/i));   
        expect(mockSetView).toBeCalledWith(View.Form);
        fireEvent.click(screen.getByText(/Reload/i));   
        expect(mockGetImage).toBeCalled();
    });

    test('renders preview with loading', () => {
        const mockSetView = jest.fn();
        const mockGetImage = jest.fn();
        const mockState = {
            error: '',
            isLoading: true,
            getImage: mockGetImage,
        } as unknown as StateContextType;
        render(<StateContext.Provider value={mockState}><Preview/></StateContext.Provider>);
        expect(mockGetImage).toBeCalled();
        const caption = screen.getByText(/Loading/i);
        expect(caption).toBeInTheDocument();
        const img = screen.queryByRole('img');
        expect(img).toBeNull();
    });
});