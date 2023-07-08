import { initializeContract } from "./initializeContract";
import polygonStaking from "../assets/abis/polygonStaking.json";
import goerliStaking from "../assets/abis/goerliStaking.json";
import { fetchTotalDeposit } from "./fetchTotalDeposit";

export const fetchAPR = async (chainId: number | undefined) => {
  const totalDeposit = await fetchTotalDeposit(chainId);

  const contractAddress =
    chainId === 5
      ? "0xb1023Ef4e6cd4757b509D7679aaB96291E4DB8Fa"
      : "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b";

  const abi = chainId === 5 ? goerliStaking : polygonStaking;

  const contract = await initializeContract(abi, contractAddress, false);

  try {
    const rewardRate = await contract.getRewardRate();

    if (totalDeposit !== undefined) {
      const apr =
        (parseFloat(rewardRate.toString()) * 31536000 * 10 ** 18) /
        parseFloat(totalDeposit?.toString());
      return apr;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error calculating APR:", error);
  }
};
