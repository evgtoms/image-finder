import './Result.css';
import { useContextSelector } from 'use-context-selector';
import { StateContext } from '../../contexts/stateContext';

/**
 * Component to display image, first and last name
 * @returns {JSX.Element}
 */
export default function Result() {
    const imageData = useContextSelector(StateContext, (state) => state?.imageData);
    const formData = useContextSelector(StateContext, (state) => state?.formData);
    const url = imageData?.urls.thumb;
    const alt = imageData?.alt_description;
    const caption = `${formData?.firstName} ${formData?.lastName}`;
    return (
        <section className="result-container" data-testid="result">
            <div className='caption' aria-label="First and last name">{caption}</div>
            {url && <img src={url} className="image" alt={alt} />}     
        </section>
    );
}