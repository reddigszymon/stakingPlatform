import React, { useState } from "react";
import { motion } from "framer-motion";

interface ConnectButtonProps {
  togglePanel: () => void;
}

function ConnectButton(props: ConnectButtonProps) {
  return (
    <button
      className="bg-[#FF007A] text-[#FF007A] text-opacity-[90%] bg-opacity-[25%] py-[10px] px-[20px] rounded-2xl font-bold"
      onClick={props.togglePanel}
    >
      Connect
    </button>
  );
}

export default ConnectButton;
