import React from 'react';
import { fireEvent, render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from './Form';


describe('form tests', () => {
    test('renders form', () => {
        render(<Form />);
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
        const mockSubmit = jest.fn();
        render(<Form onSubmit={mockSubmit}/>);
        fireEvent.submit(screen.getByRole("button"));        
        expect(await screen.findAllByRole("alert")).toHaveLength(2);
        expect(mockSubmit).not.toBeCalled();
    });

    test('should not show validation errors', async () => {
        const mockSubmit = jest.fn();
        render(<Form onSubmit={mockSubmit}/>);
        fireEvent.input(screen.getByTestId("firstName"), {
            target: {
                value: "Name",
            },
        });
        fireEvent.input(screen.getByTestId("lastName"), {
            target: {
                value: "LastName",
            },
        });

        await act(async () => await fireEvent.click(screen.getByRole("button")));    
        expect(await screen.queryAllByRole("alert")).toHaveLength(0);
        expect(mockSubmit).toBeCalled();
    });

    test('should show validation errors when other option selected', async () => {
        const mockSubmit = jest.fn();
        render(<Form onSubmit={mockSubmit}/>);
        fireEvent.change(screen.getByTestId("topic"), {
            target: {
                value: "other",
            },
        });
        fireEvent.submit(screen.getByRole("button"));        
        expect(await screen.findAllByRole("alert")).toHaveLength(3);
        expect(mockSubmit).not.toBeCalled();
    });

    test('should not show validation errors when other option selected', async () => {
        const mockSubmit = jest.fn();
        render(<Form onSubmit={mockSubmit}/>);
        fireEvent.input(screen.getByTestId("firstName"), {
            target: {
                value: "Name",
            },
        });
        fireEvent.input(screen.getByTestId("lastName"), {
            target: {
                value: "LastName",
            },
        });
        fireEvent.change(screen.getByTestId("topic"), {
            target: {
                value: "other",
            },
        });
        fireEvent.input(screen.getByTestId("firstName"), {
            target: {
                value: "Name",
            },
        });
        fireEvent.input(screen.getByTestId("otherTopic"), {
            target: {
                value: "other topic",
            },
        });
        await act(async () => await fireEvent.click(screen.getByRole("button")));    
        expect(await screen.queryAllByRole("alert")).toHaveLength(0);
        expect(mockSubmit).toBeCalled();
    });
});
