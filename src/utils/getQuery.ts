import type { FieldValues } from 'react-hook-form';

export default function getQuery(filter: FieldValues) {
    return filter.topic === "other" ? filter.otherTopic : filter.topic};