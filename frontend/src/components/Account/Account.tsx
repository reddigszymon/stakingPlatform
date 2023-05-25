import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import blockies from "ethereum-blockies-base64";
import cross from "../../assets/images/cross.svg";
import { BiCopy } from "react-icons/bi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { toast } from "react-toastify";

interface AccountProps {
  setAccountWindowActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Account(props: AccountProps) {
  const { account, chainId, deactivate, active } = useWeb3React<Web3Provider>();

  console.log(chainId);

  const avatar = account ? blockies(account) : "";

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(
        account === null || account === undefined ? "" : account
      );
      toast("Copied to clipboard!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const redirectToChainExplorer = (e: React.MouseEvent) => {
    e.preventDefault();
    let url = "";

    if (account && active) {
      if (chainId === 5) {
        url = `https://goerli.etherscan.io/address/${account}`;
      } else if (chainId === 80001) {
        url = `https://mumbai.polygonscan.com/address/${account}`;
      }

      window.open(url, "_blank");
    }
  };

  return (
    <div className=" w-full h-full flex items-center justify-center bg-[#050934] bg-opacity-[75%] fixed z-50">
      <div className="bg-[white] w-[450px] h-[270px] p-[20px] border-2 shadow-lg rounded-lg flex flex-col gap-[20px] justify-between">
        <div className="flex flex-col gap-[30px]">
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold text-[18px]">Account</p>
            <button onClick={() => props.setAccountWindowActive(false)}>
              <img
                src={cross}
                className="w-[25px] border-[#FF007A] border-[1px]"
              />
            </button>
          </div>
          <div className="border rounded-2xl p-[15px] flex flex-col gap-[15px]">
            <div className="flex w-full justify-between items-center">
              <p className="font-semibold text-[18px]">Connected with</p>
              <button
                onClick={() => {
                  props.setAccountWindowActive(false);
                  deactivate();
                }}
                className="bg-[red] bg-opacity-[70%] text-[#fff] px-[10px] py-[5px] rounded-md font-bold"
              >
                Disconnect
              </button>
            </div>
            {account && (
              <div className="flex items-center gap-[8px] font-bold text-[26px]">
                <img
                  src={avatar}
                  alt="avatar"
                  className="rounded-full w-[30px]"
                />
                <p>{account.slice(0, 4) + "..." + account.slice(38, 42)}</p>
              </div>
            )}
            <div className="flex justify-between items-center font-bold">
              <button
                onClick={(e) => copyToClipboard(e)}
                className="flex items-center gap-[5px]"
              >
                <BiCopy />
                <p>Copy Address</p>
              </button>
              <button
                onClick={(e) => redirectToChainExplorer(e)}
                className="flex items-center gap-[5px]"
              >
                <BsBoxArrowUpRight />
                <p>{`View on ${
                  chainId === 80001 ? "Polygonscan" : "Etherscan"
                }`}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
