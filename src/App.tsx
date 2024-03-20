import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import InputForm from './components/form/Form';
import type { FieldValues } from 'react-hook-form';
import Preview from './components/preview/Preview';
import useAxios from './hooks/useAxios';
import getQuery from './utils/getQuery';
import Result from './components/result/Result';

/**
 * Main component with input form, preview view and final result view
 * @returns {JSX.Element}
 */
function App() {
  const [formData, setFormData] = useState<FieldValues|null>(null);
  const {response, error, isLoading, fetchImage} = useAxios();
  const [imageAccepted, setImageAccepted] = useState(false);
  const [showForm, setShowForm] = useState(true);
  /**
   * Fetching image data once form data is populated
   */
  useEffect(
    ()=> {
      if (formData) {
        fetchImage(getQuery(formData));
      }
    }, [formData]
  );

  /**
   * Handler for submit form 
   * @param {FieldValues} formData - Populated form data
   */
  const handleSubmit = (formData: FieldValues) =>{
    setFormData(formData);
    setShowForm(false);
  }

  /**
   * Handler for showing the form view
   */
  const handleBackToSearch = () => {
    setShowForm(true);
  }

  const showInputForm = useMemo(() => showForm && !imageAccepted, [showForm, imageAccepted]);
  const showPreview = useMemo(() => !showForm && !imageAccepted, [showForm, imageAccepted]);
  return (
    <div className="App">
      <h1>Image finder</h1>
      {showInputForm && <InputForm formData={formData} onSubmit={handleSubmit}></InputForm>}
      {showPreview && <Preview onAccept={() =>{ setImageAccepted(true) }} onReject={() => { fetchImage(getQuery(formData as FieldValues)) }} backToSearch={handleBackToSearch} error={error} response={response} isLoading={isLoading}/>}
      {imageAccepted && <Result response={response} filter={formData} />}
    </div>
  );
}

export default App;
