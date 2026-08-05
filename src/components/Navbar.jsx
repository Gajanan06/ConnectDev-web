import { useState,useRef,useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaHeart } from "react-icons/fa";


const Navbar = () => {
    const user = useSelector((store) => store.user);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
  const handleClickOutside = (event) => {

    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }

  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };

}, []);


const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async () => {

  try {
    await axios.post(
      `${BASE_URL}/logout`,
      {},
      { withCredentials: true }
    );

    dispatch(removeUser());
    setShowMenu(false);
    navigate("/login");

  } catch (err) {
    console.log(err);
  }
};

  return (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex items-center justify-between h-18">

        <Link to="/feed" className="flex items-center gap-3 group">

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-105 transition-transform">
            ❤️

          </div>

          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              DevTinder
            </h1>

            <p className="text-xs text-slate-500 -mt-1">
              Connect with Developers
            </p>
          </div>

        </Link>

        {user && (
          <div ref={menuRef} className="relative flex items-center gap-4">

            <div className="hidden md:block text-right">

              <p className="text-sm text-slate-500">
                Welcome back
              </p>

              <h3 className="font-semibold text-slate-800">
                {user.firstName}
              </h3>
            </div>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="relative"
            >

              <img
                src={user.profile || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md hover:scale-105 transition"
              />

              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white"></span>

            </button>

            {showMenu && (
              <div className="absolute right-0 top-16 w-56 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">

                <div className="px-5 py-4 border-b bg-slate-50">

                  <h3 className="font-bold text-slate-800">
                    {user.firstName}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Developer Profile
                  </p>

                </div>

                <ul className="py-2 text-sm">

                  <li>

                    <Link
                      onClick={() => setShowMenu(false)}
                      to="/profile/view"
                      className="block px-5 py-3 hover:bg-slate-100 transition"
                    >
                      👤 My Profile
                    </Link>

                  </li>

                  <li>

                    <Link
                      to="/requests"
                      onClick={() => setShowMenu(false)}
                      className="block px-5 py-3 hover:bg-slate-100 transition"
                    >
                      📩 Requests
                    </Link>

                  </li>

                  <li>

                    <Link
                      onClick={() => setShowMenu(false)}
                      to="/connections"
                      className="block px-5 py-3 hover:bg-slate-100 transition"
                    >
                      🤝 Connections
                    </Link>

                  </li>

                  <li className="border-t">

                    <button
                      onClick={() => {
                        setShowMenu(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50 transition"
                    >
                      🚪 Logout
                    </button>

                  </li>

                </ul>
              </div>
            )}
          </div>

        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;