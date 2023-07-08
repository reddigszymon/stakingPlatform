import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import ClaimRewardsScreen from "./ClaimRewardsScreen";
import WithdrawTokensScreen from "./WithdrawButton/WithdrawTokensScreen";
import DepositTokensScreen from "./DepositButton/DepositTokensScreen";
import { useDispatch } from "react-redux";
import { setFinalScreenActive } from "../../reducers/appReducer";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

function FinalScreen() {
  const dispatch = useDispatch();
  const { finalScreenActive } = useSelector((state: RootState) => state.app);

  const [isVisible, setIsVisible] = useState(false);
  const [transactionFinished, setTransactionFinished] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className=" w-full h-full flex items-center justify-center bg-[#050934] bg-opacity-[75%] fixed z-50">
      <div
        className={`bg-[white] w-[20%] h-[35%] min-h-[350px] ${
          finalScreenActive === "Withdraw tokens" ? "min-h-[320px]" : ""
        } min-w-[350px] p-[30px] border-2 max-w-[1200px] max-h-[800px] shadow-lg rounded-lg flex flex-col gap-[20px] justify-between
       transition-all duration-100 ease-in-out transform-gpu ${
         isVisible ? "scale-100" : "scale-[90%]"
       } 
      transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
      `}
      >
        <div className="flex flex-col gap-[30px] h-full">
          <div className="w-full flex items-center justify-between text-[24px] text-[#FF007A]">
            {finalScreenActive === "Claim Rewards" && !transactionFinished && (
              <p>Claim Rewards</p>
            )}
            {finalScreenActive === "Withdraw tokens" &&
              !transactionFinished && <p>Withdraw Tokens</p>}
            {finalScreenActive === "Deposit" && !transactionFinished && (
              <p>Deposit Tokens</p>
            )}
            <button
              onClick={() => {
                dispatch(setFinalScreenActive(""));
              }}
            >
              {!transactionFinished && <RxCross2 />}
            </button>
          </div>
          {finalScreenActive === "Claim Rewards" && (
            <ClaimRewardsScreen
              transactionFinished={transactionFinished}
              setTransactionFinished={setTransactionFinished}
            />
          )}
          {finalScreenActive === "Withdraw tokens" && (
            <WithdrawTokensScreen
              transactionFinished={transactionFinished}
              setTransactionFinished={setTransactionFinished}
            />
          )}
          {finalScreenActive === "Deposit" && (
            <DepositTokensScreen
              transactionFinished={transactionFinished}
              setTransactionFinished={setTransactionFinished}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FinalScreen;
