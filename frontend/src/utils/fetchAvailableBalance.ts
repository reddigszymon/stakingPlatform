import { initializeContract } from "./initializeContract";
import polygonToken from "../assets/abis/polygonToken.json";

export const fetchAvailableBalance = async (
  chainId: number | undefined,
  account: string | null | undefined
) => {
  const contractAddress = "0xC33B9eAfBd636aB4b185675036210A9a254616eC";

  const abi = polygonToken;

  const contract = await initializeContract(abi, contractAddress);

  try {
    const balance = await contract.balanceOf(account);
    return parseFloat(balance.toString());
  } catch (error) {
    console.error("Error fetching balance", error);
  }
};
