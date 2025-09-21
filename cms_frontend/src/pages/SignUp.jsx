import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("users/", { email, full_name: fullName, password });
      alert("Signup successful, please login");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Error during signup");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="Full Name" value={fullName} onChange={e=>setFullName(e.target.value)} className="border p-2 rounded"/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 rounded"/>
        <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
