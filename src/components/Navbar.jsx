import { useState,useRef,useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


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
    <nav className="bg-gray-800 shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <Link to="/feed" className="text-2xl font-bold text-orange-500">
          devTinder
        </Link>

        {user && (
          <div ref={menuRef} className=" flex relative items-center gap-4">
            <p className="text-white font-medium">Welcome, {user.firstName} </p>
            
            <button
  onClick={() => setShowMenu(!showMenu)}
  className="w-10 h-10 rounded-full overflow-hidden"
>
  <img
    src={user.profile || "https://via.placeholder.com/150"}
    alt="Profile"
    className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
  />
</button>

          {showMenu && (
  <div className="absolute right-0 top-12 w-44 bg-white rounded-lg shadow-lg border">
    
    <ul className="py-2 text-sm text-gray-700">

      <li>
        <Link
          onClick={() => setShowMenu(false)}
          to="/profile/view"
          className="block px-4 py-2 hover:bg-gray-100"
        >
          Profile
        </Link>
      </li>

      <li>
        <Link
          to="/requests"
          onClick={() => setShowMenu(false)}
          className="block px-4 py-2 hover:bg-gray-100"
        >
          Requests
        </Link>
      </li>

      <li>
  <Link
    onClick={() => setShowMenu(false)}
    to="/connections"
    className="block px-4 py-2 hover:bg-gray-100"
  >
    Connections
  </Link>
</li>

      <li>
        <Link
          className="block px-4 py-2 hover:bg-gray-100 text-red-500"
          onClick={() => {
            setShowMenu(false);
            handleLogout();
          }}
        >
          Logout
        </Link>
      </li>

    </ul>
  </div>
)}
        </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;