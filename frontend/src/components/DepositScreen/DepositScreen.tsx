import uniToken from "../../assets/images/uniToken.svg";
import ButtonDeposit from "./DepositButton/ButtonDeposit";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

function DepositScreen() {
  const { isPanelVisible, totalDeposited } = useSelector(
    (state: RootState) => state.app
  );

  return (
    <div
      className={`flex w-[90%] max-w-[600px] lg:max-w-[700px] flex-col gap-[5px] font-bold ${
        isPanelVisible ? "z-[-1]" : "z-[1]"
      } md:z-[10] text-[12px] sm:text-[16px] md:text-[18px]`}
    >
      <div className="flex w-full justify-between items-center mb-[10px]">
        <p className="text-[#A8A8A8] text-[22px]">UNI Staking</p>
        <img src={uniToken} alt="UNI Token" />
      </div>
      <div className="flex w-full justify-between items-center mb-[15px]">
        <div className="w-[45%] px-[15px] py-[10px] bg-[#FCE9F7] flex flex-col gap-[5px] rounded-md">
          <p>Total deposits</p>
          <div className="flex w-full justify-between items-center">
            <p>
              <span>
                {totalDeposited === undefined
                  ? 0
                  : (totalDeposited / 10 ** 18).toFixed(2)}
              </span>{" "}
              / 20.00 M
            </p>
            <p>UNI</p>
          </div>
        </div>
        <div className="w-[45%] px-[15px] py-[10px] bg-[#FCE9F7] flex flex-col gap-[5px] rounded-md">
          <p>Annual Percentage Rate</p>
          <p>42%</p>
        </div>
      </div>
      <div>
        <div className="w-full bg-[#FADCF2] px-[15px] py-[10px] rounded-t-md">
          <p className="mb-[10px]">Your UNI deposits</p>
          <div className="flex w-full justify-between items-center">
            <p>0.00000</p>
            <p>UNI</p>
          </div>
        </div>
        <div className="w-full bg-[#DFD8DD] px-[15px] py-[10px] rounded-b-md opacity-[75%]">
          <p className="mb-[10px] opacity-[50%]">Your earned UNI</p>
          <div className="flex w-full justify-between items-center opacity-[50%]">
            <p>0.00000</p>
            <p>UNI</p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-[15px] mt-[25px] text-[12px] sm:text-[14px] md:text-[16px]">
        <ButtonDeposit
          text="Claim Rewards"
          opacity={25}
          // contractFunction={() => claimRewards(active, chainId)}
        />
        <ButtonDeposit
          text="Withdraw tokens"
          opacity={50}

          // contractFunction={() => withdrawTokens(active, chainId, 0.0001)}
        />
        <ButtonDeposit
          text="Deposit"
          opacity={75}

          // contractFunction={() => depositTokens(active, chainId, 0.0001)}
        />
      </div>
    </div>
  );
}

export default DepositScreen;
