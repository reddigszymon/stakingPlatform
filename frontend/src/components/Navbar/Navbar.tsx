import React from "react";
import uniLogo from "../../assets/images/uniLogo.svg";
import ConnectButton from "./ConnectButton";

interface NavbarProps {
  togglePanel: () => void;
}

function Navbar(props: NavbarProps) {
  return (
    <div className="w-full flex justify-between items-center p-[20px]">
      <img src={uniLogo} className="w-[40px]" />
      <ConnectButton togglePanel={props.togglePanel} />
    </div>
  );
}

export default Navbar;
