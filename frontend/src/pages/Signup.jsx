import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[loading,setLoading] = useState(false);
    const [error, setError] = useState('');


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response = await fetch(`${backendUrl}/auth/signup`, {
            method: 'POST',
            headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), 
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'signup failed');
    }
    alert('signup succesfull');
    navigate('/login');
    }catch(error){
        setError(error.message);
    }finally{
        setLoading(false);
    }
    };
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
