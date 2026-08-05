import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-0 border-t border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-5">

        <div className="text-center md:text-left">

          <h3 className="text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            DevTinder
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            © {new Date().getFullYear()} DevTinder. All rights reserved.
          </p>

        </div>


        <div className="flex items-center gap-4">

          <a
            href="#"
            className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all duration-300"
          >
            <FaTwitter />
          </a>

          <a
            href="#"
            className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <FaLinkedin />
          </a>

          <a
            href="#"
            className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            <FaGithub />
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;