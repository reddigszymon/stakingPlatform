import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function ClaimRewardsScreen() {
  const { earned } = useSelector((state: RootState) => state.app);
  return (
    <div className="flex flex-col items-center justify-center gap-[20px] h-full">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-[42px]">
          {(earned / 10 ** 18).toFixed(4)}
        </h1>
        <p>Earned UNI tokens</p>
      </div>
      <p className="mb-[20px]">You can withdraw your earned rewards</p>
      <button className="w-full bg-[#FF007A] py-[10px] rounded-lg text-[#fff] font-medium text-[22px]">
        Claim
      </button>
    </div>
  );
}

export default ClaimRewardsScreen;
