import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const AuthHeader = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 mb-8 hover:opacity-90 transition"
    >
      <img
        src={logo}
        alt="StudySync Logo"
        className="w-12 h-12 object-contain"
      />

      <h1 className="text-4xl font-bold">
        <span className="text-gray-900">Study</span>
        <span className="text-violet-600">Sync</span>
      </h1>
    </Link>
  );
};

export default AuthHeader;
