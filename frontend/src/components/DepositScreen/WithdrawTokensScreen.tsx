import React from "react";
import uniToken from "../../assets/images/uniToken.svg";

function WithdrawTokensScreen() {
  return (
    <div className="flex justify-between flex-col items-center h-full">
      <div className="p-[15px] border-[1px] rounded-lg flex flex-col items-center justify-between w-full gap-[5px]">
        <div className="w-full flex justify-end items-center">
          <p className="text-[13px]">Available to withdraw: 0.079</p>
        </div>
        <div className="flex w-full justify-between items-center">
          <input
            className="font-semibold text-[36px] opacity-70 w-[150px] outline-none"
            placeholder="0.0"
          />
          <div className="flex items-center gap-[10px]">
            <button className="px-[10px] py-[5px] bg-[#FF007A] rounded-lg text-[#ffff] font-bold tracking-wider text-[14px]">
              MAX
            </button>
            <img src={uniToken} alt="Uni Token" className="w-[30px] h-[30px]" />
            <p className="font-bold tracking-wide">UNI</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <button className="py-[10px] bg-[gray] text-[#fff] opacity-90 w-full rounded-lg font-bold tracking-wide">
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default WithdrawTokensScreen;
