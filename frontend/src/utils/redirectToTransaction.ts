export const redirectToTransaction = (
  chainId: number | undefined,
  txHash: string
) => {
  let explorerUrl = "";

  switch (chainId) {
    case 80001: // Mumbai Testnet
      explorerUrl = `https://mumbai.polygonscan.com/tx/${txHash}`;
      break;
    case 5: // Goerli Testnet
      explorerUrl = `https://goerli.etherscan.io/tx/${txHash}`;
      break;
    default:
      console.error("Unsupported network");
      return;
  }

  // Open the URL in a new tab
  window.open(explorerUrl, "_blank");
};
