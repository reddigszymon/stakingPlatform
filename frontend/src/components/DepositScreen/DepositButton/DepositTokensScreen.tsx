import React, { useState } from "react";
import uniToken from "../../../assets/images/uniToken.svg";
import { depositTokens } from "../../../utils/depositTokens";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { approveTokens } from "../../../utils/approveTokens";
import ClipLoader from "react-spinners/ClipLoader";
import TransactionFinished from "./TransactionFinished";

interface DepositTokensScreenProps {
  availableBalance: number | undefined;
  transactionFinished: boolean;
  setFinalScreenActive: React.Dispatch<React.SetStateAction<string>>;
  setTransactionFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

function DepositTokensScreen(props: DepositTokensScreenProps) {
  const { active, chainId, account } = useWeb3React<Web3Provider>();

  const [inputValue, setInputValue] = useState<string>("");
  const [transactionActive, setTransactionActive] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleDeposit = async () => {
    if (
      props.availableBalance !== undefined &&
      parseFloat(inputValue) > 0 &&
      parseFloat(inputValue) <=
        parseFloat((props.availableBalance / 10 ** 18).toFixed(2))
    ) {
      setTransactionActive(true);
      try {
        await approveTokens(chainId, inputValue);
        const hash = await depositTokens(active, chainId, inputValue);
        setTxHash(hash);
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
                Available to deposit:{" "}
                <span>
                  {props.availableBalance === undefined
                    ? "0.00"
                    : (props.availableBalance / 10 ** 18).toFixed(2)}
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
                      props.availableBalance === undefined
                        ? "0.00"
                        : (props.availableBalance / 10 ** 18).toFixed(2)
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
              onClick={() => handleDeposit()}
              className={`py-[10px] ${
                props.availableBalance !== undefined &&
                parseFloat(inputValue) > 0 &&
                parseFloat(inputValue) <=
                  parseFloat((props.availableBalance / 10 ** 18).toFixed(2))
                  ? "bg-[#FF007A]"
                  : "bg-[gray]"
              }  text-[#fff] opacity-90 w-full rounded-lg font-bold tracking-wide`}
            >
              Deposit
            </button>
          </div>
        </div>
      )}
      {transactionActive && !props.transactionFinished && (
        <div className="w-full h-full flex items-center justify-center">
          <ClipLoader color="#a8bcb8" size={80} />
        </div>
      )}
      {props.transactionFinished && !transactionActive && (
        <TransactionFinished
          hash={txHash}
          setFinalScreenActive={props.setFinalScreenActive}
        />
      )}
    </>
  );
}

export default DepositTokensScreen;
