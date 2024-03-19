import type { FieldValues } from 'react-hook-form';
/**
 * Extracts topic description from form fields if topic value is "other"
 * @param {FieldValues} filter - Form data fields
 * @returns {string} Topic description
 */
export default function getQuery(filter: FieldValues) {
    return filter.topic === "other" ? filter.otherTopic : filter.topic};