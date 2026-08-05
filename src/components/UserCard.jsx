import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { FaMapMarkerAlt, FaBirthdayCake } from "react-icons/fa";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleFeedAction = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUserFromFeed(userId));

    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }

  };

  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300">

      <div className="relative overflow-hidden">

        <img
          src={user.profile || "https://via.placeholder.com/400x500"}
          alt="Profile"
          className="w-full h-[430px] object-cover hover:scale-105 transition-transform duration-500"
        />


        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>


        <div className="absolute bottom-5 left-5 text-white">

          <h2 className="text-3xl font-bold">

            {user.firstName} {user.lastName}

          </h2>

          <div className="flex items-center gap-2 mt-1 text-sm text-white/90">

            <FaBirthdayCake />

            <span>{user.age} years</span>

          </div>
        </div>
      </div>


      <div className="p-6">

        <span className="inline-flex px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-semibold">

          {user.gender}

        </span>


        {user.about && (
          <p className="mt-5 text-slate-600 leading-7">

            {user.about}

          </p>
        )}


        {user.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">

            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm"
              >
                {skill}
              </span>

            ))}
          </div>
        )}


        <div className="flex gap-4 mt-8">

          <button
            onClick={() =>
              handleFeedAction("ignored", user._id)
            }
            className="flex-1 py-3 rounded-2xl border border-slate-300 text-slate-700 font-semibold hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300"
          >
            ✖ Ignore
          </button>

          <button
            onClick={() =>
              handleFeedAction("interested", user._id)
            }
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            ❤️ Interested
          </button>

        </div>
      </div>
    </div>

  );
};

export default UserCard;