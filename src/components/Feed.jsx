import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserCard from "../components/UserCard";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {

      const res = await axios.get(
        `${BASE_URL}/feed`,
        {
          withCredentials: true,
        }
      );

      dispatch(addFeed(res.data));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

    if (!feed) {
      fetchFeed();
    }

  }, []);

  if (!feed) {

    return (

      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>

          <h2 className="mt-6 text-xl font-semibold text-slate-700">
            Finding developers...
          </h2>

          <p className="mt-2 text-slate-500">
            Please wait while we prepare your feed.
          </p>

        </div>
      </div>
    );

  }

  if (feed.length === 0) {

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-12 text-center max-w-md w-full">

          <div className="text-6xl mb-5">
            🎉
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            You're all caught up!
          </h1>

          <p className="mt-4 text-slate-500 leading-7">
            There are no more developers to discover right now.
            Check back later for new connections.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">

        <div className="text-center mb-10">

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-rose-600 text-sm font-semibold">

            ❤️ Discover Developers

          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900">

            Find Your Next Connection

          </h1>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto leading-7">

            Select through talented developers, build meaningful
            connections, and grow your professional network.

          </p>
        </div>
      </div>


      <div className="flex justify-center px-4 pb-16">

        <div className="w-full max-w-sm sm:max-w-md">

          <UserCard user={feed[0]} />

        </div>

      </div>
    </div>

  );
};

export default Feed;