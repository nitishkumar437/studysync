import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signupUser } from "../services/authService";

import AuthHeader from "../components/common/AuthHeader";
import AuthSidePanel from "../components/common/AuthSidePanel";
import PasswordInput from "../components/common/PasswordInput";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await signupUser(formData);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);

        toast.success("Signup Successful");

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

        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg w-full max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold">
            Create your account
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Free forever for students. No credit card required.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="font-medium">Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-5">
            By signing up you agree to our Terms & Privacy Policy.
          </p>

          <p className="text-center text-gray-500 mt-5">
            Already have an account?
            <Link to="/login" className="text-purple-600 ml-1 hover:underline">
              Sign In
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

export default Signup;
