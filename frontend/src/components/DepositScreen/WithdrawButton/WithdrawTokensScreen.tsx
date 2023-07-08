import React, { useState } from "react";
import uniToken from "../../../assets/images/uniToken.svg";
import { withdrawTokens } from "../../../utils/withdrawTokens";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import ClipLoader from "react-spinners/ClipLoader";
import TransactionFinished from "./TransactionFinished";
import { RootState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { updateInfo } from "../../../utils/updateInfo";

interface DepositTokensScreenProps {
  transactionFinished: boolean;
  setTransactionFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

function WithdrawTokensScreen(props: DepositTokensScreenProps) {
  const { userDeposit } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const { active, chainId, account } = useWeb3React<Web3Provider>();

  const [inputValue, setInputValue] = useState<string>("");
  const [transactionActive, setTransactionActive] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleWithdraw = async () => {
    if (
      userDeposit !== undefined &&
      parseFloat(inputValue) > 0 &&
      parseFloat(inputValue) <=
        parseFloat((Math.floor(userDeposit / 10 ** 16) / 100).toFixed(2))
    ) {
      setTransactionActive(true);
      try {
        const hash = await withdrawTokens(active, chainId, inputValue);
        setTxHash(hash);
        await updateInfo(dispatch, chainId, active, account);
        props.setTransactionFinished(true);
        setTransactionActive(false);
      } catch (error) {
        setTransactionActive(false);
        console.error("Transaction error:", error);
      }
    }
  };

  return (
    <>
      {!transactionActive && !props.transactionFinished && (
        <div className="flex justify-between flex-col items-center h-full">
          <div className="p-[15px] border-[1px] rounded-lg flex flex-col items-center justify-between w-full gap-[5px]">
            <div className="w-full flex justify-end items-center">
              <p className="text-[13px]">
                Available to withdraw:{" "}
                <span>
                  {userDeposit === undefined
                    ? "0.00"
                    : (Math.floor(userDeposit / 10 ** 16) / 100).toFixed(2)}
                </span>
              </p>
            </div>
            <div className="flex w-full justify-between items-center">
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^(\d+)?([.]?\d{0,2})?$/.test(value)) {
                    // Regular expression checks if input only contains digits and up to 2 decimal places
                    setInputValue(value);
                  }
                }}
                className="font-semibold text-[36px] opacity-70 w-[45%] max-w-[180px] outline-none"
                placeholder="0.0"
                value={inputValue}
              />
              <div className="flex items-center gap-[10px]">
                <button
                  onClick={() =>
                    setInputValue(
                      userDeposit === undefined
                        ? "0.00"
                        : (Math.floor(userDeposit / 10 ** 16) / 100).toFixed(2)
                    )
                  }
                  className="px-[10px] py-[5px] bg-[#FF007A] rounded-lg text-[#ffff] font-bold tracking-wider text-[14px]"
                >
                  MAX
                </button>
                <img
                  src={uniToken}
                  alt="Uni Token"
                  className="w-[30px] h-[30px]"
                />
                <p className="font-bold tracking-wide">UNI</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <button
              onClick={() => handleWithdraw()}
              className={`py-[10px] ${
                userDeposit !== undefined &&
                parseFloat(inputValue) > 0 &&
                parseFloat(inputValue) <=
                  parseFloat(
                    (Math.floor(userDeposit / 10 ** 16) / 100).toFixed(2)
                  )
                  ? "bg-[#FF007A]"
                  : "bg-[gray]"
              }  text-[#fff] opacity-90 w-full rounded-lg font-bold tracking-wide`}
            >
              Withdraw
            </button>
          </div>
        </div>
      )}
      {transactionActive && !props.transactionFinished && (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <div className="mb-[40px]">
            <ClipLoader color="#a8bcb8" size={90} />
          </div>
          <div className="flex flex-col gap-[5px] items-center">
            <p>Transaction is pending...</p>
            <p>Please do not close this window</p>
          </div>
        </div>
      )}
      {props.transactionFinished && !transactionActive && (
        <TransactionFinished hash={txHash} />
      )}
    </>
  );
}

export default WithdrawTokensScreen;
