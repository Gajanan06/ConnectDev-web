import { useEffect, useState } from "react";
import axios from "axios";
import ConnectionCard from "../components/ConnectionCard";
import { BASE_URL } from "../utils/constants";

const Connections = () => {

  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/connections`,
        {
          withCredentials: true,
        }
      );

      setConnections(res.data);

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchConnections();
  }, []);


  if (connections.length === 0) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center px-4">

        <div className="max-w-md w-full rounded-[32px] bg-white border border-slate-200 shadow-xl p-10 text-center">

          <div className="text-6xl mb-5">
            🤝
          </div>

          <h2 className="text-3xl font-bold text-slate-800">
            No Connections Yet
          </h2>

          <p className="mt-4 text-slate-500 leading-7">
            Start connecting with developers to build your professional network.
          </p>

        </div>
      </div>

    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">

          <span className="inline-flex items-center rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600">

            🤝 Your Network

          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900">

            Your Connections

          </h1>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">

            Stay connected with developers you've matched with and grow your network.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {connections.map((connection) => (

            <ConnectionCard
              key={connection._id}
              connection={connection}
            />

          ))}

        </div>
      </div>
    </div>

  );
};

export default Connections;