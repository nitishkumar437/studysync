import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="StudySync" className="w-12" />

              <h2 className="text-3xl font-bold text-white">
                Study<span className="text-violet-400">Sync</span>
              </h2>
            </div>

            <p className="mt-5 leading-7">
              StudySync helps students organize notes, tasks and study plans in
              one modern workspace.
            </p>
          </div>

          <div>
            <h3 className="hover:text-white transition font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <a href="#features">Features</a>
              <a href="#dashboard">Dashboard</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>

            <div className="flex flex-col gap-3">
              <Link to="/login">Login</Link>
              <Link to="/signup">Create Account</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          © {new Date().getFullYear()} StudySync. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
