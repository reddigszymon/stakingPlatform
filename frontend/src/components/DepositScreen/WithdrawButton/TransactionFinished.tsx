import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { redirectToTransaction } from "../../../utils/redirectToTransaction";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useDispatch } from "react-redux";
import { setFinalScreenActive } from "../../../reducers/appReducer";
interface TransactionFinished {
  hash: string;
}

function TransactionFinished(props: TransactionFinished) {
  const dispatch = useDispatch();
  const { chainId } = useWeb3React<Web3Provider>();

  return (
    <div className="flex w-full flex-col gap-[10px] items-center justify-between h-full">
      <div className="flex items-center justify-center gap-[10px] flex-col">
        <IoMdCheckmarkCircleOutline size={70} color="green" />
        <p className="font-bold text-[20px]">Transaction Successful!</p>
      </div>
      <div className="w-full flex flex-col gap-[10px]">
        <button
          onClick={() => dispatch(setFinalScreenActive(""))}
          className="bg-[seagreen] w-full rounded-lg py-[10px] font-bold"
        >
          Close Window
        </button>
        <button
          onClick={() => redirectToTransaction(chainId, props.hash)}
          className="border-[2px] w-full rounded-lg py-[10px] font-bold"
        >
          View Transaction
        </button>
      </div>
    </div>
  );
}

export default TransactionFinished;
