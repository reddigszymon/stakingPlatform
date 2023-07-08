import { initializeContract } from "./initializeContract";
import polygonToken from "../assets/abis/polygonToken.json";
import { ethers } from "ethers";

export const approveTokens = async (
  chainId: number | undefined,
  amount: string
) => {
  const contractAddress = "0xC33B9eAfBd636aB4b185675036210A9a254616eC";

  const abi = polygonToken;

  const spender = "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b";

  const contract = await initializeContract(abi, contractAddress);

  const amountInWei = ethers.parseUnits(amount, 18);

  try {
    const tx = await contract.approve(spender, amountInWei);

    await tx.wait();
  } catch (error) {
    console.error("Error approving tokens:", error);
  }
};
