import axios, { AxiosError } from "axios";
import { useState, useCallback } from "react";

type URLs = {
    full: string;
    small: string;
    regular: string;
    thumb: string;
}

export type ImageRecord = {
    alt_description: string;
    id: string;
    height: number;
    width: number;
    urls: URLs
}
/**
 * Custom hook to fetch image information by query
 * @returns {{response: ImageRecord, error: string, isLoading: boolean, fetchImage: (query: string) => Promise<void>}}
 */
export default function useAxios() {
    const [error, setError] = useState('');
    const [response, setResponse] = useState<ImageRecord|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    /**
     * Function to get image by query 
     */
    const fetchImage = useCallback(async (query: string) => {
        try {
            setIsLoading(true);
            setError('');
            const { data } = await axios.get<ImageRecord>(process.env.REACT_APP_API_URL, {params: { query, client_id: process.env.REACT_APP_API_KEY }})
            setResponse(data);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors?.length) {                
                setError(err.response.data.errors[0]);                
            } else {
                setError('Can not load image, please retry');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);
    return {
        response,
        error,
        isLoading,
        fetchImage
    }
}