import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {

  const user = useSelector((store) => store.user);

  if (!user) {
    return (

      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>

          <h2 className="mt-6 text-xl font-semibold text-slate-700">
            Loading Profile...
          </h2>

        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 py-10 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-200">

        <div className="h-52 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500"></div>

        <div className="px-8 pb-10">

          <div className="flex justify-center">

            <img
              src={user.profile}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white object-cover -mt-20 shadow-xl"
            />

          </div>

          <div className="text-center mt-6">
            <h1 className="text-4xl font-extrabold text-slate-900">

              {user.firstName} {user.lastName}

            </h1>

            <p className="mt-2 text-slate-500">
              {user.emailID}
            </p>

          </div>


          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">

              <h3 className="text-sm uppercase tracking-wider text-slate-500">

                Age

              </h3>

              <p className="mt-3 text-2xl font-bold text-slate-800">

                {user.age || "Not Added"}

              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">

              <h3 className="text-sm uppercase tracking-wider text-slate-500">

                Gender

              </h3>

              <p className="mt-3 text-2xl font-bold text-slate-800">

                {user.gender || "Not Added"}

              </p>

            </div>
          </div>


          {user.about && (

            <div className="mt-8 bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800">

                About

              </h3>

              <p className="mt-3 text-slate-600 leading-7">

                {user.about}

              </p>

            </div>

          )}

          {user.skills?.length > 0 && (
            <div className="mt-8">

              <h3 className="text-lg font-bold text-slate-800 mb-4">

                Skills

              </h3>

              <div className="flex flex-wrap gap-3">

                {user.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-rose-100 text-rose-600 font-medium"
                  >
                    {skill}
                  </span>

                ))}

              </div>
            </div>
          )}


          <div className="mt-10 flex justify-center">

            <Link to="/profile/edit">

              <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">

                Edit Profile

              </button>

            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;