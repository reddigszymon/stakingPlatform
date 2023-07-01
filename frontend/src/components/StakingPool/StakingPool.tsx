import React, { useState, useEffect } from "react";
import uniToken from "../../assets/images/uniToken.svg";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { mintTokens } from "../../utils/mintTokens";
import { useDispatch } from "react-redux";
import {
  setDepositActive,
  setCountdown,
  decrementCountdown,
} from "../../reducers/appReducer";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatNumber";
import { formatTime } from "../../utils/formatTime";
import { displayErrorToast } from "../../utils/toastErrorUtils";

function StakingPool() {
  const dispatch = useDispatch();

  const { totalDeposited, poolLimit, timeLeft, apr } = useSelector(
    (state: RootState) => state.app
  );

  const { account, active, chainId } = useWeb3React<Web3Provider>();

  // Load end time from local storage or use current time + timeLeft
  let endTime = localStorage.getItem("endTime");
  if (!endTime || Number(endTime) < Date.now()) {
    endTime = String(Date.now() + (timeLeft ?? 0) * 1000);
    localStorage.setItem("endTime", endTime);
  }

  // Calculate countdown from end time
  const countdown = Math.max(
    0,
    Math.floor((Number(endTime) - Date.now()) / 1000)
  );

  const totalDepositedFormatted =
    totalDeposited !== undefined ? formatNumber(totalDeposited) : "0";
  const poolLimitFormatted =
    poolLimit !== undefined ? formatNumber(poolLimit) : "0";

  useEffect(() => {
    dispatch(setCountdown(countdown));
    const timer = setInterval(() => {
      dispatch(decrementCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, dispatch]);

  const poolData = {
    name: "UNI Staking Pool",
    endTime: formatTime(countdown),
    tokenImage: uniToken,
    tokenName: "UNI",
    totalDeposited:
      totalDeposited === undefined || poolLimit === undefined
        ? "0"
        : `${totalDepositedFormatted} / ${poolLimitFormatted} UNI`,
    poolRate: `${apr === undefined ? 0 : (apr / 10 ** 18).toFixed(2)}%`,
  };

  const handleDepositButton = () => {
    if (!active) {
      displayErrorToast("Please connect your wallet!");
      return;
    }
    dispatch(setDepositActive(true));
  };

  return (
    <div className="flex w-[90%] max-w-[600px] lg:max-w-[700px] flex-col gap-[5px] font-bold z-[-1] md:z-[10] ">
      <div className="flex justify-between items-center text-[#A8A8A8]">
        <h1 className="text-[20px] mr-[10px]">{poolData.name}</h1>
        <p className="">
          Rewards end in {countdown === 0 ? "00:00:00" : poolData.endTime}
        </p>
      </div>

      <div className="w-full h-[180px] lg:h-[230px] rounded-2xl bg-[#FBEBF7] p-[15px] lg:p-[20px] shadow-lg flex flex-col gap-[10px] items-center justify-between">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-[10px] items-center">
            <img
              src={poolData.tokenImage}
              alt={poolData.tokenName}
              className="w-[40px] h-[40px] lg:h-[60px] lg:w-[60px]"
            />
            <p className="text-[18px] lg:text-[22px]">{poolData.tokenName}</p>
          </div>
          <button
            onClick={() => handleDepositButton()}
            className="bg-[#FF007A] text-[#FF007A] text-opacity-[90%] cursor-pointer bg-opacity-[25%] py-[10px] lg:py-[15px] px-[20px] lg:px-[25px] rounded-2xl font-bold text-[18px]"
          >
            Deposit
          </button>
        </div>
        <div className="w-full flex justify-between items-center lg:text-[18px]">
          <p>Total deposited</p>
          <p className="text-[#FF007A]">{poolData.totalDeposited}</p>
        </div>
        <div className="w-full flex justify-between items-center lg:text-[18px]">
          <p>Pool rate</p>
          <p className="text-[#FF007A]">{poolData.poolRate}</p>
        </div>
      </div>
      <p className="lg:text-[18px] mt-[5px]">
        Mint {poolData.tokenName} Tokens for testing by clicking{" "}
        <button
          onClick={() => mintTokens(account, active, chainId)}
          className="text-blue-600 cursor-pointer"
        >
          here
        </button>
      </p>
    </div>
  );
}

export default StakingPool;
