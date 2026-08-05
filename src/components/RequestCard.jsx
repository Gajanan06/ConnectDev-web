import axios from "axios";
import { BASE_URL } from "../utils/constants";

const RequestCard = ({ request }) => {
  const { fromUserId } = request;

  const handleReviewRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${request._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      window.location.reload();

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div className="flex items-center gap-5">

          <div className="relative">

            <img
              src={fromUserId.profile}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />

            {/* <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span> */}

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              {fromUserId.firstName} {fromUserId.lastName}

            </h2>

            <p className="mt-1 text-slate-500">

              {fromUserId.age} Years • {fromUserId.gender}

            </p>

            {fromUserId.about && (

              <p className="mt-3 text-slate-600 leading-7 max-w-md">

                {fromUserId.about}

              </p>

            )}

            {fromUserId.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">

                {fromUserId.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium"
                  >

                    {skill}

                  </span>

                ))}
              </div>

            )}

          </div>
        </div>


        <div className="flex flex-col sm:flex-row gap-3">

          <button
            onClick={() =>
              handleReviewRequest("rejected")
            }
            className="px-6 py-3 rounded-2xl border border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
          >

            Reject

          </button>

          <button
            onClick={() =>
              handleReviewRequest("accepted")
            }
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >

            Accept

          </button>

        </div>
      </div>
    </div>
  );
};

export default RequestCard;