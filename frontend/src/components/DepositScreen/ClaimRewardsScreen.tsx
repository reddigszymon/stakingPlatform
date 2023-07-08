import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { claimRewards } from "../../utils/claimReward";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import TransactionFinished from "./DepositButton/TransactionFinished";
import ClipLoader from "react-spinners/ClipLoader";
import { updateInfo } from "../../utils/updateInfo";

interface ClaimRewardsScreenProps {
  transactionFinished: boolean;
  setTransactionFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

function ClaimRewardsScreen(props: ClaimRewardsScreenProps) {
  const dispatch = useDispatch();
  const { earned } = useSelector((state: RootState) => state.app);
  const { active, chainId, account } = useWeb3React<Web3Provider>();
  const [transactionActive, setTransactionActive] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleClaimRewards = async () => {
    setTransactionActive(true);
    const tx = await claimRewards(active, chainId);
    setTxHash(tx.hash);
    await updateInfo(dispatch, chainId, active, account);
    setTransactionActive(false);
    props.setTransactionFinished(true);
  };

  return (
    <>
      {!transactionActive && !props.transactionFinished && (
        <div className="flex flex-col items-center justify-center gap-[20px] h-full">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-[42px]">
              {(earned / 10 ** 18).toFixed(4)}
            </h1>
            <p>Earned UNI tokens</p>
          </div>
          <p className="mb-[20px]">You can withdraw your earned rewards</p>
          <button
            onClick={() => handleClaimRewards()}
            className="w-full bg-[#FF007A] py-[10px] rounded-lg text-[#fff] font-medium text-[22px]"
          >
            Claim
          </button>
        </div>
      )}
      {transactionActive && !props.transactionFinished && (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <div className="mb-[40px]">
            <ClipLoader color="#a8bcb8" size={90} />
          </div>
          <div className="flex flex-col gap-[5px] items-center">
            <p>Transaction is pending...</p>
            <p>Please do not close this window</p>
          </div>
        </div>
      )}
      {props.transactionFinished && !transactionActive && (
        <TransactionFinished hash={txHash} />
      )}
    </>
  );
}

export default ClaimRewardsScreen;
