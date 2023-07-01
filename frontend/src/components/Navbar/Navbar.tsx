import React from "react";
import uniLogo from "../../assets/images/uniLogo.svg";
import ConnectButton from "./ConnectButton";
import { useDispatch } from "react-redux";
import { setDepositActive } from "../../reducers/appReducer";

interface NavbarProps {
  togglePanel: () => void;
}

function Navbar(props: NavbarProps) {
  const dispatch = useDispatch();
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center p-[20px]">
      <button
        onClick={() => dispatch(setDepositActive(false))}
        className="flex items-center gap-[10px] cursor-pointer mb-[10px]"
      >
        <img src={uniLogo} alt="Uniswap Logo" className="w-[40px]" />
        <h1 className="font-bold text-[#FF007A] text-[18px] mt-[10px] hidden sm500:block">
          UNI-Stake
        </h1>
      </button>
      <ConnectButton togglePanel={props.togglePanel} />
    </nav>
  );
}

export default Navbar;
