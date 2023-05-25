import React from "react";
import metamaskLogo from "../../assets/images/metamask.svg";
import portis from "../../assets/images/portis.svg";
import walletConnect from "../../assets/images/walletConnect.svg";
import coinbaseWallet from "../../assets/images/coinbaseWallet.svg";
import WalletConnectDiv from "./WalletConnectDiv";

interface WalletConnectWrapperProps {
  setPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function WalletConnectWrapper(props: WalletConnectWrapperProps) {
  return (
    <div className="flex flex-col gap-[20px] w-full px-[20px] pt-[20px]">
      <h1 className="font-semibold">Connect to a wallet</h1>
      <div className="w-full font-semibold tracking-wide flex flex-col gap-[8px] items-center">
        <WalletConnectDiv
          image={metamaskLogo}
          text="Metamask"
          setPanelVisible={props.setPanelVisible}
        />
        <WalletConnectDiv
          image={portis}
          text="Portis"
          setPanelVisible={props.setPanelVisible}
        />
        <WalletConnectDiv
          image={walletConnect}
          text="WalletConnect"
          setPanelVisible={props.setPanelVisible}
        />
        <WalletConnectDiv
          image={coinbaseWallet}
          text="Coinbase Wallet"
          setPanelVisible={props.setPanelVisible}
        />
      </div>
    </div>
  );
}

export default WalletConnectWrapper;
