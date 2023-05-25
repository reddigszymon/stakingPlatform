import { toast } from "react-toastify";

export const copyToClipboard = async (
  e: React.MouseEvent,
  text: string | null | undefined
) => {
  e.preventDefault();
  try {
    await navigator.clipboard.writeText(
      text === null || text === undefined ? "" : text
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
