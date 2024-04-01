import React from "react";
import { Link, useNavigate } from "react-router-dom";

function TrainerDetails({ Trainer }) {
  const navigate = useNavigate();
  const imageUrl = `/uploads/${Trainer.img}`;

  const viewClick = (value) => {
    navigate("/viewtrainer", { state: value });
  };
  return (
    <div className="mb-5">
      <div class="">
        <div class="max-w-md md:max-col-span-1 mb-10 m-10 md:m-0 md:ps-5 ">
          <div class="bg-white shadow-xl  py-3 border border-gray-200 rounded-lg">
            <div class="photo-wrapper p-2 w-32 h-32 rounded-full mx-auto">
              <div class="w-32 h-32 rounded-full overflow-hidden">
                <img
                  class="w-full h-full object-cover"
                  src={imageUrl}
                  alt=""
                />
              </div>
            </div>

            <div class="p-2  ">
              <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
                {Trainer.name}
              </h3>

              <div class="text-center text-gray-400 text-base font-semibold flex justify-center">
                <p>Fitness Trainer </p>
              </div>
              
              <div class=" flex justify-center items-center pt-1">
                <p className="text-gray-900 text-sm font-bold">Phone : </p>
                <p className=" text-sm font-semibold">{Trainer.phone} </p>
              </div>
              <div class=" flex justify-center items-center pt-1">
                <p className="text-gray-900 text-sm font-bold">Email : </p>
                <p className=" text-sm font-semibold">{Trainer.email} </p>
              </div>

              <div class="text-center my-3">
                <span
                  class="text-xs text-indigo-500 cursor-pointer font-medium"
                  onClick={() => viewClick(Trainer._id)}
                >
                  View Profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDetails;
