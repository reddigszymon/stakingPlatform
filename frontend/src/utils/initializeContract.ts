import { ethers } from "ethers";

export const initializeContract = async (abi: any, contractAddress: string) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer);

  return contract;
};
