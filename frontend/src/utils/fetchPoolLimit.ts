import { initializeContract } from "./initializeContract";
import polygonStaking from "../assets/abis/polygonStaking.json";

export const fetchPoolLimit = async (chainId: number | undefined) => {
  const contractAddress = "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b";

  const abi = polygonStaking;

  const contract = await initializeContract(abi, contractAddress, false);

  try {
    const poolLimit = await contract.getPoolLimit();
    return parseFloat(poolLimit.toString());
  } catch (error) {
    console.error("Error fetching total tokens", error);
  }
};
