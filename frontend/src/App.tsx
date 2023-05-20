import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import WalletConnectWrapper from "./components/Navbar/WalletConnectWrapper";
import StakingPool from "./components/StakingPool/StakingPool";

function App() {
  const [isPanelVisible, setPanelVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
            <WalletConnectWrapper />
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar togglePanel={togglePanel} />
      <StakingPool />
    </div>
  );
}

export default App;
