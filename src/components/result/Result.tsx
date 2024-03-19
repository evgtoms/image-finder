import type { ImageRecord } from '../../hooks/useAxios';
import type { FieldValues } from 'react-hook-form';
import './Result.css';

type ResultProps = {
    response: ImageRecord | null;
    filter: FieldValues | null;
}
export default function Result(props: ResultProps) {
    const { filter, response} = props;
    const url = response?.urls.thumb;
    const alt = response?.alt_description;
    const caption = `${filter?.firstName} ${filter?.lastName}`;
    return (
        <section className="result-container" data-testid="result">
            <div className='caption'>{caption}</div>
            {url && <img src={url} className="image" alt={alt} />}     
        </section>
    );
}