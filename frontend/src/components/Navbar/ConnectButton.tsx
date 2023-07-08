import React, { useState, useEffect } from "react";
import ethLogo from "../../assets/images/ethLogo.svg";
import polygonLogo from "../../assets/images/polygonLogo.svg";
import chevronDown from "../../assets/images/chevronDown.svg";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import blockies from "ethereum-blockies-base64";
import { BiError } from "react-icons/bi";
import ChainDropDown from "./ChainDropDown";
import { useDispatch } from "react-redux";
import { setAccountWindowActive } from "../../reducers/appReducer";
import useWalletConnectors from "../../utils/useWalletConnectors";

const ETHEREUM_ID = 5;
const POLYGON_ID = 80001;

interface ConnectButtonProps {
  togglePanel: () => void;
}

function ConnectButton(props: ConnectButtonProps) {
  const dispatch = useDispatch();
  const { active, account, chainId } = useWeb3React<Web3Provider>();
  const avatar = account ? blockies(account) : "";
  const [dropDownActive, setDropDownActive] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const { activate } = useWeb3React<Web3Provider>();
  const { injectedConnector } = useWalletConnectors();

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

  useEffect(() => {
    const savedAccount = localStorage.getItem("ethereumAccount");

    if (savedAccount) {
      activate(injectedConnector, undefined, true).catch((error) => {
        console.log("Failed to activate after reload", error);
      });
    }
  }, [activate, injectedConnector]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // No account is connected
          setUpdateState((prev) => !prev);
          // Remove from localStorage
          localStorage.removeItem("ethereumAccount");
        } else {
          // Save account to localStorage
          localStorage.setItem("ethereumAccount", accounts[0]);
        }
      };

      const handleDisconnect = () => {
        // Remove from localStorage
        localStorage.removeItem("ethereumAccount");
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("disconnect", handleDisconnect);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("disconnect", handleDisconnect);
      };
    }
  }, [account, active]);

  return (
    <div className="flex items-center gap-[10px] sm500:gap-[30px]">
      {active && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            setDropDownActive((prev) => !prev);
          }}
          className="flex relative items-center gap-[8px] hover:bg-[black] hover:bg-opacity-[5%] py-[10px] px-[5px] rounded-md transition-all"
        >
          {chainId === ETHEREUM_ID && (
            <img src={ethLogo} alt="Ethereum Logo" className="w-[25px]" />
          )}
          {chainId === POLYGON_ID && (
            <img src={polygonLogo} alt="Polygon Logo" className="w-[20px]" />
          )}
          {chainId !== POLYGON_ID && chainId !== ETHEREUM_ID && (
            <BiError size={20} color="gray" />
          )}
          <img src={chevronDown} alt="Chevron Down" className="w-[10px]" />
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
          onClick={() => dispatch(setAccountWindowActive(true))}
          className="bg-[#F5F6FC]  text-opacity-[90%] py-[8px] px-[12px] rounded-2xl font-bold flex items-center gap-[10px]"
        >
          <img
            src={avatar}
            alt="avatar"
            className="rounded-full w-[30px] h-[30px] sm:ml-2"
          />
          {window.innerWidth <= 500
            ? account?.slice(0, 4) + "..." + account?.slice(39, 42)
            : account?.slice(0, 6) + "..." + account?.slice(38, 42)}
        </button>
      )}
    </div>
  );
}

export default ConnectButton;
