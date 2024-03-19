import './Preview.css';
import type { ImageRecord } from '../../hooks/useAxios';

type PreviewProps = {
    onAccept: () => void;
    onReject: () => void;
    error?: string;
    response?: ImageRecord | null;
}
/**
 * Component to display image with Accept and Reject buttons
 * @param {PreviewProps} props - Component props with handlers for Accept, Recect buttons, error during fetching image, image response
 * @returns {JSX.Element}
 */
export default function Preview(props: PreviewProps) {
    const { response, onAccept, onReject, error } = props;
    const url = response?.urls.small;
    const alt = response?.alt_description;

    return (
    <section className="preview-container" data-testid="preview">
        <div className="button-row">
            {error ?
                <button type="button" onClick={onReject}>Reload</button> :
                <>
                    <button autoFocus type="button" onClick={onAccept}>Accept</button>
                    <button type="button" onClick={onReject}>Reject</button>
                </>
            }
        </div>
        {error && <p>Can't load image, please retry</p>}
        {url && <img src={url} className="preview-image" alt={alt} />}
    </section>
    );
}
