import React, { useEffect, useState } from "react";
import ExpiredMembers from "../components/ExpiredMembers";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';



function ExpiredMember() {
  const [members, setMembers] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sentSMSMembers, setSentSMSMembers] = useState([]);
  

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

  
 
  const currentDate = new Date();

  const sendExpiredSMS = (Member) => {
    // Customize the SMS message
    const toWithCountryCode = '+91' + Member.phone;
    const smsBody = `Message From Aesthetic Fitness Dear ${Member.name}, Your Package is due for renewal. Pleasure Renew to avoid any inconvenience. Always in your service.`;

    fetch('https://gms-backend-cj6n.onrender.com/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: toWithCountryCode, // Assuming you have the member's phone number
        body: smsBody,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error('Failed to send SMS:', error);
      });
  };

  const handleExpiredMembers = async () => {
    if (members) {
      // Filter out expired members that haven't received an SMS and have a status of 'Active'
      const ExpiredMembers = members.filter(
        (Member) =>
          currentDate > new Date(Member.expiredate) &&
          !sentSMSMembers.includes(Member.id) &&
          Member.status === 'Unexpired'
      );
  
      for (const Member of ExpiredMembers) {
        console.log(Member.phone);
        // Send an SMS
        await sendExpiredSMS(Member);
        // Update the member's status to 'Expired'
        await updateMemberStatus(Member);
        // Add the member ID to the list of sent SMS members
        setSentSMSMembers((prevMembers) => [...prevMembers, Member.id]);
      }
    }
  };
  
  const formData = new FormData();
  formData.append("status",'Expired');
  const updateMemberStatus = async (Member) => {
    try {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/member/" + Member._id, {
        method: "PATCH",
        body: formData
       
      });
    } catch (error) {
      console.error('Failed to update member status:', error);
    }
  };
  



  // Filter members with expiredate > today's date
  const filteredMembers = members
    ? members.filter((Member) => {
        const nameMatch = Member.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        

        // Filter members with expiredate > today's date, name match, and payment method match
        return (
          currentDate > new Date(Member.expiredate) &&
          nameMatch
        );
      })
    : [];

    

  return (
    <div>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg  mt-14">
          <nav class="bg-white border-gray-200 ">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <span class="self-center text-2xl font-bold whitespace-nowrap ">
                Expired Members
              </span>
              <span></span>
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
                <ul class="font-medium flex items-center flex-col p-4 md:p-0 mt-4  border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                  
                  <li className="mb-2">
                    <div
                      className="h-10 text-lg flex items-center border rounded-md"
                      id="filter"
                    >
                      <SearchRoundedIcon className="ms-2 opacity-50"/>
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
                    <button className="h-10 text-white text-sm p-3 flex items-center border rounded-md bg-blue-600" onClick={handleExpiredMembers}>Send SMS</button>
                  </li>
                </ul>
              </div>
            </div>
            
          </nav>
          {filteredMembers.length === 0 ? (
            <p>No matching expired members found.</p>
          ) : (
            filteredMembers.map((Member) => (
              <ExpiredMembers Member={Member} key={Member._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpiredMember;
