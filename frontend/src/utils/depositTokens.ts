import { ethers } from "ethers";
import polygonStaking from "../assets/abis/polygonStaking.json";
import { displayErrorToast } from "./toastErrorUtils";
import { initializeContract } from "./initializeContract";

export const depositTokens = async (
  active: boolean,
  chainId: number | undefined,
  amount: string
) => {
  if (!active) {
    displayErrorToast("Please connect your account first!");
    return;
  }
  if (chainId !== 80001) {
    displayErrorToast("Please switch your chain to either Mumbai!");
    return;
  }

  try {
    const contractAddress = "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b";

    const abi = polygonStaking;

    const contract = await initializeContract(abi, contractAddress);

    const amountToStake = ethers.parseUnits(amount, 18);

    const tx = await contract.stake(amountToStake);

    await tx.wait();

    return tx.hash;
  } catch (error) {
    console.error("Error staking tokens:", error);
  }
};
