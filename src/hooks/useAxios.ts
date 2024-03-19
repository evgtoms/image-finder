import axios from "axios";
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
 * @returns {{response: ImageRecord, error: string, fetchImage: (query: string) => Promise<void>}}
 */
export default function useAxios() {
    const [error, setError] = useState('');
    const [response, setResponse] = useState<ImageRecord|null>(null);
    /**
     * Function to get image by query 
     */
    const fetchImage = useCallback(async (query: string) => {
        try {
            setError('');
            const { data } = await axios.get<ImageRecord>(process.env.REACT_APP_API_URL, {params: { query, client_id: process.env.REACT_APP_API_KEY }})
            setResponse(data);
        } catch (err) {
            setError('can not load image');
        }
    }, []);
    return {
        response,
        error,
        fetchImage
    }
}