import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

interface FinalScreenProps {
  setFinalScreenActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function FinalScreen(props: FinalScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className=" w-full h-full flex items-center justify-center bg-[#050934] bg-opacity-[75%] fixed z-50">
      <div
        className={`bg-[white] w-[40%] h-[50%] min-h-[400px] p-[30px] border-2 max-w-[1200px] max-h-[800px] shadow-lg rounded-lg flex flex-col gap-[20px] justify-between
       transition-all duration-100 ease-in-out transform-gpu ${
         isVisible ? "scale-100" : "scale-[90%]"
       } 
      transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
      `}
      >
        <div className="flex flex-col gap-[30px]">
          <div className="w-full flex items-center justify-end text-[24px] text-[#FF007A]">
            <button
              onClick={() => {
                props.setFinalScreenActive(false);
              }}
            >
              <RxCross2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalScreen;
