import { toast } from "react-toastify";
import { ethers } from "ethers";
import polygonStaking from "../assets/abis/polygonStaking.json";
import goerliStaking from "../assets/abis/goerliStaking.json";

export const claimRewards = async (
  active: boolean,
  chainId: number | undefined
) => {
  if (!active) {
    toast.error("Please connect your account first!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }
  if (chainId !== 80001 && chainId !== 5) {
    toast.error("Please switch your chain to either Mumbai or!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress =
      chainId === 80001
        ? "0x13D076Bf577541c699d6E8BD21286BEabc6E7B4b"
        : "0xb1023Ef4e6cd4757b509D7679aaB96291E4DB8Fa";

    const abi = chainId === 80001 ? polygonStaking : goerliStaking;

    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.withdrawReward();

    await tx.wait();
  } catch (error) {
    console.error("Error claiming tokens:", error);
  }
};
