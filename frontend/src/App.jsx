import { Routes, Route } from 'react-router-dom';
import Test from './pages/test'; 
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
