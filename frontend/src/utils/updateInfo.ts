import { setTotalDeposited, setAvailableBalance } from "../reducers/appReducer";
import { fetchTotalDeposit } from "./fetchTotalDeposit";
import { fetchAvailableBalance } from "./fetchAvailableBalance";
import { AnyAction, Dispatch } from "redux";

export const updateInfo = async (
  dispatch: Dispatch<AnyAction>,
  chainId: number | undefined,
  active: boolean,
  account: string | null | undefined
) => {
  const deposit = await fetchTotalDeposit(chainId);
  dispatch(setTotalDeposited(deposit));

  if (active) {
    const fetchBalance = async () => {
      const balance = await fetchAvailableBalance(chainId, account);
      dispatch(setAvailableBalance(balance));
    };

    fetchBalance();
  }
};
