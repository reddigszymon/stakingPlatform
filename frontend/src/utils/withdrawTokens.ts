import { toast } from "react-toastify";
import { ethers } from "ethers";
import polygonStaking from "../assets/abis/polygonStaking.json";
import goerliStaking from "../assets/abis/goerliStaking.json";
import { displayErrorToast } from "./toastErrorUtils";
import { initializeContract } from "./initializeContract";

export const withdrawTokens = async (
  active: boolean,
  chainId: number | undefined,
  amount: number
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
        ? "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b"
        : "0xb1023Ef4e6cd4757b509D7679aaB96291E4DB8Fa";

    const abi = chainId === 80001 ? polygonStaking : goerliStaking;

    const contract = await initializeContract(abi, contractAddress);

    const amountToWithdraw = ethers.parseEther(amount.toString());

    const tx = await contract.withdraw(amountToWithdraw);

    await tx.wait();
  } catch (error) {
    console.error("Error withdrawing tokens:", error);
  }
};
