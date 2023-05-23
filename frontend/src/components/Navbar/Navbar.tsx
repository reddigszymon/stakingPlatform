import React from "react";
import uniLogo from "../../assets/images/uniLogo.svg";
import ConnectButton from "./ConnectButton";

interface NavbarProps {
  togglePanel: () => void;
  setDepositActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar(props: NavbarProps) {
  return (
    <div className="fixed top-0 w-full flex justify-between items-center p-[20px]">
      <button
        onClick={() => props.setDepositActive(false)}
        className="flex items-center gap-[10px] cursor-pointer mb-[10px]"
      >
        <img src={uniLogo} className="w-[40px]" />
        <h1 className="font-bold text-[#FF007A] text-[18px] mt-[10px]">
          UNI-Stake
        </h1>
      </button>
      <ConnectButton togglePanel={props.togglePanel} />
    </div>
  );
}

export default Navbar;
