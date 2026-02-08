import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for the success message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { username, password });
      
      // Display message below the card
      setMessage("✅ " + res.data.msg); 

      // Wait 2 seconds so the user can see the message, then revert to homepage
      setTimeout(() => {
        navigate("/"); 
      }, 2000);

    } catch (err) {
      alert("❌ Registration Failed: " + (err.response?.data?.msg || "Server Error"));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
      <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <form onSubmit={handleRegister} className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/10 w-full max-w-md backdrop-blur-2xl relative z-10 shadow-2xl">
        <h2 className="text-white text-3xl font-bold mb-6 text-center tracking-tight">Create Account</h2>
        <div className="space-y-4">
          <input className="w-full p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white outline-none focus:border-blue-500 transition-all" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
          <input className="w-full p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white outline-none focus:border-blue-500 transition-all" type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all">Register</button>
        </div>
        <p className="mt-8 text-center text-zinc-500 text-sm">Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline ml-1">Login here</Link></p>
      </form>

      {/* Message displayed right below the card */}
      {message && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-2xl backdrop-blur-md animate-bounce">
          {message}
        </div>
      )}
    </div>
  );
}

export default RegisterPage;