import { initializeContract } from "./initializeContract";
import polygonToken from "../assets/abis/polygonToken.json";
import goerliToken from "../assets/abis/goerliToken.json";

export const fetchAvailableBalance = async (
  chainId: number | undefined,
  account: string | null | undefined
) => {
  const contractAddress =
    chainId === 80001
      ? "0xC33B9eAfBd636aB4b185675036210A9a254616eC"
      : "0xd121e33a76157949352d795Ca5965a5320294917";

  const abi = chainId === 80001 ? polygonToken : goerliToken;

  const contract = await initializeContract(abi, contractAddress);

  try {
    const balance = await contract.balanceOf(account);
    return parseFloat(balance.toString());
  } catch (error) {
    console.error("Error fetching balance", error);
  }
};
