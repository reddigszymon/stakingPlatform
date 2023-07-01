import React from "react";
import { displayErrorToast } from "../../../utils/toastErrorUtils";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useDispatch } from "react-redux";
import { setFinalScreenActive } from "../../../reducers/appReducer";

interface ButtonDepositProps {
  opacity: Number;
  text: string;
  // contractFunction: () => void;
}

function ButtonDeposit(props: ButtonDepositProps) {
  const dispatch = useDispatch();
  const { active, chainId } = useWeb3React<Web3Provider>();

  const handleClick = () => {
    if (!active) {
      displayErrorToast("Please connect your account first!");
      return;
    }
    if (chainId !== 80001 && chainId !== 5) {
      displayErrorToast("Please switch your chain to either Mumbai or Goerli!");
      return;
    }
    dispatch(setFinalScreenActive(props.text));
  };

  return (
    <button
      onClick={() => handleClick()}
      className={`rounded-xl bg-[#FF007A] bg-opacity-[${props.opacity}%] px-[10px] py-[5px] w-[100px] h-[50px] sm:w-[120px] md:w-[140px] md:h-[70px] md:px-[25px] md:py-[10px]`}
    >
      {props.text}
    </button>
  );
}

export default ButtonDeposit;
