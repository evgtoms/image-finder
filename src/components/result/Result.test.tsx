import { render, screen } from "@testing-library/react";
import Result from './Result';
import { StateContext } from '../../contexts/stateContext';
import type { FieldValues } from 'react-hook-form';
import { StateContextType } from "../../types";
describe('result tests', () => {
    test('renders result', () => {

        const mockState = {
            formData: {
                firstName: 'Name',
                lastName: 'Surname'
            } as FieldValues,
            imageData: {
                alt_description: 'description',
                urls: {
                    thumb: 'thumb'
                }
            }
        } as StateContextType;
        render(<StateContext.Provider value={mockState}><Result/></StateContext.Provider>);

        const caption = screen.getByText(/Name Surname/i);
        expect(caption).toBeInTheDocument();
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    });
});