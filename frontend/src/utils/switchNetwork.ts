declare global {
  interface Window {
    ethereum: any;
  }
}

export async function switchNetwork(network: string) {
  const provider = window.ethereum;
  if (provider) {
    let params;
    let chainId;
    if (network === "ETH") {
      chainId = "0x1";
      params = [
        {
          chainId: chainId,
          chainName: "Ethereum Mainnet",
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: ["https://mainnet.infura.io/v3/your-infura-key"],
          blockExplorerUrls: ["https://etherscan.io/"],
        },
      ];
    } else if (network === "MATIC") {
      chainId = "0x89";
      params = [
        {
          chainId: chainId,
          chainName: "Polygon (Matic) Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mainnet.matic.network"],
          blockExplorerUrls: ["https://explorer.matic.network/"],
        },
      ];
    } else if (network === "GOERLI") {
      chainId = "0x5";
      params = [
        {
          chainId: chainId,
          chainName: "Goerli Testnet",
          nativeCurrency: {
            name: "GOERLI",
            symbol: "GLI",
            decimals: 18,
          },
          rpcUrls: ["https://goerli.infura.io/v3/your-infura-key"],
          blockExplorerUrls: ["https://goerli.etherscan.io/"],
        },
      ];
    } else if (network === "MUMBAI") {
      chainId = "0x13881";
      params = [
        {
          chainId: chainId,
          chainName: "Mumbai Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mumbai.matic.today"],
          blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
        },
      ];
    } else {
      console.error("network not supported");
      return;
    }

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if ((error as any).code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: params,
          });
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  } else {
    console.error("window.ethereum is not defined");
  }
}
