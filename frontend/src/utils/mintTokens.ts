import { toast } from "react-toastify";
import { ethers } from "ethers";
import polygonToken from "../assets/abis/polygonToken.json";
import goerliToken from "../assets/abis/goerliToken.json";
import { initializeContract } from "./initializeContract";
import { displayErrorToast } from "./toastErrorUtils";

export const mintTokens = async (
  account: string | null | undefined,
  active: boolean,
  chainId: number | undefined
) => {
  if (!active) {
    displayErrorToast("Please connect your account first!");
    return;
  }
  if (chainId !== 80001 && chainId !== 5) {
    displayErrorToast("Please switch your chain to either Mumbai or Goerli!");
    return;
  }
  try {
    const contractAddress =
      chainId === 80001
        ? "0xC33B9eAfBd636aB4b185675036210A9a254616eC"
        : "0xd121e33a76157949352d795Ca5965a5320294917";

    const abi = chainId === 80001 ? polygonToken : goerliToken;

    const contract = await initializeContract(abi, contractAddress);

    const amount = ethers.parseEther("100");
    const tx = await contract.mint(account, amount);

    await tx.wait();
  } catch (error) {
    console.error("Error minting tokens:", error);
  }
};
