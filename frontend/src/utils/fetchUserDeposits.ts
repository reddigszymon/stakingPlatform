import polygonStaking from "../assets/abis/polygonStaking.json";
import goerliStaking from "../assets/abis/goerliStaking.json";
import { initializeContract } from "./initializeContract";

export const fetchUserDeposits = async (
  active: boolean,
  chainId: number | undefined,
  account: string | null | undefined
) => {
  if (active) {
    try {
      const contractAddress =
        chainId === 80001
          ? "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b"
          : "0xb1023Ef4e6cd4757b509D7679aaB96291E4DB8Fa";

      const abi = chainId === 80001 ? polygonStaking : goerliStaking;

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
