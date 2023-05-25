import React from "react";
import EthereumBlueLogo from "../../assets/images/EthereumBlue.svg";
import polygonLogo from "../../assets/images/polyLogo.svg";
import { BsCheck } from "react-icons/bs";
import { switchNetwork } from "../../utils/switchNetwork";

interface ChainDropDownProps {
  chainId: number | undefined;
}

function ChainDropDown(props: ChainDropDownProps) {
  return (
    <div className="absolute dropdown top-[100%] rounded-lg w-[250px] left-[-460%] shadow-lg bg-[#fff] overflow-hidden">
      <button
        onClick={() => switchNetwork("GOERLI")}
        className="flex items-center justify-between py-[20px] px-[15px] hover:bg-[gainsboro] transition-colors w-full"
      >
        <div className="flex items-center gap-[10px]">
          <img src={EthereumBlueLogo} className="w-[30px]" />
          <p>Goerli Testnet</p>
        </div>
        {props.chainId === 5 && <BsCheck />}
      </button>
      <button
        onClick={() => switchNetwork("MUMBAI")}
        className="flex items-center justify-between py-[20px] px-[15px] hover:bg-[gainsboro] transition-colors w-full"
      >
        <div className="flex items-center gap-[10px]">
          <img src={polygonLogo} className="w-[15px] ml-[5px] mr-[8px]" />
          <p>Mumbai Testnet</p>
        </div>
        {props.chainId === 80001 && <BsCheck color="green" size={20} />}
      </button>
    </div>
  );
}

export default ChainDropDown;
