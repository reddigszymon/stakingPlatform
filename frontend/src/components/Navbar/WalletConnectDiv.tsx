import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { PortisConnector } from "@web3-react/portis-connector";

interface WalletConnectDivProps {
  image: string;
  text: string;
}

function WalletConnectDiv(props: WalletConnectDivProps) {
  const { activate } = useWeb3React<Web3Provider>();
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 13, 42, 56, 137],
  });

  const ethereum_provider =
    process.env.REACT_APP_ETH_PROVIDER === undefined
      ? ""
      : process.env.REACT_APP_ETH_PROVIDER;

  const polygon_provider =
    process.env.REACT_APP_POLYGON_PROVIDER === undefined
      ? ""
      : process.env.REACT_APP_POLYGON_PROVIDER;

  const RPC_URLS: { [chainId: number]: string } = {
    1: ethereum_provider,
    137: polygon_provider,
  };

  const coinbaseWalletConnector = new WalletLinkConnector({
    supportedChainIds: [1, 3, 4, 5, 13, 42, 56, 137],
    url:
      process.env.REACT_APP_MUMBAI_PROVIDER === undefined
        ? ""
        : process.env.REACT_APP_MUMBAI_PROVIDER,
    appName: "UNI-Staking APP",
  });

  const walletConnectConnector = new WalletConnectConnector({
    supportedChainIds: [1, 137],
    qrcode: true,
    rpc: RPC_URLS,
  });

  const portisConnector = new PortisConnector({
    dAppId:
      process.env.REACT_APP_PORTIS_DAPP_ID === undefined
        ? ""
        : process.env.REACT_APP_PORTIS_DAPP_ID,
    networks: [1, 137],
  });

  const connectWallet = async () => {
    try {
      if (props.text === "Metamask") {
        await activate(injectedConnector);
      } else if (props.text === "Coinbase Wallet") {
        await activate(coinbaseWalletConnector);
      } else if (props.text === "WalletConnect") {
        await activate(walletConnectConnector);
      } else if (props.text === "Portis") {
        await activate(portisConnector);
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="flex items-center gap-[10px] px-[25px] py-[15px] w-full bg-[#F5F6FC] hover:bg-[#ebebed] transition-all rounded-lg"
    >
      <img src={props.image} className="w-[40px] h-[40px]" />
      <p>{props.text}</p>
    </button>
  );
}

export default WalletConnectDiv;
