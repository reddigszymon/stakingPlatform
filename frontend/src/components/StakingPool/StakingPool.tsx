import React from "react";
import uniToken from "../../assets/images/uniToken.svg";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { mintTokens } from "../../utils/mintTokens";

interface StakingPoolInterface {
  setDepositActive: React.Dispatch<React.SetStateAction<boolean>>;
  totalDeposited: number | undefined;
}

function StakingPool(props: StakingPoolInterface) {
  const { account, active, chainId } = useWeb3React<Web3Provider>();
  const poolData = {
    name: "UNI Staking Pool",
    endTime: "330:23:43:15",
    tokenImage: uniToken,
    tokenName: "UNI",
    totalDeposited:
      props.totalDeposited === undefined
        ? 0
        : (props.totalDeposited / 10 ** 18).toFixed(2) + " / 20.00 M UNI",
    poolRate: "42%",
  };

  return (
    <div className="flex w-[90%] max-w-[600px] lg:max-w-[700px] flex-col gap-[5px] font-bold z-[-1] md:z-[10] ">
      <div className="flex justify-between items-center text-[#A8A8A8]">
        <h1 className="text-[20px] mr-[10px]">{poolData.name}</h1>
        <p className="">Rewards end in {poolData.endTime}</p>
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
            onClick={() => props.setDepositActive(true)}
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
