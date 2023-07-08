import { useEffect } from "react";
import uniToken from "../../assets/images/uniToken.svg";
import ButtonDeposit from "./DepositButton/ButtonDeposit";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatNumber";
import { fetchEarned } from "../../utils/fetchEarned";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useDispatch } from "react-redux";
import { BsChevronLeft } from "react-icons/bs";
import { setDepositActive } from "../../reducers/appReducer";

import { setEarned } from "../../reducers/appReducer";

function DepositScreen() {
  const {
    isPanelVisible,
    totalDeposited,
    poolLimit,
    apr,
    userDeposit,
    earned,
  } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const { account, active, chainId } = useWeb3React<Web3Provider>();

  const totalDepositedFormatted =
    totalDeposited !== undefined ? formatNumber(totalDeposited) : "0";
  const poolLimitFormatted =
    poolLimit !== undefined ? formatNumber(poolLimit) : "0";

  useEffect(() => {
    // Function to fetch the earned amount and update the state
    const updateEarned = async () => {
      const fetchedEarned = await fetchEarned(active, chainId, account);
      dispatch(setEarned(fetchedEarned));
    };

    // Call the function immediately to update the state
    updateEarned();

    // Set up an interval to call the function every 0.5 second
    const interval = setInterval(updateEarned, 500);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [active, chainId, account]);

  return (
    <div
      className={`flex w-[90%] max-w-[600px] lg:max-w-[700px] flex-col gap-[5px] font-bold ${
        isPanelVisible ? "z-[-1]" : "z-[1]"
      } md:z-[10] text-[12px] sm:text-[16px] md:text-[18px]`}
    >
      <div className="flex w-full justify-between items-center mb-[10px]">
        <button
          onClick={() => dispatch(setDepositActive(false))}
          className="flex items-center justify-center gap-[5px] text-[#A8A8A8]"
        >
          <BsChevronLeft />
          <p className="text-[22px]">UNI Staking</p>
        </button>
        <img src={uniToken} alt="UNI Token" />
      </div>
      <div className="flex w-full justify-between items-center mb-[15px]">
        <div className="w-[45%] px-[15px] py-[10px] bg-[#FCE9F7] flex flex-col gap-[5px] rounded-md">
          <p>Total deposits</p>
          <div className="flex w-full justify-between items-center">
            <p>
              {totalDeposited === undefined || poolLimit === undefined
                ? "0"
                : `${totalDepositedFormatted} / ${poolLimitFormatted}`}
            </p>
            <p>UNI</p>
          </div>
        </div>
        <div className="w-[45%] px-[15px] py-[10px] bg-[#FCE9F7] flex flex-col gap-[5px] rounded-md">
          <p>Annual Percentage Rate</p>
          <p>{`${apr === undefined ? 0 : (apr / 10 ** 18).toFixed(2)}%`}</p>
        </div>
      </div>
      <div>
        <div className="w-full bg-[#FADCF2] px-[15px] py-[10px] rounded-t-md">
          <p className="mb-[10px]">Your UNI deposits</p>
          <div className="flex w-full justify-between items-center">
            <p>{active ? (userDeposit / 10 ** 18).toFixed(4) : "0.0000"}</p>
            <p>UNI</p>
          </div>
        </div>
        <div className="w-full bg-[#DFD8DD] px-[15px] py-[10px] rounded-b-md opacity-[75%]">
          <p className="mb-[10px] opacity-[50%]">Your earned UNI</p>
          <div className="flex w-full justify-between items-center opacity-[50%]">
            <p>{(earned / 10 ** 18).toFixed(4)}</p>
            <p>UNI</p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-[15px] mt-[25px] text-[12px] sm:text-[14px] md:text-[16px]">
        <ButtonDeposit text="Claim Rewards" opacity={25} />
        <ButtonDeposit text="Withdraw tokens" opacity={50} />
        <ButtonDeposit text="Deposit" opacity={75} />
      </div>
    </div>
  );
}

export default DepositScreen;
