import React from "react";
import EthereumBlueLogo from "../../assets/images/EthereumBlue.svg";
import polygonLogo from "../../assets/images/polyLogo.svg";
import { BsCheck } from "react-icons/bs";

interface ChainDropDownProps {
  chainId: number | undefined;
}

function ChainDropDown(props: ChainDropDownProps) {
  return (
    <div className="absolute top-[100%] rounded-lg w-[250px] left-[-460%] shadow-lg bg-[#fff]">
      <div className="flex items-center justify-between py-[20px] px-[15px]">
        <div className="flex items-center gap-[10px]">
          <img src={EthereumBlueLogo} className="w-[30px]" />
          <p>Ethereum</p>
        </div>
        <BsCheck />
      </div>
      <div className="flex items-center justify-between py-[20px] px-[15px]">
        <div className="flex items-center gap-[10px]">
          <img src={polygonLogo} className="w-[15px] ml-[5px] mr-[8px]" />
          <p>Polygon</p>
        </div>
        <BsCheck />
      </div>
    </div>
  );
}

export default ChainDropDown;
