import React, { useState, useEffect } from "react";
import ethLogo from "../../assets/images/ethLogo.svg";
import polygonLogo from "../../assets/images/polygonLogo.svg";
import chevronDown from "../../assets/images/chevronDown.svg";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import blockies from "ethereum-blockies-base64";
import { BiError } from "react-icons/bi";
import ChainDropDown from "./ChainDropDown";

interface ConnectButtonProps {
  togglePanel: () => void;
  setAccountWindowActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConnectButton(props: ConnectButtonProps) {
  const { active, account, chainId } = useWeb3React<Web3Provider>();
  const avatar = account ? blockies(account) : "";
  const [dropDownActive, setDropDownActive] = useState(false);

  useEffect(() => {
    if (dropDownActive) {
      const closeDropdown = (event: MouseEvent) => {
        if (!(event.target as Element).closest(".dropdown")) {
          setDropDownActive(false);
        }
      };
      document.addEventListener("click", closeDropdown);
      return () => document.removeEventListener("click", closeDropdown);
    }
  }, [dropDownActive]);

  return (
    <div className="flex items-center gap-[30px]">
      {active && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            setDropDownActive((prev) => !prev);
          }}
          className="flex relative items-center gap-[8px] hover:bg-[black] hover:bg-opacity-[5%] py-[10px] px-[5px] rounded-md transition-all"
        >
          {chainId === 5 && <img src={ethLogo} className="w-[25px]" />}
          {chainId === 80001 && <img src={polygonLogo} className="w-[20px]" />}
          {chainId !== 80001 && chainId !== 5 && (
            <BiError size={20} color="gray" />
          )}
          <img src={chevronDown} className="w-[10px]" />
          {dropDownActive && active && <ChainDropDown chainId={chainId} />}
        </button>
      )}
      {!active && (
        <button
          className="bg-[#FF007A] text-[#FF007A] text-opacity-[90%] bg-opacity-[25%] py-[10px] px-[20px] rounded-2xl font-bold"
          onClick={props.togglePanel}
        >
          Connect
        </button>
      )}
      {active && (
        <button
          onClick={() => props.setAccountWindowActive(true)}
          className="bg-[#F5F6FC]  text-opacity-[90%]  py-[8px] px-[12px] rounded-2xl font-bold flex items-center gap-[10px]"
        >
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full w-[30px] h-[30px] ml-2"
          />
          {account?.slice(0, 6) + "..." + account?.slice(38, 42)}
        </button>
      )}
    </div>
  );
}

export default ConnectButton;
