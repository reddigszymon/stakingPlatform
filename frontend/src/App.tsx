import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import WalletConnectWrapper from "./components/Navbar/WalletConnectWrapper";
import StakingPool from "./components/StakingPool/StakingPool";
import DepositScreen from "./components/DepositScreen/DepositScreen";
import Account from "./components/Account/Account";
import PanelAnimation from "./components/Navbar/PanelAnimation";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isPanelVisible, setPanelVisible] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [depositActive, setDepositActive] = useState<boolean>(false);
  const [accountWindowActive, setAccountWindowActive] =
    useState<boolean>(false);

  const { active, chainId } = useWeb3React<Web3Provider>();

  const togglePanel = () => {
    setPanelVisible(!isPanelVisible);
  };

  const handleClosePanel = () => {
    if (isPanelVisible) {
      setPanelVisible(false);
    }
  };

  const handlePanelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <PanelAnimation
            windowWidth={windowWidth}
            onClick={handlePanelClick}
            setPanelVisible={setPanelVisible}
          >
            <WalletConnectWrapper setPanelVisible={setPanelVisible} />
          </PanelAnimation>
        )}
      </AnimatePresence>
      <Navbar
        togglePanel={togglePanel}
        setDepositActive={setDepositActive}
        setAccountWindowActive={setAccountWindowActive}
      />
      {!depositActive && <StakingPool setDepositActive={setDepositActive} />}
      {depositActive && <DepositScreen />}
      {accountWindowActive &&
        active &&
        (chainId === 80001 || chainId === 5) && (
          <div className="h-screen w-full absolute">
            <Account setAccountWindowActive={setAccountWindowActive} />
          </div>
        )}
    </div>
  );
}

export default App;
