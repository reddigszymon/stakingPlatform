import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import WalletConnectWrapper from "./components/Navbar/WalletConnectWrapper";
import StakingPool from "./components/StakingPool/StakingPool";
import DepositScreen from "./components/DepositScreen/DepositScreen";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Account from "./components/Account/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isPanelVisible, setPanelVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [depositActive, setDepositActive] = useState(false);
  const [accountWindowActive, setAccountWindowActive] = useState(false);

  console.log(accountWindowActive);

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
          <motion.div
            initial={windowWidth <= 640 ? { y: "100vh" } : { x: "100vw" }}
            animate={windowWidth <= 640 ? { y: 0 } : { x: 0 }}
            exit={windowWidth <= 640 ? { y: "100vh" } : { x: "100vw" }}
            transition={{ duration: 0.3 }}
            className={`fixed rounded-t-lg z-[10] ${
              windowWidth <= 640
                ? "bottom-0 w-screen h-[400px]"
                : "right-0 h-[98%] w-[310px] lg:w-[400px] m-[8px] border-[1px] border-gray rounded-lg shadow-md"
            } bg-white `}
            onClick={handlePanelClick}
          >
            <WalletConnectWrapper setPanelVisible={setPanelVisible} />
          </motion.div>
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
