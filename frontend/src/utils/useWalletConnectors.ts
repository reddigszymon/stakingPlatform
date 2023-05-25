// hooks/useWalletConnectors.ts
import { useMemo } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { PortisConnector } from "@web3-react/portis-connector";

export default function useWalletConnectors() {
  const injectedConnector = useMemo(() => new InjectedConnector({}), []);

  const RPC_URLS: { [chainId: number]: string } = useMemo(
    () => ({
      1: process.env.REACT_APP_ETH_PROVIDER || "",
      137: process.env.REACT_APP_POLYGON_PROVIDER || "",
    }),
    []
  );

  const coinbaseWalletConnector = useMemo(
    () =>
      new WalletLinkConnector({
        url: process.env.REACT_APP_MUMBAI_PROVIDER || "",
        appName: "UNI-Staking APP",
      }),
    []
  );

  const walletConnectConnector = useMemo(
    () =>
      new WalletConnectConnector({
        qrcode: true,
        rpc: RPC_URLS,
      }),
    [RPC_URLS]
  );

  const portisConnector = useMemo(
    () =>
      new PortisConnector({
        dAppId: process.env.REACT_APP_PORTIS_DAPP_ID || "",
        networks: [1, 137],
      }),
    []
  );

  return {
    injectedConnector,
    coinbaseWalletConnector,
    walletConnectConnector,
    portisConnector,
  };
}
