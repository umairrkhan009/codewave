import Navbar from "../ui/Navbar";
import MonacoEditor from "../features/editor/MonacoEditor";
import Dropdown from "../features/editor/Dropdown";
import { LANGUAGES } from "../features/editor/constants";
import { useEffect } from "react";
import { socket } from "../socket";
import { useDispatch } from "react-redux";
import { setUsers } from "../features/user/userSlice";
import { Bounce, toast } from "react-toastify";
import useConfirmExit from "../components/useConfirmExit";

function Room() {
  const dispatch = useDispatch();
  useConfirmExit(true); // always ask

  useEffect(() => {
    function handler(name) {
      toast.success(`${name} joined`, {
        toastId: `joined- ${name}`,
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    socket.on("joined-room", handler);
  }, []);

  useEffect(() => {
    function handler(users) {
      dispatch(setUsers(users));
    }

    socket.on("room-users", handler);

    return () => socket.off("room-users", handler);
  });

  useEffect(() => {}, []);

  return (
    <div className="h-[100vh] flex flex-col">
      <Navbar />
      <Dropdown options={LANGUAGES} />
      <MonacoEditor />
    </div>
  );
}

export default Room;
