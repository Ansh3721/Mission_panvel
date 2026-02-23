
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex items-center justify-center font-modern relative overflow-hidden bg-gradient-to-br from-[#1B1F3B] to-[#12152E]">
        {/* Radial glow center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#2EE6C9] opacity-10 blur-[120px]" />
        </div>
        {/* Floating blur effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute w-96 h-96 bg-glass-blur rounded-full blur-3xl opacity-60 left-1/4 top-1/3 animate-float"></div>
          <div className="absolute w-72 h-72 bg-glass-blur rounded-full blur-2xl opacity-40 right-1/4 bottom-1/4 animate-float2"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/dashboard" element={
              <div className="w-96 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-glass p-8">
                <h1 className="text-white text-3xl font-bold text-center">Welcome to mitraMind Dashboard!</h1>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
