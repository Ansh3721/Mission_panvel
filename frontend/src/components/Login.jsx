import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="w-96 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-glass p-8 flex flex-col items-center animate-fadeIn">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-2">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#2EE6C9" />
          <path d="M16 8c4 0 8 2 8 8s-4 8-8 8-8-2-8-8 4-8 8-8z" fill="#fff" />
        </svg>
        <span className="text-teal text-2xl font-bold tracking-wide">mitraMind</span>
      </div>
      <h2 className="text-white text-xl font-semibold mb-2">Log In</h2>
      <p className="text-gray-300 mb-6">Welcome back! Please enter your details.</p>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <button type="button" className="text-teal hover:underline text-sm">Forgot Password?</button>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal to-cyan-400 text-white font-semibold py-3 rounded-xl shadow-glow transition-all hover:shadow-glow-lg hover:scale-105 focus:outline-none"
        >
          Log In
        </button>
        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
      </form>
      <div className="mt-6 text-gray-300 text-sm">
        Don't have an account? <button className="text-teal hover:underline" onClick={() => navigate('/register')}>Sign up</button>
      </div>
    </div>
  );
};

export default Login;