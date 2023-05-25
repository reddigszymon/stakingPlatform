import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useWalletConnectors from "../../utils/useWalletConnectors";

interface WalletConnectDivProps {
  image: string;
  text: string;
  setPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function WalletConnectDiv(props: WalletConnectDivProps) {
  const connectors = useWalletConnectors();
  const { activate } = useWeb3React<Web3Provider>();

  const connectWallet = async () => {
    try {
      let connector;
      if (props.text === "Metamask") {
        connector = connectors.injectedConnector;
      } else if (props.text === "Coinbase Wallet") {
        connector = connectors.coinbaseWalletConnector;
      } else if (props.text === "WalletConnect") {
        connector = connectors.walletConnectConnector;
      } else if (props.text === "Portis") {
        connector = connectors.portisConnector;
      }

      if (connector) {
        await activate(connector);
        props.setPanelVisible(false);
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  return (
    <button
      type="button"
      onClick={connectWallet}
      className="flex items-center gap-[10px] px-[25px] py-[15px] w-full bg-[#F5F6FC] hover:bg-[#ebebed] transition-all rounded-lg"
    >
      <img src={props.image} alt="Wallet Logo" className="w-[40px] h-[40px]" />
      <p>{props.text}</p>
    </button>
  );
}

export default WalletConnectDiv;
