import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { leaveRoom } from "../features/user/userSlice";
import { socket } from "../socket";
import { useEffect } from "react";

function Navbar() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleCopy() {
    navigator.clipboard.writeText(roomId);
    toast.success("🗒️ Copied to Clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  function handleLeave() {
    const confirmModal = window.confirm(
      "All changes will be lost. Are you sure?"
    );
    if (confirmModal) {
      socket.emit("leave-room");
      dispatch(leaveRoom());
      // dispatch(resetEditor());
      navigate(-2);
    }
  }

  useEffect(() => {
    function handler(name) {
      toast.info(`${name} left`, {
        toastId: `left-${name}`,
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    socket.on("left-room", handler);

    return () => {
      socket.off("left-room", handler);
    };
  }, []);

  return (
    <div className="  bg-zinc-900 flex justify-between items-center text-neutral-50 px-6 py-3">
      <h1 className="text-md sm:text-lg md:text-xl lg:text-3xl font-bold">
        CodeWave
      </h1>

      <div className="space-x-3 sm:space-x-5 flex items-center mr-3 ">
        <ToastContainer />
        <span className="text-xs sm:text-xs md:text-sm text-zinc-300">
          Room: {roomId}
        </span>

        <div
          onClick={handleCopy}
          className="flex items-center gap-3 outline-none border-none bg-stone-300 text-stone-900 px-3 py-2 rounded-lg hover:cursor-pointer  hover:bg-stone-400 text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>

          <span className="hidden md:block">Copy Room ID</span>
        </div>
        <div
          onClick={handleLeave}
          className="flex items-center text-xs gap-3 outline-none border-none bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>

          <span className="hidden md:block">Leave Room</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
