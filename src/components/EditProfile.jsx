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
    <div className="flex justify-center py-6 px-4">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-md p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>

        <form
          onSubmit={handleEditProfile}
          className="space-y-5"
        >

          <div>
            <label className="block text-gray-700 mb-2">
              First Name
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Last Name
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Age
            </label>

            <input
              type="number"
              value={age}
              onChange={(e) =>
                setAge(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Gender
            </label>

            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Profile Image URL
            </label>

            <input
              type="text"
              value={profile}
              onChange={(e) =>
                setProfile(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-200"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;