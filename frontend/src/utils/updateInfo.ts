import {
  setTotalDeposited,
  setAvailableBalance,
  setPoolLimit,
  setTimeLeft,
  setApr,
  setUserDeposit,
  setEarned,
} from "../reducers/appReducer";
import { fetchTotalDeposit } from "./fetchTotalDeposit";
import { fetchAvailableBalance } from "./fetchAvailableBalance";
import { fetchPoolLimit } from "./fetchPoolLimit";
import { fetchTimeLeft } from "./fetchTimeLeft";
import { AnyAction, Dispatch } from "redux";
import { fetchAPR } from "./fetchAPR";
import { fetchUserDeposits } from "./fetchUserDeposits";
import { fetchEarned } from "./fetchEarned";

export const updateInfo = async (
  dispatch: Dispatch<AnyAction>,
  chainId: number | undefined,
  active: boolean,
  account: string | null | undefined
) => {
  const deposit = await fetchTotalDeposit(chainId);
  dispatch(setTotalDeposited(deposit));

  const poolLimit = await fetchPoolLimit(chainId);
  dispatch(setPoolLimit(poolLimit));

  const timeLeft = await fetchTimeLeft(chainId);
  dispatch(setTimeLeft(timeLeft));

  const apr = await fetchAPR(chainId);
  dispatch(setApr(apr));

  if (active) {
    const fetchBalance = async () => {
      const balance = await fetchAvailableBalance(chainId, account);
      dispatch(setAvailableBalance(balance));
    };

    const fetchTokensDepositedByUsers = async () => {
      const userBalance = await fetchUserDeposits(active, chainId, account);
      dispatch(setUserDeposit(userBalance));
    };

    const fetchTokensEarnedByUser = async () => {
      const earnedAmount = await fetchEarned(active, chainId, account);
      dispatch(setEarned(earnedAmount));
    };

    fetchBalance();
    fetchTokensDepositedByUsers();
    fetchTokensEarnedByUser();
  }
};
