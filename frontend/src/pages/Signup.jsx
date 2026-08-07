import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerInstitute } from "../services/authService";

import AuthHeader from "../components/common/AuthHeader";
import AuthSidePanel from "../components/common/AuthSidePanel";
import PasswordInput from "../components/common/PasswordInput";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instituteName: "",
    directorName: "",
    directorEmail: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerInstitute(formData);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);

        toast.success("Institute Registered Successfully");

        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
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
            Register Your Institute
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Create your institute and Director account.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="font-medium">Institute Name</label>

              <input
                type="text"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                placeholder="Enter institute name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="font-medium">Director Name</label>

              <input
                type="text"
                name="directorName"
                value={formData.directorName}
                onChange={handleChange}
                placeholder="Enter director name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="font-medium">Director Email</label>

              <input
                type="email"
                name="directorEmail"
                value={formData.directorEmail}
                onChange={handleChange}
                placeholder="Enter director email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <PasswordInput value={formData.password} onChange={handleChange} />

            <div>
              <label className="font-medium">Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="font-medium">Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter institute address"
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-xl font-semibold disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register Institute"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-5">
            Already have an account?
            <Link to="/login" className="text-purple-600 ml-1 hover:underline">
              Login
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
