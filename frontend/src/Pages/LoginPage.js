import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Restored for pop-up
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({ 
          name: res.data.user.name, 
          isNew: false 
        }));

        // Restored Animated Pop-up Logic
        setMessage("✅ Login Successful! Redirecting...");

        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      }
    } catch (err) {
      alert("❌ " + (err.response?.data?.msg || "Login Failed"));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
      <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <form onSubmit={handleLogin} className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/10 w-full max-w-md backdrop-blur-2xl relative z-10 shadow-2xl">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Login</h2>
        <div className="space-y-4">
          <input 
            className="w-full p-3 rounded-xl bg-zinc-800 text-white outline-none" 
            placeholder="Username" 
            required 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            className="w-full p-3 rounded-xl bg-zinc-800 text-white outline-none" 
            type="password" 
            placeholder="Password" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-95">
            Sign In
          </button>
        </div>
        <p className="mt-8 text-center text-zinc-500 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-500 font-semibold hover:underline ml-1">Register yourself</Link>
        </p>
      </form>

      {/* Restored Animated Success Pop-up */}
      {message && (
        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-2xl backdrop-blur-md animate-pulse font-bold shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;