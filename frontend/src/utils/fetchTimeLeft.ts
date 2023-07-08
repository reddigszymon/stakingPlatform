import { initializeContract } from "./initializeContract";
import polygonStaking from "../assets/abis/polygonStaking.json";

export const fetchTimeLeft = async (chainId: number | undefined) => {
  const contractAddress = "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b";

  const abi = polygonStaking;

  const contract = await initializeContract(abi, contractAddress, false);

  try {
    const timeLeft = await contract.secondsLeftTillNewRewards();
    return parseFloat(timeLeft.toString());
  } catch (error) {
    console.error("Error fetching time left", error);
  }
};
