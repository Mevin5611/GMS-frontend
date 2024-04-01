import React, { useEffect} from "react";
import TrainerDetails from "../components/trainer/TrainerDetails";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTrainerContext } from "../hooks/useTrainerContext";



function TrainerPage() {
    const { trainers, dispatch } = useTrainerContext();
  const { user } = useAuthContext();
 

  useEffect(() => {
    const fetchTrainers = async () => {
      const response = await fetch("/api/trainer/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TRAINER", payload: json });
      }
    };
    if (user) {
      fetchTrainers();
    }
    
  }, []);
  const dashmenu = () => {
    if (
      document.getElementById("navbar-default").classList.contains("hidden")
    ) {
      document.getElementById("navbar-default").classList.remove("hidden");
      
    } else {
      document.getElementById("navbar-default").classList.add("hidden");
      
    }
  };

  

  return (
    <div>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg  mt-14">
          <nav class="bg-white border-gray-200 ">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <span class="self-center text-2xl font-bold whitespace-nowrap ">
                Trainers
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
                    <button className="bg-orange-500 w-20 rounded-md text-white h-10 text-lg ">
                      <Link to="/addtrainer">Add</Link>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5">
          {trainers &&
            trainers.map((Trainer,index) => (
              <TrainerDetails Trainer={Trainer} key={index} />
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainerPage
