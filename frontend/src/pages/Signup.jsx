import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);

        toast.success("Signup Successful");

        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 relative">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4">
        <div className="text-purple-600 text-3xl font-bold mb-8">StudySync</div>

        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold mt-4">
            Create your account
          </h1>

          <p className="text-gray-500 mt-2 mb-6">
            Free forever for students. No credit card required.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="font-medium">Full name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-2"
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
                placeholder="Enter email"
                className="w-full border border-gray-200 rounded-xl px-4 py-2 mt-2"
                required
              />
            </div>

            <div>
              <label className="font-medium">Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 pr-12"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 transition text-white py-2 rounded-lg"
            >
              Create account
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            By signing up you agree to our Terms & Privacy Policy.
          </p>

          <p className="text-center text-gray-500 mt-4">
            Already have an account?
            <Link to="/login" className="text-purple-600 ml-1 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="mt-10 text-gray-500 text-sm hover:text-gray-900"
        >
          ← Back to home
        </Link>
      </div>

      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-indigo-500 to-purple-400 items-center justify-center">
        <div className="text-white">
          <h1 className="text-4xl text-center font-bold">
            Built for focus. Loved by <br />
            students.
          </h1>

          <p className="mt-5 text-lg">
            Your tasks, notes, and study sessions — all synced in one calm
            workspace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
