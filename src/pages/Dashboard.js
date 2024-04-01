import React, { useEffect, useState } from "react";
import SimpleCharts from "../components/charts/SimpleCharts";
import PieArcLabel from "../components/charts/PieArcLabel";
import { useAuthContext } from "../hooks/useAuthContext";

function Dashboard() {
  const [members, setMembers] = useState("");
  const [membercount, setMembercount] = useState("");
  const [trainercount, setTrainercount] = useState("");
  const [expiredMembersCount, setExpiredMembersCount] = useState(0);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch("/api/member/");
      const json = await response.json();

      if (response.ok) {
        setMembers(json);
        setMembercount(json.length);
      }
      const currentDate = new Date();

      // Filter members with expiredate > today's date
      const filteredMembers = json
        ? json.filter((Member) => currentDate > new Date(Member.expiredate))
        : [];
      setExpiredMembersCount(filteredMembers.length);
    };
    const fetchTrainers = async () => {
      const response = await fetch("/api/trainer/");
      const json = await response.json();

      if (response.ok) {
        setTrainercount(json.length);
      }
    };

    if (user) {
      fetchMembers();
      fetchTrainers();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Now you can use 'totalMembers' wherever you need it in your component

  if (isLoading) {
    return (
      <div>
        <div className="p-4 sm:ml-64 ">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 ">
            <div className="flex justify-center items-center h-screen">
              <div class="flex items-center justify-center h-screen">
                <div class="relative">
                  <div class="h-12 w-12 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                  <div class="absolute top-0 left-0 h-12 w-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pt-10">
              <div className="grid grid-flow-row ps-4 grid-cols-1  h-28 bg-white shadow-md pt-2 border border-gray-200 rounded-lg">
                <h4 className="font-bold text-base col-span-1 text-gray-400">
                  Total Members
                </h4>
                <span className="font-bold text-3xl col-span-1 text-black">
                  {membercount}
                </span>
              </div>
              <div className="grid grid-flow-row ps-4 grid-cols-1  h-28 border-gray-200 rounded-lg bg-white shadow-md pt-2 border">
                <h4 className="font-bold text-base  col-span-1 text-gray-400">
                  Total Trainers
                </h4>
                <span className="font-bold text-3xl col-span-1 text-black">
                  {trainercount}
                </span>
              </div>
              <div className="grid grid-flow-row ps-4 grid-cols-1  h-28 border-gray-200 rounded-lg bg-white shadow-md pt-2 border">
                <h4 className="font-bold text-base col-span-1 text-gray-400">
                  Total Transactions
                </h4>
                <span className="font-bold text-3xl col-span-1 text-black">
                  {membercount}
                </span>
              </div>
              <div className="grid grid-flow-row ps-4 grid-cols-1  h-28 border-gray-200 rounded-lg bg-white shadow-md pt-2 border">
                <h4 className="font-bold text-base col-span-1 text-gray-400">
                  Total Expired Members
                </h4>
                <span className="font-bold text-3xl col-span-1 text-black">
                  {expiredMembersCount}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className=" md:col-span-3 mb-4 border-gray-200 rounded-lg bg-white shadow-md border">
                <div className=" p-4">
                  <SimpleCharts />
                </div>
              </div>
              <div className=" col-span-2 flex items-center justify-center md:ms-5 mb-4 border-gray-200 rounded-lg bg-white shadow-md border">
                <div className="p-4">
                  <PieArcLabel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
