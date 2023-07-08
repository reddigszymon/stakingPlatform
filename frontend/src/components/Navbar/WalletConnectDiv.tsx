import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useWalletConnectors from "../../utils/useWalletConnectors";
import { useDispatch } from "react-redux";
import { setPanelVisible } from "../../reducers/appReducer";

interface WalletConnectDivProps {
  image: string;
  text: string;
}

function WalletConnectDiv(props: WalletConnectDivProps) {
  const dispatch = useDispatch();
  const connectors = useWalletConnectors();
  const { activate, account } = useWeb3React<Web3Provider>();

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
        dispatch(setPanelVisible(false));
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  useEffect(() => {
    if (account) {
      localStorage.setItem("ethereumAccount", account);
    } else {
      localStorage.removeItem("ethereumAccount");
    }
  }, [account]);

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
