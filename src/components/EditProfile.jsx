import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [profile, setProfile] = useState(user.profile || "");
  const [error, setError] = useState("");

  const handleEditProfile = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          profile,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile/view");

    } catch (err) {

      setError(err.response?.data || "Something went wrong");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden">

        <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-8">

          <h1 className="text-3xl font-bold text-white">
            Edit Profile
          </h1>

          <p className="text-white/80 mt-2">
            Keep your developer profile updated.

          </p>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-8">

            <img
              src={profile || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl -mt-20 bg-white"
            />

          </div>

          <form
            onSubmit={handleEditProfile}
            className="space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-6">
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  First Name

                </label>

                <input
                  type="text"
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
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
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                />

              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Age

                </label>

                <input
                  type="number"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                />

              </div>

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">

                  Gender

                </label>

                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
                >

                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>

                </select>

              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">

                Profile Image URL

              </label>

              <input
                type="text"
                value={profile}
                onChange={(e) =>
                  setProfile(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
              />

            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                {error}
              </div>

            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 py-3 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              Save Changes
            </button>

          </form>

        </div>
      </div>
    </div>

  );
};

export default EditProfile;