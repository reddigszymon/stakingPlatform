import { initializeContract } from "./initializeContract";
import polygonStaking from "../assets/abis/polygonStaking.json";
import goerliStaking from "../assets/abis/goerliStaking.json";

export const fetchTotalDeposit = async (chainId: number | undefined) => {
  const contractAddress =
    chainId === 5
      ? "0xb1023Ef4e6cd4757b509D7679aaB96291E4DB8Fa"
      : "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b";

  const abi = chainId === 5 ? goerliStaking : polygonStaking;

  const contract = await initializeContract(abi, contractAddress);

  try {
    const poolLimit = await contract.getPoolLimit();
    return parseFloat(poolLimit.toString());
  } catch (error) {
    console.error("Error fetching total tokens", error);
  }
};
