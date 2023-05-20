import React from "react";
import metamaskLogo from "../../assets/images/metamask.svg";
import portis from "../../assets/images/portis.svg";
import walletConnect from "../../assets/images/walletConnect.svg";
import coinbaseWallet from "../../assets/images/coinbaseWallet.svg";
import WalletConnectDiv from "./WalletConnectDiv";

function WalletConnectWrapper() {
  return (
    <div className="flex flex-col gap-[20px] w-full px-[20px] pt-[20px]">
      <h1 className="font-semibold">Connect to a wallet</h1>
      <div className="w-full font-semibold tracking-wide flex flex-col gap-[8px] items-center">
        <WalletConnectDiv image={metamaskLogo} text="Metamask" />
        <WalletConnectDiv image={portis} text="Portis" />
        <WalletConnectDiv image={walletConnect} text="WalletConnect" />
        <WalletConnectDiv image={coinbaseWallet} text="Coinbase Wallet" />
      </div>
    </div>
  );
}

export default WalletConnectWrapper;
