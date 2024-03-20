import './App.css';
import InputForm from './components/form/Form';
import Preview from './components/preview/Preview';
import Result from './components/result/Result';
import { StateContext } from './contexts/stateContext';
import { View } from './types';
import { useContextSelector } from 'use-context-selector';

/**
 * Main component with input form, preview view and final result view
 * @returns {JSX.Element}
 */
function App() {
  const view = useContextSelector(StateContext, (state) => state?.view);

  return (
      <div className="App">
        <h1>Image finder</h1>
        {view === View.Form && <InputForm></InputForm>}
        {view === View.Preview && <Preview></Preview>}
        {view === View.Result && <Result></Result>}
      </div>
  );
}

export default App;
