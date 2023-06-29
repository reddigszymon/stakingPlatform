import React from "react";

interface ButtonDepositProps {
  opacity: Number;
  text: string;
  setFinalScreenActive: React.Dispatch<React.SetStateAction<boolean>>;
  // contractFunction: () => void;
}

function ButtonDeposit(props: ButtonDepositProps) {
  const handleClick = () => {
    props.setFinalScreenActive(true);
  };

  return (
    <button
      onClick={() => handleClick()}
      className={`rounded-xl bg-[#FF007A] bg-opacity-[${props.opacity}%] px-[10px] py-[5px] w-[100px] h-[50px] sm:w-[120px] md:w-[140px] md:h-[70px] md:px-[25px] md:py-[10px]`}
    >
      {props.text}
    </button>
  );
}

export default ButtonDeposit;
