import React, { useEffect, useState } from "react";
import MemberDeatils from "../components/MemberDeatils";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMemberContext } from "../hooks/useMemberContext";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
/* import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import MemberPDFDocument from './MemberPDFDocument';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; */

function MemberPage() {
  const { members, dispatch } = useMemberContext();
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [joinDateFilter, setJoinDateFilter] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch("/api/member/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MEMBER", payload: json });
      }
    };
    if (user) {
      fetchMembers();
    }
  }, [user, dispatch]);

  const filteredMembers = members
    ? members.filter(
        (member) =>
          member.name &&
          member.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const dashmenu = () => {
    if (
      document.getElementById("navbar-default").classList.contains("hidden")
    ) {
      document.getElementById("navbar-default").classList.remove("hidden");
      document.getElementById("filter").classList.add("mb-4");
    } else {
      document.getElementById("navbar-default").classList.add("hidden");
      document.getElementById("filter").classList.remove("mb-4");
    }
  };

  // Function to filter members based on join date criteria
  const filterMembersByJoinDate = (member) => {
    if (!joinDateFilter) return true; // If no filter selected, return all members

    const currentDate = new Date();
    const memberJoinDate = new Date(member.joindate);

    if (joinDateFilter === "thisMonth") {
      const currentMonth = currentDate.getMonth();
      const memberMonth = memberJoinDate.getMonth();
      return currentMonth === memberMonth;
    } else if (joinDateFilter === "lastThreeMonths") {
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const memberMonth = memberJoinDate.getMonth();
      const memberYear = memberJoinDate.getFullYear();
      return (
        currentYear === memberYear &&
        (currentMonth - memberMonth <= 2 ||
          (currentMonth === 0 && memberMonth === 11))
      );
    }

    return true;
  };
 /*  const downloadPDF = async () => {
     
    const blob = await pdf(<MemberPDFDocument members={filteredMembers.filter(filterMembersByJoinDate)} />).toBlob();
    saveAs(blob, "members.pdf");
  }; */
  return (
    <div>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg  mt-14">
          <nav class="bg-white border-gray-200  mb-4">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <span class="self-center text-2xl font-bold whitespace-nowrap ">
                Members
              </span>
              <button
                onClick={dashmenu}
                data-collapse-toggle="navbar-default"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                class=" hidden w-full md:block md:w-auto"
                id="navbar-default"
              >
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                  <li>
                    <div
                      className="h-10  text-lg flex items-center border rounded-md"
                      id="filter"
                    >
                      <PersonSearchRoundedIcon className="ms-2 opacity-50 " />
                      <input
                        className="outline-none bg-inherit text-base ps-2"
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </li>
                  <li>
                    <button className="bg-orange-500 w-20 rounded-md text-white h-10 text-lg mb-3">
                      <Link to="/addmember">Add</Link>
                    </button>
                  </li>
                  <li>
                    <div className="border h-10 w-36 flex items-center rounded-md">
                    <select
                      value={joinDateFilter}
                      onChange={(e) => setJoinDateFilter(e.target.value)}
                      className="outline-none bg-inherit text-base ps-2 "
                    >
                      <option value="">All Join Dates</option>
                      <option value="thisMonth">This Month</option>
                      <option value="lastThreeMonths">Last 3 Months</option>
                    </select>
                    </div>
                  </li>
                  {/* <li>
                    <div className="flex items-center h-10">
                    <PictureAsPdfIcon onClick={downloadPDF} />
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>

          {filteredMembers.length === 0 ? (
        <p>No matching members found.</p>
      ) : (
        filteredMembers
          .filter((member) =>
            member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter(filterMembersByJoinDate) // Apply join date filter
          .map((member) => (
            <MemberDeatils Member={member} key={member._id} />
          ))
      )}
        </div>
      </div>
    </div>
  );
}

export default MemberPage;
