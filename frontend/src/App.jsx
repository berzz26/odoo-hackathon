import { Routes, Route } from 'react-router-dom';
import Test from './pages/test'; 
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';
import AskQuestion from './pages/AskQuestion';

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Home />}/>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path='ask-question' element = {<AskQuestion/>}/>
    </Routes>
  );
}

export default App;
