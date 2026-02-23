import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name,
        email: form.email,
        gender: form.gender,
        age: form.age,
        username: form.username,
        password: form.password
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
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
      <h2 className="text-white text-xl font-semibold mb-2">Register</h2>
      <p className="text-gray-300 mb-6">Create your new account.</p>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={form.email}
          onChange={handleChange}
        />
        <select
          name="gender"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={form.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal transition"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal to-cyan-400 text-white font-semibold py-3 rounded-xl shadow-glow transition-all hover:shadow-glow-lg hover:scale-105 focus:outline-none"
        >
          Sign Up
        </button>
        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
      </form>
      <div className="mt-6 text-gray-300 text-sm">
        Already have an account? <button className="text-teal hover:underline" onClick={() => navigate('/login')}>Log in</button>
      </div>
    </div>
  );
};

export default Register;