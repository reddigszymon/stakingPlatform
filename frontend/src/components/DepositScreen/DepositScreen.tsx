import React from "react";
import uniToken from "../../assets/images/uniToken.svg";

function DepositScreen() {
  return (
    <div className="flex w-[90%] max-w-[600px] lg:max-w-[700px] flex-col gap-[5px] font-bold z-[-1] md:z-[10] text-[12px] sm:text-[16px] md:text-[18px]">
      <div className="flex w-full justify-between items-center mb-[10px]">
        <p className="text-[#A8A8A8] text-[22px]">UNI Staking</p>
        <img src={uniToken} />
      </div>
      <div className="flex w-full justify-between items-center mb-[15px]">
        <div className="w-[45%] px-[15px] py-[10px] bg-[#FCE9F7] flex flex-col gap-[5px] rounded-md">
          <p>Total deposits</p>
          <div className="flex w-full justify-between items-center">
            <p>5.79 M / 20.00 M</p>
            <p>UNI</p>
          </div>
        </div>
        <div className="w-[45%] px-[15px] py-[10px] bg-[#FCE9F7] flex flex-col gap-[5px] rounded-md">
          <p>Annual Percentage Rate</p>
          <p>42%</p>
        </div>
      </div>
      <div>
        <div className="w-full bg-[#FADCF2] px-[15px] py-[10px] rounded-t-md">
          <p className="mb-[10px]">Your UNI deposits</p>
          <div className="flex w-full justify-between items-center">
            <p>0.00000</p>
            <p>UNI</p>
          </div>
        </div>
        <div className="w-full bg-[#DFD8DD] px-[15px] py-[10px] rounded-b-md opacity-[75%]">
          <p className="mb-[10px] opacity-[50%]">Your earned UNI</p>
          <div className="flex w-full justify-between items-center opacity-[50%]">
            <p>0.00000</p>
            <p>UNI</p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-[15px] mt-[25px] text-[12px] sm:text-[14px] md:text-[16px]">
        <button className="rounded-xl bg-[#FF007A] bg-opacity-[25%] px-[10px] py-[5px] w-[100px] h-[50px] sm:w-[120px] md:w-[140px] md:h-[70px] md:px-[25px] md:py-[10px]">
          Claim rewards
        </button>
        <button className="rounded-xl bg-[#FF007A] bg-opacity-[50%] px-[10px] py-[5px] w-[100px] h-[50px] sm:w-[120px] md:w-[140px] md:h-[70px]  md:px-[25px] md:py-[10px]">
          Initialize withdrawal
        </button>
        <button className="rounded-xl bg-[#FF007A] bg-opacity-[75%] px-[10px] py-[5px] w-[100px] h-[50px] sm:w-[120px] md:w-[140px] md:h-[70px] md:px-[25px] md:py-[10px]">
          Deposit
        </button>
      </div>
    </div>
  );
}

export default DepositScreen;
