import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e) => {

    e.preventDefault();
    try {
      if (isLoginForm) {

        
        await axios.post(`${BASE_URL}/login`,
         {
           emailID,
         password,
      },
      {
        withCredentials: true,
     }
    );

const userRes = await axios.get(`${BASE_URL}/profile/view`,
   {
    withCredentials: true,
   }
  );

  dispatch(addUser(userRes.data));
  navigate("/feed");

      } else {


        await axios.post(
          `${BASE_URL}/signup`,
          {
            firstName,
            lastName,
            emailID,
            password,
          },
          {
            withCredentials: true,
          }
        );

        setIsLoginForm(true);
        setError("");

        alert("Account created successfully");
      }

    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center px-4 py-10">

    <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-200">

      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white p-12">

        <div className="max-w-md">

          <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            ❤️ Welcome to ConnectDev
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight">
            Connect with
            <br />
            Amazing Developers.
          </h1>

          <p className="mt-6 text-lg text-white/90 leading-8">
            Discover developers, build meaningful connections,
            collaborate on exciting projects and grow your network.
          </p>

          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3">
              <span>🚀</span>
              <span>Connect with developers worldwide</span>
            </div>

            <div className="flex items-center gap-3">
              <span>💬</span>
              <span>Real-time messaging</span>
            </div>

            <div className="flex items-center gap-3">
              <span>🤝</span>
              <span>Build your professional network</span>
            </div>

          </div>

        </div>

      </div>


      <div className="p-8 sm:p-10 lg:p-12">

        <div className="text-center">

          <div className="inline-flex items-center justify-center w-18 h-18 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-3xl shadow-lg">
            ❤️
          </div>

          <h1 className="mt-5 text-4xl font-extrabold text-slate-900">
            ConnectDev
          </h1>

          <p className="mt-3 text-slate-500">

            {isLoginForm
              ? "Welcome back! Sign in to continue."
              : "Create your account and start networking."}

          </p>

        </div>

        <form
          onSubmit={handleAuth}
          className="space-y-5 mt-10"
        >

          {!isLoginForm && (
            <>

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                />

              </div>

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                />

              </div>

            </>
          )}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={emailID}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="john@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
            />

          </div>

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
            />

          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>

          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >

            {isLoginForm ? "Login" : "Create Account"}

          </button>

        </form>

        <div className="mt-8 text-center">

          {isLoginForm ? (

            <p className="text-slate-600">

              New here?

              <button
                type="button"
                onClick={() => {
                  setIsLoginForm(false);
                  setError("");
                }}
                className="ml-2 font-semibold text-rose-500 hover:text-rose-600 hover:underline cursor-pointer"
              >
                Create Account
              </button>

            </p>

          ) : (

            <p className="text-slate-600">

              Already have an account?

              <button
                type="button"
                onClick={() => {
                  setIsLoginForm(true);
                  setError("");
                }}
                className="ml-2 font-semibold text-rose-500 hover:text-rose-600 hover:underline cursor-pointer"
              >
                Login
              </button>

            </p>

          )}

        </div>
      </div>
    </div>
  </div>
);
};

export default Login;