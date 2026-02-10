import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "", username: "", email: "", password: "", occupation: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        // Save name and isNew: true flag
        localStorage.setItem("user", JSON.stringify({ 
          name: res.data.user.name, 
          isNew: true 
        }));

        setMessage("✅ Registration Successful! Welcome."); 
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      alert("❌ " + (err.response?.data?.msg || "Registration Failed"));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 font-sans">
      <div className="absolute w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <form onSubmit={handleRegister} className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/10 w-full max-w-md backdrop-blur-2xl relative z-10 shadow-2xl">
        <h2 className="text-white text-3xl font-black mb-6 text-center tracking-tight">Create Account</h2>
        <div className="space-y-4">
          <input className="w-full p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white outline-none focus:border-cyan-500" placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input className="w-full p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white outline-none focus:border-cyan-500" placeholder="Username" required onChange={(e) => setFormData({...formData, username: e.target.value})} />
          <input className="w-full p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white outline-none focus:border-cyan-500" type="email" placeholder="Email Address" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <select className="w-full p-3 rounded-xl bg-zinc-800 border border-white/5 text-slate-300 outline-none focus:border-cyan-500" required onChange={(e) => setFormData({...formData, occupation: e.target.value})}>
            <option value="">Select Occupation</option>
            <option value="Business Owner">Business Owner</option>
            <option value="Accountant">Accountant</option>
            <option value="Financial Analyst">Financial Analyst</option>
            <option value="Tax Consultant">Tax Consultant</option>
            <option value="SaaS Developer">SaaS Developer</option>
            <option value="Freelancer">Freelancer</option>
          </select>
          <input className="w-full p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-white outline-none focus:border-cyan-500" type="password" placeholder="Password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 shadow-lg mt-2">Register</button>
        </div>
        <p className="mt-8 text-center text-zinc-500 text-sm font-medium">Already have an account? <Link to="/login" className="text-cyan-500 font-bold hover:underline ml-1">Login here</Link></p>
      </form>
      {message && <div className="mt-6 p-4 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-2xl backdrop-blur-md animate-bounce font-bold shadow-xl">{message}</div>}
    </div>
  );
}

export default RegisterPage;