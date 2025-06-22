import { useDispatch } from "react-redux";
import { joinRoom } from "../features/user/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import Button from "./Button";

function Form() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("join-room", { roomId, name });

    dispatch(joinRoom({ name, roomId }));
    navigate(`/room/${roomId}`);
  }

  return (
    <form
      className="w-[50%] lg:w=[40%] mt-5 sm:mt-7 lg:mt-10"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm md:text-lg rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 outline-none"
          placeholder="Name"
          required
        />
      </div>
      <div className="mb-5 relative">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Room ID"
          className="bg-gray-50 md:text-lg border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 outline-none"
          required
        />
        <button
          onClick={() => setRoomId(crypto.randomUUID().slice(0, 4))}
          type="button"
          className="absolute right-1 top-1 bottom-1 text-xs sm:text-sm pr-2 cursor-pointer text-gray-400 hover:text-gray-200"
        >
          Generate
        </button>
      </div>

      <Button type="base">Join Room</Button>
    </form>
  );
}

export default Form;
