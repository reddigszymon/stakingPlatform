import { BsCheck } from "react-icons/bs";

interface ChainButtonProps {
  chainId: number | undefined;
  currentChainId: number | undefined;
  chainName: string;
  logo: string;
  onClickFunction: (network: string) => void;
}

function ChainButton({
  chainId,
  currentChainId,
  chainName,
  logo,
  onClickFunction,
}: ChainButtonProps) {
  return (
    <button
      onClick={() => onClickFunction(chainName)}
      className="flex items-center justify-between py-[20px] px-[15px] hover:bg-[gainsboro] transition-colors w-full"
    >
      <div className="flex items-center gap-[10px]">
        <img src={logo} className="w-[30px]" />
        <p>{chainName}</p>
      </div>
      {currentChainId === chainId && <BsCheck color="green" size={20} />}
    </button>
  );
}

export default ChainButton;
