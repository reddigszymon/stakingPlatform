import React from "react";
import EthereumBlueLogo from "../../assets/images/EthereumBlue.svg";
import polygonLogo from "../../assets/images/polyLogo.svg";
import { switchNetwork } from "../../utils/switchNetwork";
import ChainButton from "./ChainButton";

interface ChainDropDownProps {
  chainId: number | undefined;
}

function ChainDropDown(props: ChainDropDownProps) {
  return (
    <div className="absolute dropdown top-[100%] rounded-lg w-[250px] left-[-150%] sm:left-[-460%] shadow-lg bg-[#fff] overflow-hidden">
      <ChainButton
        chainId={5}
        currentChainId={props.chainId}
        chainName="Goerli Testnet"
        logo={EthereumBlueLogo}
        onClickFunction={switchNetwork}
      />

      <ChainButton
        chainId={80001}
        currentChainId={props.chainId}
        chainName="Mumbai Testnet"
        logo={polygonLogo}
        onClickFunction={switchNetwork}
      />
    </div>
  );
}

export default ChainDropDown;
