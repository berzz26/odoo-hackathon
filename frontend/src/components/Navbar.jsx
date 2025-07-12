import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 w-full px-4 py-4 mb-4">
      <div className="flex justify-between items-center w-full px-4">
        <h1 className="text-xl font-bold text-white">StackIt</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate("/login")}
            className="border border-white px-4 py-1 rounded-full hover:bg-gray-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="border border-white px-4 py-1 rounded-full hover:bg-gray-700 transition"
          >
            SignUp
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
