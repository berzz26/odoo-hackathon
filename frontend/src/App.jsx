import { Routes, Route } from 'react-router-dom';
import Test from './pages/test'; 
import Home from './pages/Home';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Home />}/>
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
