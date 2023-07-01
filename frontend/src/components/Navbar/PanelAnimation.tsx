import { motion } from "framer-motion";
import React from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface PanelAnimationProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent) => void;
}

const PanelAnimation: React.FC<PanelAnimationProps> = ({
  children,
  onClick,
}) => {
  const { windowWidth } = useSelector((state: RootState) => state.app);
  return (
    <motion.div
      initial={windowWidth <= 640 ? { y: "100vh" } : { x: "100vw" }}
      animate={windowWidth <= 640 ? { y: 0 } : { x: 0 }}
      exit={windowWidth <= 640 ? { y: "100vh" } : { x: "100vw" }}
      transition={{ duration: 0.3 }}
      className={`fixed rounded-t-lg z-[100] ${
        windowWidth <= 640
          ? "bottom-0 w-screen h-[400px]"
          : "right-0 h-[98%] w-[310px] lg:w-[400px] m-[8px] border-[1px] border-gray rounded-lg shadow-md"
      } bg-white `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default PanelAnimation;
