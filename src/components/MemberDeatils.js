import React from "react";
import { useNavigate } from "react-router-dom";
import { useMemberContext } from "../hooks/useMemberContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReadMoreRoundedIcon from "@mui/icons-material/ReadMoreRounded";

function MemberDeatils({ Member }) {
  const { dispatch } = useMemberContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${Member.name}?`
    );
    if (confirmDelete) {
      const response = await fetch("api/member/" + Member._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_MEMBER", payload: json });
      }
    }
  };
  const showdetail = (value) => {
    navigate("/memberdetail", { state: value });
  };
  const editClick = (value) => {
    navigate("/editmember", { state: Member });
  };
  const imageUrl = `/uploads/${Member.img}`;

  return (
    <div className="">
      <div className="w-full h-16 p-4 rounded-lg shadow border flex items-center justify-between mb-2">
        

        <div className="h-10 text-xl font-bold ">
        <div className=" w-full flex justify-center">
          <div class="w-10 h-10 rounded-full overflow-hidden border ">
            <img class="w-full h-full object-cover" src={imageUrl} alt="" />
          </div>
        </div>
        </div>
        <div className="h-10 text-xl ps-5 font-bold w-32">
          <span className="text-zinc-800">{Member.name}</span>
        </div>

        <div className="h-10 text-lg hidden lg:block w-32  font-semibold">
          <span className="text-zinc-800">{Member.phone}</span>
        </div>

        <div className="h-10 text-lg  w-36 hidden lg:block font-semibold">
          <span className="text-zinc-800">{Member.email}</span>
        </div>

        <div className="flex items-center pr-5 md:justify-end">
          <div className="h-10 text-lg  ">
            <DriveFileRenameOutlineRoundedIcon onClick={editClick} />
          </div>

          <div className="h-10 text-lg ps-2 lg:ps-4">
            <DeleteRoundedIcon onClick={handleDelete} />
          </div>
          <div className="h-10 text-lg ps-2 lg:ps-4">
            <ReadMoreRoundedIcon onClick={() => showdetail(Member._id)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDeatils;
