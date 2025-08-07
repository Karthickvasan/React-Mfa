// src/pages/LoginPages.jsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { login as loginUser, register as registerUser } from '../services/authApi';
import { useNavigate } from 'react-router-dom';

const LoginPages = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleAuthSubmit = async ({ username, password }) => {
    try {
      const response = isRegister
        ? await registerUser(username, password)
        : await loginUser(username, password);

      const data = response.data;
      console.log(data);

      if (!isRegister) {
        navigate('/2fa/setup');
      } else {
        alert('Registration successful! Please log in.');
        setIsRegister(false);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <LoginForm isRegister={isRegister} onSubmit={handleAuthSubmit} />

      <button
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-blue-600 hover:underline"
      >
        {isRegister
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default LoginPages;
