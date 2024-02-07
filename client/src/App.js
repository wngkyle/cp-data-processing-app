import {
  Routes, 
  Route,
} from 'react-router-dom';
import Home from './Home.js';
import FolderSelection from './FileUpload.js';
import InputDetail from './ProcessDetail.js';
import FolderProcessing from './FolderProcessing.js'
import Complete from './Complete.js';
import Error from './Error.js';
import { StepsProvider } from './context/StepContext.js';

export default function App() {
  return (
    <>
      <StepsProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/folder-selection' element={<FolderSelection />} />
          <Route path='/process-detail' element={<InputDetail />} />
          <Route path='/folder-processing' element={<FolderProcessing />} />
          <Route path='/complete' element={<Complete />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </StepsProvider>
    </>
  );
};

 