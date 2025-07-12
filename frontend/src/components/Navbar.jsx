import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen">
      <nav className="bg-gray-800 w-full px-4 py-4 mb-4">
        <div className="flex justify-between items-center w-full px-4">
          <h1 className="text-xl font-bold text-blue-400">StackIt</h1>
          <div className="flex gap-2 items-center">
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
            <button
              onClick={() => navigate("/notifications")}
              className="border border-white px-4 py-1 rounded-full hover:bg-gray-700 transition"
            >
              <FontAwesomeIcon icon={faBell} className="text-white text-xl cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
