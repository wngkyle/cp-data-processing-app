import { 
  Routes, 
  Route, 
} from 'react-router-dom';
import Home from './Home.js';
import FileUpload from './FileUpload.js';
import InputDetail from './InputDetail.js';
import Complete from './Complete.js';
import Error from './Error.js';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/file-upload' element={<FileUpload />} />
        <Route path='/input-detail' element={<InputDetail />} />
        <Route path='/complete' element={<Complete />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
};


// {/* <Route path='/product/product-detail/:sluggy/:sluggie' element={<ProductDetails />} /> */}