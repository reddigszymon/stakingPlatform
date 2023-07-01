import React from "react";
import metamaskLogo from "../../assets/images/metamask.svg";
import portis from "../../assets/images/portis.svg";
import walletConnect from "../../assets/images/walletConnect.svg";
import coinbaseWallet from "../../assets/images/coinbaseWallet.svg";
import WalletConnectDiv from "./WalletConnectDiv";

const wallets = [
  { name: "Metamask", logo: metamaskLogo },
  { name: "Portis", logo: portis },
  { name: "WalletConnect", logo: walletConnect },
  { name: "Coinbase Wallet", logo: coinbaseWallet },
];

function WalletConnectWrapper() {
  return (
    <div className="flex flex-col gap-[20px] w-full px-[20px] pt-[20px]">
      <h1 className="font-semibold">Connect to a wallet</h1>
      <div className="w-full font-semibold tracking-wide flex flex-col gap-[8px] items-center">
        {wallets.map((wallet) => (
          <WalletConnectDiv
            key={wallet.name}
            image={wallet.logo}
            text={wallet.name}
          />
        ))}
      </div>
    </div>
  );
}

export default WalletConnectWrapper;
