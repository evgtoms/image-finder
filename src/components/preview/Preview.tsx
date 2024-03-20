import './Preview.css';
import { useContextSelector } from 'use-context-selector';
import { StateContext } from '../../contexts/stateContext';
import { View } from '../../types';
import { useEffect } from 'react';

/**
 * Component to display image with Accept and Reject buttons
 * @returns {JSX.Element}
 */
export default function Preview() {
    const getImage = useContextSelector(StateContext, (state) => state?.getImage);
    const isLoading = useContextSelector(StateContext, (state) => state?.isLoading);
    const error = useContextSelector(StateContext, (state) => state?.error);
    const imageData = useContextSelector(StateContext, (state) => state?.imageData);
    const setView = useContextSelector(StateContext, (state) => state?.setView);

    const url = imageData?.urls.small;
    const alt = imageData?.alt_description;

    /**
     * Get image data on mount
     */
    useEffect(()=> {
        getImage?.();
        }, []
    );

    /**
     * Handler for Accept button
     */
    const onAccept = () => {
        setView?.(View.Result);
    }

    /**
     * Handler for reject button
     */
    const onReject = () => {
        getImage?.();
    }

    /**
     * Handler for back button
     */
    const backToSearch = () => {
        setView?.(View.Form);
    }

    return (
    <section className="preview-container" data-testid="preview">
        {isLoading ?
        <div className="loading-container">
            Loading, please wait
        </div> :
        <>
            <div className="button-row">
                {error ?                
                    <>
                        <button autoFocus type="button" onClick={backToSearch} aria-label="Return to the search form">Back to search</button>
                        <button type="button" onClick={onReject} aria-label="Reload image with current filter">Reload</button>
                    </>
                     :
                    <>
                        <button autoFocus type="button" onClick={onAccept} aria-label="Accept image">Accept</button>
                        <button type="button" onClick={onReject} aria-label="Reject image and get new one">Reject</button>
                    </>
                }
            </div>
            {error && <p>{error}</p>}
            {url && <img src={url} className="preview-image" alt={alt} />}
        </>}
        
    </section>
    );
}
