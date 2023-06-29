import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import ClaimRewardsScreen from "./ClaimRewardsScreen";
import WithdrawTokensScreen from "./WithdrawTokensScreen";
import DepositTokensScreen from "./DepositTokensScreen";

interface FinalScreenProps {
  setFinalScreenActive: React.Dispatch<React.SetStateAction<string>>;
  finalScreenActive: string;
}

function FinalScreen(props: FinalScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className=" w-full h-full flex items-center justify-center bg-[#050934] bg-opacity-[75%] fixed z-50">
      <div
        className={`bg-[white] w-[20%] h-[35%] min-h-[350px] ${
          props.finalScreenActive === "Withdraw tokens" ? "min-h-[320px]" : ""
        } min-w-[350px] p-[30px] border-2 max-w-[1200px] max-h-[800px] shadow-lg rounded-lg flex flex-col gap-[20px] justify-between
       transition-all duration-100 ease-in-out transform-gpu ${
         isVisible ? "scale-100" : "scale-[90%]"
       } 
      transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
      `}
      >
        <div className="flex flex-col gap-[30px] h-full">
          <div className="w-full flex items-center justify-between text-[24px] text-[#FF007A]">
            {props.finalScreenActive === "Claim Rewards" && (
              <p>Claim Rewards</p>
            )}
            {props.finalScreenActive === "Withdraw tokens" && (
              <p>Withdraw Tokens</p>
            )}
            {props.finalScreenActive === "Deposit" && <p>Deposit Tokens</p>}
            <button
              onClick={() => {
                props.setFinalScreenActive("");
              }}
            >
              <RxCross2 />
            </button>
          </div>
          {props.finalScreenActive === "Claim Rewards" && (
            <ClaimRewardsScreen />
          )}
          {props.finalScreenActive === "Withdraw tokens" && (
            <WithdrawTokensScreen />
          )}
          {props.finalScreenActive === "Deposit" && <DepositTokensScreen />}
        </div>
      </div>
    </div>
  );
}

export default FinalScreen;
