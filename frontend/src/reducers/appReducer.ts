import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isPanelVisible: boolean;
  totalDeposited: number | undefined;
  windowWidth: number;
  depositActive: boolean;
  accountWindowActive: boolean;
  finalScreenActive: string;
  availableBalance: number | undefined;
  poolLimit: number | undefined;
  timeLeft: number | undefined;
  apr: number | undefined;
  countdown: number;
  userDeposit: number;
  earned: number;
}

const initialState: AppState = {
  isPanelVisible: false,
  totalDeposited: 0,
  windowWidth: window.innerWidth,
  depositActive: false,
  accountWindowActive: false,
  finalScreenActive: "",
  availableBalance: 0,
  poolLimit: 0,
  timeLeft: 0,
  apr: 0,
  countdown: 0,
  userDeposit: 0,
  earned: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPanelVisible(state, action: PayloadAction<boolean>) {
      state.isPanelVisible = action.payload;
    },
    setPoolLimit(state, action: PayloadAction<number | undefined>) {
      state.poolLimit = action.payload;
    },
    setTotalDeposited(state, action: PayloadAction<number | undefined>) {
      state.totalDeposited = action.payload;
    },
    setWindowWidth(state, action: PayloadAction<number>) {
      state.windowWidth = action.payload;
    },
    setDepositActive(state, action: PayloadAction<boolean>) {
      state.depositActive = action.payload;
    },
    setAccountWindowActive(state, action: PayloadAction<boolean>) {
      state.accountWindowActive = action.payload;
    },
    setFinalScreenActive(state, action: PayloadAction<string>) {
      state.finalScreenActive = action.payload;
    },
    setAvailableBalance(state, action: PayloadAction<number | undefined>) {
      state.availableBalance = action.payload;
    },
    setTimeLeft(state, action: PayloadAction<number | undefined>) {
      state.timeLeft = action.payload;
    },
    setApr(state, action: PayloadAction<number | undefined>) {
      state.apr = action.payload;
    },
    setCountdown(state, action: PayloadAction<number>) {
      state.countdown = action.payload;
    },
    decrementCountdown(state) {
      state.countdown -= 1;
    },
    setUserDeposit(state, action: PayloadAction<number>) {
      state.userDeposit = action.payload;
    },
    setEarned(state, action: PayloadAction<number>) {
      state.earned = action.payload;
    },
  },
});

export const {
  setPanelVisible,
  setTotalDeposited,
  setWindowWidth,
  setDepositActive,
  setAccountWindowActive,
  setFinalScreenActive,
  setAvailableBalance,
  setPoolLimit,
  setTimeLeft,
  setApr,
  setCountdown,
  decrementCountdown,
  setUserDeposit,
  setEarned,
} = appSlice.actions;

export default appSlice.reducer;
