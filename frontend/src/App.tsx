import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { AnimatePresence } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer } from "react-toastify";
import { fetchAvailableBalance } from "./utils/fetchAvailableBalance";
import { updateInfo } from "./utils/updateInfo";
import Navbar from "./components/Navbar/Navbar";
import WalletConnectWrapper from "./components/Navbar/WalletConnectWrapper";
import StakingPool from "./components/StakingPool/StakingPool";
import DepositScreen from "./components/DepositScreen/DepositScreen";
import Account from "./components/Account/Account";
import PanelAnimation from "./components/Navbar/PanelAnimation";
import FinalScreen from "./components/DepositScreen/FinalScreen";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import {
  setPanelVisible,
  setWindowWidth,
  setAvailableBalance,
} from "./reducers/appReducer";

function App() {
  const dispatch = useDispatch();

  const {
    isPanelVisible,
    windowWidth,
    depositActive,
    accountWindowActive,
    finalScreenActive,
  } = useSelector((state: RootState) => state.app);

  const { active, chainId, account } = useWeb3React<Web3Provider>();

  const togglePanel = () => {
    dispatch(setPanelVisible(!isPanelVisible));
  };

  const handleClosePanel = () => {
    if (isPanelVisible) {
      dispatch(setPanelVisible(false));
    }
  };

  const handlePanelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    updateInfo(dispatch, chainId, active, account);
  }, [active, depositActive]);

  return (
    <div
      className={`h-screen w-screen ${
        isPanelVisible && windowWidth <= 640 ? "bg-black bg-opacity-20" : ""
      } flex items-center justify-center`}
      onClick={handleClosePanel}
    >
      <ToastContainer />

      <AnimatePresence>
        {isPanelVisible && (
          <PanelAnimation onClick={handlePanelClick}>
            <WalletConnectWrapper />
          </PanelAnimation>
        )}
      </AnimatePresence>
      <Navbar togglePanel={togglePanel} />
      {!depositActive && <StakingPool />}
      {depositActive && <DepositScreen />}
      {finalScreenActive !== "" && <FinalScreen />}
      {accountWindowActive &&
        active &&
        (chainId === 80001 || chainId === 5) && (
          <div className="h-screen w-full absolute">
            <Account />
          </div>
        )}
    </div>
  );
}

export default App;
