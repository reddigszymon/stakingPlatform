import polygonStaking from "../assets/abis/polygonStaking.json";
import { initializeContract } from "./initializeContract";

export const fetchUserDeposits = async (
  active: boolean,
  chainId: number | undefined,
  account: string | null | undefined
) => {
  if (active && chainId === 80001) {
    try {
      const contractAddress = "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b";

      const abi = polygonStaking;

      const contract = await initializeContract(abi, contractAddress);

      const balance = await contract.balanceOf(account);
      return parseFloat(balance.toString());
    } catch (error) {
      console.error("Error claiming tokens:", error);
      return 0.0;
    }
  } else {
    return 0.0;
  }
};
