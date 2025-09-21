import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("token/", { email, password });
      login(res.data.access);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 rounded"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
