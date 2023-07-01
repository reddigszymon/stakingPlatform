import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isPanelVisible: boolean;
  totalDeposited: number | undefined;
  windowWidth: number;
  depositActive: boolean;
  accountWindowActive: boolean;
  finalScreenActive: string;
  availableBalance: number | undefined;
}

const initialState: AppState = {
  isPanelVisible: false,
  totalDeposited: 0,
  windowWidth: window.innerWidth,
  depositActive: false,
  accountWindowActive: false,
  finalScreenActive: "",
  availableBalance: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPanelVisible(state, action: PayloadAction<boolean>) {
      state.isPanelVisible = action.payload;
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
} = appSlice.actions;

export default appSlice.reducer;
