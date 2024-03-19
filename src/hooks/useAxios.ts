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

export default function useAxios() {
    const [error, setError] = useState('');
    const [response, setResponse] = useState<ImageRecord|null>(null);
    const fetchImage = useCallback(async (query: string) => {
        try {
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