import { ethers } from "ethers";

export const initializeContract = async (
  abi: any,
  contractAddress: string,
  needSigner = true
) => {
  // The URL should be replaced with your own provider's URL

  if (needSigner) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  } else {
    const provider = new ethers.JsonRpcProvider(
      process.env.REACT_APP_MUMBAI_RPC_URL
    );
    return new ethers.Contract(contractAddress, abi, provider);
  }
};
