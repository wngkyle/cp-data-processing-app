import {
  Routes, 
  Route,
} from 'react-router-dom';
import Home from './Home.js';
import FolderSelection from './FolderSelection.js';
import ProcessDetail from './ProcessDetail.js';
import FolderProcessing from './FolderProcessing.js'
import Complete from './Complete.js';
import Error from './Error.js';
import { StepsProvider } from './context/StepContext.js';
import { DirectoryProvider } from './context/DirectoryContext.js';
import { ColumnStepProvider } from './context/ColumnStepContext.js';
import { FastTrackContextProvider } from './context/FastTrackContext.js';
import { ColumnRangeProvider } from './context/ColumnRangeContext.js';

// import SplineHome from './SplineHome.js';

export default function App() {
  return (
    <>
      <StepsProvider>
        <DirectoryProvider>
          <ColumnStepProvider>
            <FastTrackContextProvider>
              <ColumnRangeProvider>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/folder-selection' element={<FolderSelection />} />
                  <Route path='/process-detail' element={<ProcessDetail />} />
                  <Route path='/folder-processing' element={<FolderProcessing />} />
                  <Route path='/complete' element={<Complete />} />
                  <Route path='*' element={<Error />} />
                </Routes>
              </ColumnRangeProvider>
            </FastTrackContextProvider>
          </ColumnStepProvider>
        </DirectoryProvider>
      </StepsProvider>
    </>
  );
};

 