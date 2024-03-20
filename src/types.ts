import type { FieldValues } from 'react-hook-form';

export enum View {
    Form,
    Preview,
    Result
};

export type URLs = {
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

export type StateContextType = {
    formData: FieldValues;
    setFormData: React.Dispatch<React.SetStateAction<FieldValues>>;
    view: View;
    setView: React.Dispatch<React.SetStateAction<View>>;
    error: string;
    isLoading: boolean;
    imageData: ImageRecord|null;
    getImage: () => Promise<void>
}