export const redirectToChainExplorer = (
  e: React.MouseEvent,
  chainId: Number | undefined,
  account: string | null | undefined
) => {
  e.preventDefault();
  let url = "";

  if (chainId === 5) {
    url = `https://goerli.etherscan.io/address/${account}`;
  } else if (chainId === 80001) {
    url = `https://mumbai.polygonscan.com/address/${account}`;
  }

  window.open(url, "_blank");
};
