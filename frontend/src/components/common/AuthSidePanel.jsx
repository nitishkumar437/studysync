const AuthSidePanel = () => {
  return (
    <div className="hidden lg:flex w-1/2 bg-linear-to-br from-indigo-500 to-purple-600 items-center justify-center">
      <div className="text-white text-center px-10 max-w-lg">
        <h1 className="text-5xl font-bold leading-tight">
          Built for focus.
          <br />
          Loved by students.
        </h1>

        <p className="mt-6 text-lg leading-8 text-indigo-100">
          Your tasks, notes, and study sessions — all synced in one calm
          workspace.
        </p>
      </div>
    </div>
  );
};

export default AuthSidePanel;
