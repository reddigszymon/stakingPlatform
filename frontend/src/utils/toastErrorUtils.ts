// utils/toastUtils.ts
import { toast } from "react-toastify";

export const displayErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
