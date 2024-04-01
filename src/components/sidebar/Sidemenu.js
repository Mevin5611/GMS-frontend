import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import logo from "../../assets/img/gymlogo.png";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import SportsGymnasticsRoundedIcon from "@mui/icons-material/SportsGymnasticsRounded";
import PriceChangeRoundedIcon from "@mui/icons-material/PriceChangeRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import TimerOffIcon from "@mui/icons-material/TimerOff";

function Sidemenu() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  const [members, setMembers] = useState(null);
  const [expiredMembersCount, setExpiredMembersCount] = useState(0);

  const fetchMembers = async () => {
    const response = await fetch("/api/member/");
    const json = await response.json();

    if (response.ok) {
      setMembers(json);

      // Calculate the expired members count
      const currentDate = new Date();
      const expiredCount = json.filter(
        (member) => currentDate > new Date(member.expiredate)
      ).length;
      setExpiredMembersCount(expiredCount);
    }
  };

  useEffect(() => {
    // Fetch members initially
    fetchMembers();

    // Set up a timer to fetch data periodically (every 5 minutes in this example)
    const timer = setInterval(fetchMembers, 1 * 60 * 1000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  const userClick = () => {
    if (document.getElementById("dropdown-user").classList.contains("hidden")) {
      document.getElementById("dropdown-user").classList.remove("hidden");
    } else {
      document.getElementById("dropdown-user").classList.add("hidden");
    }
  };
  const sideClick = () => {
    if (
      document
        .getElementById("logo-sidebar")
        .classList.contains("-translate-x-full")
    ) {
      document
        .getElementById("logo-sidebar")
        .classList.remove("-translate-x-full");
    } else {
      document
        .getElementById("logo-sidebar")
        .classList.add("-translate-x-full");
    }
  };


  return (
    <div className="mt-6"  >
      <header className="">
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button
                  onClick={sideClick}
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                < Link to="/" className="flex ml-2 md:mr-24">
                  <img src={logo} className="h-14 mr-3" />
                  {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap  font-sans">
                    ASTHETIC FITNES
                  </span> */}
                </Link >
              </div>
              <div className="flex items-center">
                <div className="flex items-center ml-3">
                  {user && (
                    <div>
                      <button
                        onClick={userClick}
                        type="button"
                        className=" mr-2 flex text-sm rounded-full focus:ring-4 focus:ring-gray-300"
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown-user"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt=""
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* <div className="w-full m-0 ps-10 flex items-center justify-between h-20">
            <Link to= '/' className=''>
                <h1 className='text-4xl font-bold '>GYM</h1>
            </Link>
            <nav>
              {user && (<div>
                <span className='mr-3 font-medium text-gray-600'>{user.email}</span>
                <button className='font-medium text-gray-600 mr-3' onClick={handleClick}>Log out</button>
                <button className='create'><Link to= '/signup' className='font-medium text-gray-600 mr-5'>Create</Link></button>
              </div>)}
              {!user && (<div>
              <Link to= '/login' className='font-medium text-gray-600 mr-5'>Login</Link>
              </div>)}
            </nav>
        </div> */}
      </header>

      <aside
        id="logo-sidebar"
        className="mt-5 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white ">
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                onClick={sideClick}
                class="flex items-center p-2 text-gray-600 rounded-lg    hover:bg-gray-100 "
              >
                <GridViewRoundedIcon className="text-gray-900 " />
                <span class="ml-3 text-base font-bold">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/centers"
                onClick={sideClick}
                class=" flex items-center p-2 text-gray-600 rounded-lg  hover:bg-gray-100 "
              >
                <FitnessCenterRoundedIcon className="text-gray-900 "/>
                <span class="flex-1 ml-3 whitespace-nowrap text-base font-bold">Centers</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trainers"
                onClick={sideClick}
                class=" flex items-center p-2 text-gray-600 rounded-lg  hover:bg-gray-100 "
              >
                <SportsGymnasticsRoundedIcon className="text-gray-900 "/>
                <span class="flex-1 ml-3 whitespace-nowrap text-base font-bold">
                  Trainers
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/packages"
                onClick={sideClick}
                class=" flex items-center p-2 text-gray-600 rounded-lg  hover:bg-gray-100 "
              >
                <PriceChangeRoundedIcon className="text-gray-900 "/>
                <span class="flex-1 ml-3 whitespace-nowrap text-base font-bold">Packge</span>
              </Link>
            </li>
            <li>
              <Link
                to="/members"
                onClick={sideClick}
                class="flex items-center p-2 text-gray-600 rounded-lg  hover:bg-gray-100 "
              >
                <PeopleAltRoundedIcon className="text-gray-900 "/>
                <span class="flex-1 ml-3 whitespace-nowrap text-base font-bold">Members</span>
              </Link>
            </li>
            {/* <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 ">
                                <img class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" src='https://cdn-icons-png.flaticon.com/512/1819/1819938.png' fill="currentColor" viewBox="0 0 20 18">
                                    
                                </img>
                                <span class="flex-1 ml-3 whitespace-nowrap">Dues</span>
                            </a>
                        </li> */}
            <li>
              <Link
                to="/tranctions"
                onClick={sideClick}
                class=" flex items-center p-2 text-gray-600 rounded-lg  hover:bg-gray-100 "
              >
                <PaidRoundedIcon className="text-gray-900 "/>
                <span class="flex-1 ml-3 whitespace-nowrap text-base font-bold text-gray-600">Transactions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/expired"
                onClick={sideClick}
                className=' flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 '
                
              >
                <TimerOffIcon  className="text-gray-900 "/>
                <span class="flex-1 ml-3 whitespace-nowrap text-base font-bold text-gray-600">
                  Expired Members
                </span >

                {expiredMembersCount > 0 ? (
                  <span className="bg-red-500 w-6 h-6 rounded-full text-center text-white">
                    {expiredMembersCount}
                  </span>
                ) : null}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="flex justify-end fixed top-0 right-0 z-auto mt-5">
        <div
          className="  hidden mt-14 mr-5 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
          id="dropdown-user"
        >
          <div className="px-4 py-3" role="none">
            {/* <p className="text-sm text-gray-900 " role="none">
                            Neil Sims
                        </p> */}
            <p
              className="text-sm font-medium text-gray-900 truncate "
              role="none"
            >
              {user.email}
            </p>
          </div>
          <ul className="py-1" role="none">
            
            <li>
              <span
                className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 "
                role="menuitem"
                onClick={handleClick}
              >
                Sign out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
