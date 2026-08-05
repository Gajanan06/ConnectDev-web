import { useNavigate } from "react-router-dom";

const ConnectionCard = ({ connection }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      <div className="p-6">

        <div className="flex flex-col sm:flex-row items-center gap-5">

          <div className="relative flex-shrink-0">

            <img
              src={connection.profile}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />

            {/* <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span> */}

          </div>

          <div className="flex-1 text-center sm:text-left">

            <h2 className="text-2xl font-bold text-slate-800">

              {connection.firstName} {connection.lastName}

            </h2>

            {(connection.age || connection.gender) && (

              <p className="mt-2 text-slate-500">

                {connection.age && `${connection.age} Years`}
                {connection.age && connection.gender && " • "}
                {connection.gender && connection.gender}

              </p>

            )}

            {connection.about && (
              <p className="mt-4 text-slate-600 leading-7 line-clamp-2">
                {connection.about}
              </p>
            )}

            {connection.skills?.length > 0 && (
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">

                {connection.skills.map((skill, index) => (

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


        <div className="mt-6">
          <button
            onClick={() => navigate(`/chat/${connection._id}`)}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            💬 Message

          </button>
        </div>
      </div>
    </div>

  );
};

export default ConnectionCard;