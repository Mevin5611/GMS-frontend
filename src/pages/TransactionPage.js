import React, { useEffect, useState } from "react";
import TransactionDetails from "../components/TransactionDetails";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
/* import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { format } from "date-fns";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload"; */
/* import { pdf } from '@react-pdf/renderer';

import TransactionPDF from './TransactionPDF';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; */

function TransactionPage() {
  const [members, setMembers] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: State for search query
  const [filterOption, setFilterOption] = useState("all"); // Step 1: State for filter option
  const [transactionDateFilter, setTransactionDateFilter] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/member/");
      const json = await response.json();

      if (response.ok) {
        setMembers(json);
      }
    };
    fetchMembers();
  }, []);
  const filteredMembers = members
    ? members.filter((Member) => {
        // Step 3: Filter based on searchQuery and filterOption
        const nameMatch = Member.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const currentDate = new Date();
        const memberpaymentDate = new Date(Member.paymentdate);
        if (filterOption === "all") {
          return nameMatch && Member.dues >= 0;
        } else if (filterOption === "dues") {
          return nameMatch && Member.dues > 0;
        } else if (filterOption === "thisMonth") {
          const currentMonth = currentDate.getMonth();
          const memberMonth = memberpaymentDate.getMonth();
          return nameMatch && currentMonth === memberMonth;
        } else if (filterOption === "lastMonth") {
          const lastMonth = currentDate.getMonth() - 1;
          const memberMonth = memberpaymentDate.getMonth();
          return nameMatch && lastMonth === memberMonth;
        }
        return false;
      })
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

  /* const downloadPDF = async () => {
     
    const blob = await pdf(<TransactionPDF members={filteredMembers} />).toBlob();
    saveAs(blob, "transactions.pdf");
  }; */
 /*  const downloadExcel = () => {
    const dataForExcel = filteredMembers.map((member) => {
      // Extract only specific details for each transaction
      return {
        Name: member.name,
        Phone: member.phone,
        Email: member.email,
        Dob: member.dob,
        Center: member.center,
        JoinDate: member.joindate,
        Gender: member.gender,
        Amount: member.offerprice,
        PaidAmount: member.paidamount,
        Dues: member.dues,
        PaymentDate: member.paymentdate,
        PaymentMethod: member.paymentmethod,
        StartDate: format(new Date(member.startdate), "dd-MM-yyyy"),
        ExpireDate: format(new Date(member.expiredate), "dd-MM-yyyy"),

        // Add other specific details you want to export
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, "transactions.xlsx");
  }; */
  return (
    <div>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg  mt-14">
          <nav class="bg-white border-gray-200 ">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <span class="self-center text-2xl font-bold whitespace-nowrap">
                Transactions
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
                      className="h-10 text-lg flex items-center border rounded-md "
                      id="filter"
                    >
                      <SearchRoundedIcon className="ms-2 opacity-50" />
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
                    <div
                      className="h-10 text-lg flex items-center border rounded-md w-32"
                      id="filter"
                    >
                      <select
                        className="outline-none bg-inherit text-base ps-2 w-auto"
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        placeholder="Filter"
                      >
                        <option value="all">All</option>
                        <option value="dues">Dues</option>
                        <option value="thisMonth">This Month</option>
                        <option value="lastMonth">Last Month</option>
                      </select>
                    </div>
                  </li>
                  {/* <li>
                    <div className="flex items-center h-10">
                    <PictureAsPdfIcon onClick={downloadPDF} />
                    </div>
                  </li> */}
                  {/* <li>
                  <div className="flex items-center h-10">
                  <SimCardDownloadIcon onClick={downloadExcel} />
                    </div>
                    
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>

          {filteredMembers.length === 0 ? (
            <p className="font-semibold ms-5">
              No matching members or transcations found
            </p>
          ) : (
            filteredMembers.map((Member) => (
              <TransactionDetails Member={Member} key={Member._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
