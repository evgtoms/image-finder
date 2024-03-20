import { useCallback, useState } from "react";
import { createContext } from "use-context-selector";
import type { FieldValues } from 'react-hook-form';
import getQuery from "../utils/getQuery";
import useAxios from "../hooks/useAxios";
import { ImageRecord, StateContextType, View } from '../types';

type StateContextProviderProps = {
    children: React.ReactNode;
}

/**
 * Context for state
 */
export const StateContext = createContext<StateContextType|null>(null);

/**
 * Provider for state context
 * @param {StateContextProviderProps} param - Props with children elements for provider
 * @returns {JSX.Element}
 */
export default function StateContextProvider({ children }: StateContextProviderProps) {
    const [formData, setFormData] = useState<FieldValues>({});
    const [view, setView] = useState<View>(View.Form);
    const [imageData, setImageData] = useState<ImageRecord|null>(null);
    const {
        error,
        isLoading,
        fetchImage
    } = useAxios();

    /**
     * Function to get image data
     */
    const getImage = useCallback(async() => {
        const result = await fetchImage(getQuery(formData))
        setImageData(result);
    },[fetchImage, formData])

    return (   
        <StateContext.Provider value={{ formData, setFormData, view, setView, error, isLoading, imageData, getImage }}>
            {children}
        </StateContext.Provider>
    );
}