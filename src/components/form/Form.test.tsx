import { fireEvent, render, screen, act } from "@testing-library/react";
import Form from './Form';
import { FieldValues } from 'react-hook-form';
import { StateContext } from '../../contexts/stateContext';
import { StateContextType, View } from '../../types';

describe('form tests', () => {
    test('renders form', () => {
        const mockSetFormData = jest.fn();
        const mockSetView = jest.fn();
        const mockState = {
            formData: {} as FieldValues,
            setFormData: mockSetFormData,
            setView: mockSetView,
        } as unknown as StateContextType;
        render(<StateContext.Provider value={mockState}><Form /></StateContext.Provider>);
        const firstName = screen.getByTestId('firstName');
        expect(firstName).toBeInTheDocument();
        const lastName = screen.getByTestId('lastName');
        expect(lastName).toBeInTheDocument();
        const topic = screen.getByTestId('topic');
        expect(topic).toBeInTheDocument();
        const otherTopic = screen.queryByTestId('otherTopic');
        expect(otherTopic).toBeNull();
    });

    test('should show validation errors', async () => {
        const mockSetFormData = jest.fn();
        const mockSetView = jest.fn();
        const mockState = {
            formData: {} as FieldValues,
            setFormData: mockSetFormData,
            setView: mockSetView,
        } as unknown as StateContextType;
        render(<StateContext.Provider value={mockState}><Form /></StateContext.Provider>);
        fireEvent.submit(screen.getByRole("button"));        
        expect(await screen.findAllByRole("alert")).toHaveLength(2);
        expect(mockSetFormData).not.toBeCalled();
        expect(mockSetView).not.toBeCalled();
    });

    test('should not show validation errors', async () => {
        const mockSetFormData = jest.fn();
        const mockSetView = jest.fn();
        const mockState = {
            formData: {
                firstName: 'Name',
                lastName: 'Surname'
            } as FieldValues,
            setFormData: mockSetFormData,
            setView: mockSetView,
        } as unknown as StateContextType;
        render(<StateContext.Provider value={mockState}><Form /></StateContext.Provider>);
        await act(async () => await fireEvent.click(screen.getByRole("button")));    
        expect(await screen.queryAllByRole("alert")).toHaveLength(0);
        expect(mockSetFormData).toBeCalledWith({
            firstName: 'Name',
            lastName: 'Surname',
            topic: 'travel'
        });
        expect(mockSetView).toHaveBeenCalledWith(View.Preview);
    });

    test('should show validation errors when other option selected', async () => {
        const mockSetFormData = jest.fn();
        const mockSetView = jest.fn();
        const mockState = {
            formData: {
                topic: 'other'
            } as FieldValues,
            setFormData: mockSetFormData,
            setView: mockSetView,
        } as unknown as StateContextType;
        render(<StateContext.Provider value={mockState}><Form /></StateContext.Provider>);
        fireEvent.submit(screen.getByRole("button"));        
        expect(await screen.findAllByRole("alert")).toHaveLength(3);
        expect(mockSetFormData).not.toBeCalled();
        expect(mockSetView).not.toBeCalled();
    });

    test('should not show validation errors when other option selected', async () => {
        const mockSetFormData = jest.fn();
        const mockSetView = jest.fn();
        const mockState = {
            formData: {
                firstName: 'Name',
                lastName: 'Surname',
                topic: 'other',
                otherTopic: 'other topic'
            } as FieldValues,
            setFormData: mockSetFormData,
            setView: mockSetView,
        } as unknown as StateContextType;
        render(<StateContext.Provider value={mockState}><Form /></StateContext.Provider>);
        await act(async () => await fireEvent.click(screen.getByRole("button")));    
        expect(await screen.queryAllByRole("alert")).toHaveLength(0);
        expect(mockSetFormData).toBeCalledWith({
            firstName: 'Name',
            lastName: 'Surname',
            topic: 'other',
            otherTopic: 'other topic'
        });
        expect(mockSetView).toHaveBeenCalledWith(View.Preview);
    });
});
