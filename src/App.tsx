import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import InputForm from './components/form/Form';
import type { FieldValues } from 'react-hook-form';
import Preview from './components/preview/Preview';
import useAxios from './hooks/useAxios';
import getQuery from './utils/getQuery';
import Result from './components/result/Result';


function App() {
  const [formData, setFormData] = useState<FieldValues|null>(null);
  const {response, error, fetchImage} = useAxios();
  const [imageAccepted, setImageAccepted] = useState(false);

  useEffect(
    ()=> {
      if (formData) {
        fetchImage(getQuery(formData));
      }
    }, [formData]
  );

  const showInputForm = useMemo(() => !formData && !imageAccepted, [formData, imageAccepted]);
  const showPreview = useMemo(() => formData && !imageAccepted, [formData, imageAccepted]);
  return (
    <div className="App">
      <h1>Image finder</h1>
      {showInputForm && <InputForm onSubmit={setFormData}></InputForm>}
      {showPreview && <Preview onAccept={() =>{ setImageAccepted(true) }} onReject={() => { fetchImage(getQuery(formData as FieldValues)) }} error={error} response={response}/>}
      {imageAccepted && <Result response={response} filter={formData} />}
    </div>
  );
}

export default App;
