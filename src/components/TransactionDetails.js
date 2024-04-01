import React from "react";
import { format } from "date-fns";

function TransactionDetails({ Member }) {
  return (
    <div>
      <div className="w-full h-20 border mb-3 ps-1 rounded-lg shadow ">
        <div className=" ps-5 text-xl text-center">
          <span className="text-zinc-800 font-bold">{Member.name}</span>
        </div>

        <div className=" flex items-center justify-between">
          <div className="h-10 text-base  w-52 flex flex-col  items-center">
            <span className="font-bold">Payment Date</span>
            <span className="text-zinc-800">
              {format(new Date(Member.paymentdate), "dd-MM-yyyy")}
            </span>
          </div>

          <div className="h-10  md:mt-0 text-base  w-28 flex flex-col items-center ">
            <span className="font-bold">Amount</span>
            <span className="text-zinc-800">{Member.paidamount}</span>
          </div>

          <div className="h-10  md:mt-0 text-base  w-12 flex flex-col ps-5 items-center">
            <span className="font-bold">Dues</span>
            <span className="text-zinc-800">{Member.dues}</span>
          </div>

          <div className="h-10 text-base md:mt-0 w-40 flex flex-col ps-5 items-center">
            <span className="font-bold">Method</span>
            <span className="text-zinc-800">{Member.paymentmethod}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
