import { initializeContract } from "./initializeContract";
import polygonToken from "../assets/abis/polygonToken.json";
import goerliToken from "../assets/abis/goerliToken.json";
import { ethers } from "ethers";

export const approveTokens = async (
  chainId: number | undefined,
  amount: string
) => {
  const contractAddress =
    chainId === 80001
      ? "0xC33B9eAfBd636aB4b185675036210A9a254616eC"
      : "0xd121e33a76157949352d795Ca5965a5320294917";

  const abi = chainId === 80001 ? polygonToken : goerliToken;

  const spender =
    chainId === 80001
      ? "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b"
      : "0xb1023Ef4e6cd4757b509D7679aaB96291E4DB8Fa";

  const contract = await initializeContract(abi, contractAddress);

  const amountInWei = ethers.parseUnits(amount, 18);

  try {
    const tx = await contract.approve(spender, amountInWei);

    await tx.wait();
  } catch (error) {
    console.error("Error approving tokens:", error);
  }
};
