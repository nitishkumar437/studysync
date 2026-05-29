import React from "react";

const Login = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 relative">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4">
          <div className="text-purple-600 text-4xl font-bold mb-8">
            StudySync
          </div>
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-md space-y-5 w-full max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold">Welcome back</h1>
            <p className="text-gray-500 mb-8">
              Sign in to continue your study streak.
            </p>
            <label className="font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-200 rounded-xl px-4 py-2"
            />
            <label className="font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-200 rounded-xl px-4 py-2"
            />
            <button className="w-full bg-purple-500  hover:bg-purple-600 transition text-white py-3 rounded-xl">
              Sign In
            </button>
            <button className="w-full border hover:bg-purple-400 border-gray-200 py-3 rounded-xl">
              Continue with Google
            </button>
            <p className="text-center text-gray-500">
              Don't have an account?
              <span className="text-purple-600 cursor-pointer ml-1">
                Sign Up
              </span>
            </p>
          </div>
          <p className="mt-15 text-gray-500 text-sm hover:text-gray-900">← Back to home</p>
        </div>
        <div className="hidden lg:flex w-1/2 bg-linear-to-br from-indigo-500 to-purple-400 items-center justify-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold">Built for focus.</h1>

            <p className="mt-5 text-lg">
              Your tasks, notes, and study sessions — all synced in one calm
              workspace.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
