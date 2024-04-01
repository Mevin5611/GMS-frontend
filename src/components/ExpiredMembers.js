import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';

function ExpiredMembers({ Member }) {

  const navigate = useNavigate();

  const showdetail = (value) => {
    navigate("/showexpired", { state: value });
  };
  const editClick = () => {
    navigate("/renewmember", { state: Member });
  };
  
  return (
    <div>
      <div className="w-full h-16 p-1 border rounded-lg shadow flex items-center justify-between mb-3">
        <div className=" text-base md:text-xl  font-bold flex flex-col items-center justify-start">
          <span className="text-zinc-800">{Member.name}</span>
        </div>

        <div className=" text-xs md:text-base flex flex-col items-center ">
          <span className="font-bold">Package</span>
          <span className="text-zinc-800">{Member.pack} days</span>
        </div>

        <div className=" md:mt-0 text-xs md:text-base  flex flex-col items-center">
          <span className="font-bold">Start Date</span>
          <span className="text-zinc-800">
            {format(new Date(Member.startdate), "dd-MM-yyyy")}
          </span>
        </div>

        <div className=" md:mt-0 text-xs md:text-base  flex flex-col items-center">
          <span className="font-bold">Expire Date</span>
          <span className="text-zinc-800">
            {format(new Date(Member.expiredate), "dd-MM-yyyy")}
          </span>
        </div>
        <div className="flex items-center  ">
        <div className=" text-lg  ">
          <DriveFileRenameOutlineRoundedIcon onClick={editClick} />
        </div>

        <div className="text-lg ps-2 lg:ps-4">
          <ReadMoreRoundedIcon onClick={() => showdetail(Member._id)} />
        </div>
        </div>
      </div>
    </div>
  );
}

export default ExpiredMembers;
