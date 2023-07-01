import { ethers } from "ethers";

export const initializeContract = async (
  abi: any,
  contractAddress: string,
  needSigner = true
) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  if (needSigner) {
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  } else {
    return new ethers.Contract(contractAddress, abi, provider);
  }
};
