import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";

import AuthHeader from "../components/common/AuthHeader";
import AuthSidePanel from "../components/common/AuthSidePanel";
import PasswordInput from "../components/common/PasswordInput";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);

        toast.success("Login Successful");

        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-100 overflow-hidden">
   
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4">
        <AuthHeader />

        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-md w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome back</h1>

          <p className="text-gray-500 mt-2 mb-8">
            Sign in to continue your study streak.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <PasswordInput value={formData.password} onChange={handleChange} />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-xl font-semibold disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <button className="w-full border border-gray-200 py-3 rounded-xl mt-4 hover:bg-gray-100 transition">
            Continue with Google
          </button>

          <p className="text-center text-gray-500 mt-5">
            Don't have an account?
            <Link to="/signup" className="text-purple-600 ml-1 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        <Link to="/" className="mt-8 text-gray-500 text-sm hover:text-black">
          ← Back to Home
        </Link>
      </div>

      
      <AuthSidePanel />
    </div>
  );
};

export default Login;
