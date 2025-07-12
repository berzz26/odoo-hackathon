import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';


const Login = () => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState('');


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response = await fetch(`${backendUrl}/auth/login`, {
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
    navigate('/');
    }catch(error){
        setError(error.message);
    }finally{
        setLoading(false);
    }
    };
   return (
  <div className="min-h-screen w-screen flex flex-col bg-gray-900 text-white">
    
    {/* Header */}
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-blue-400 font-bold text-2xl">StackIt</h1>
        <nav>
          <button 
            onClick={() => navigate('/login')}
            className="text-gray-300 hover:text-white px-3 py-1 rounded-md hover:bg-gray-700"
          >
            Log in
          </button>
        </nav>
      </div>
    </header>

    {/* Main Content */}
    <main className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Create your account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 mt-4"
            >
              {loading ? 'Registering...' : 'login'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            By registering, you agree to our terms of service and privacy policy.
          </div>
        </div>

        <div className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-400 hover:text-blue-300 focus:outline-none"
          >
            Signup
          </button>
        </div>
      </div>
    </main>

    {/* Footer */}
    <Footer />

  </div>
);
}

export default Login;
