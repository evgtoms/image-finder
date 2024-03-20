import './Preview.css';
import type { ImageRecord } from '../../hooks/useAxios';

type PreviewProps = {
    onAccept: () => void;
    onReject: () => void;
    backToSearch: () => void;
    error?: string;
    response?: ImageRecord | null;
    isLoading?: boolean;
}
/**
 * Component to display image with Accept and Reject buttons
 * @param {PreviewProps} props - Component props with handlers for Accept, Recect buttons, error during fetching image, image response
 * @returns {JSX.Element}
 */
export default function Preview(props: PreviewProps) {
    const { response, onAccept, onReject, backToSearch, error, isLoading } = props;
    const url = response?.urls.small;
    const alt = response?.alt_description;

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
