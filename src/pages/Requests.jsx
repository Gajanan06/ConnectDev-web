import { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import { BASE_URL } from "../utils/constants";

const Requests = () => {

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/requests/received`,
        {
          withCredentials: true,
        }
      );

      setRequests(res.data);

    } catch (err) {
      console.log(err);
    }

  };


  useEffect(() => {
    fetchRequests();
  }, []);


  if (requests.length === 0) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center px-4">

        <div className="max-w-md w-full bg-white rounded-[32px] shadow-xl border border-slate-200 p-10 text-center">

          <div className="text-6xl mb-6">
            📩
          </div>

          <h2 className="text-3xl font-bold text-slate-800">
            No Requests Yet
          </h2>

          <p className="mt-4 text-slate-500 leading-7">
            When developers send you connection requests,
            they'll appear here.
          </p>

        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">

          <span className="inline-flex items-center rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600">

            ❤️ ConnectDev

          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-slate-900">

            Connection Requests

          </h1>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">

            Review developers who are interested in connecting with you.

          </p>

        </div>

        <div className="space-y-6">

          {requests.map((request) => (

            <RequestCard
              key={request._id}
              request={request}
            />

          ))}

        </div>
      </div>
    </div>
  );
};

export default Requests;