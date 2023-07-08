import polygonStaking from "../assets/abis/polygonStaking.json";
import { displayErrorToast } from "./toastErrorUtils";
import { initializeContract } from "./initializeContract";

export const claimRewards = async (
  active: boolean,
  chainId: number | undefined
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

    const tx = await contract.withdrawReward();

    await tx.wait();

    return tx;
  } catch (error) {
    console.error("Error claiming tokens:", error);
  }
};
