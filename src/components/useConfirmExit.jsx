import { useEffect } from "react";
import { socket } from "../socket";
import { useDispatch } from "react-redux";
import { leaveRoom } from "../features/user/userSlice";

export default function useConfirmExit(activate = true) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!activate) return;

    const msg = "All changes will be lost. Are you sure?";

    // 1️⃣ Refresh / tab‑close
    const beforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = msg;
    };

    // 2️⃣ Back‑button inside the SPA
    const onPopState = () => {
      if (!window.confirm(msg)) {
        // user said “stay” → cancel navigation
        window.history.pushState(null, "", window.location.href);
      } else {
        // allow normal back navigation once
        socket.emit("leave-room");
        dispatch(leaveRoom());
        window.removeEventListener("beforeunload", beforeUnload);
        history.back();
      }
    };

    // prime an extra history entry so popstate fires
    window.history.pushState(null, "", window.location.href);

    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("popstate", onPopState);

    // cleanup
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      window.removeEventListener("popstate", onPopState);
    };
  }, [activate, dispatch]);
}
