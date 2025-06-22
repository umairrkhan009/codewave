import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "./editorSlice";
import { CODE_SNIPPETS } from "./constants";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AnimatedTooltip } from "../../components/ui/animated-tooltip";

function Dropdown({ options }) {
  const language = useSelector((state) => state.editor.language);
  const users = useSelector((state) => state.user.users);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  let snippet = "";

  useEffect(() => {
    socket.on("lang-update", (lang) => {
      if (language !== lang) {
        dispatch(selectLanguage({ lang }));
      }
    });

    return () => socket.off("lang-update");
  }, [language, dispatch]);

  function handleChange(e) {
    const lang = e.target.value;
    snippet = CODE_SNIPPETS[e.target.value];
    socket.emit("lang-change", { roomId, lang });
    dispatch(selectLanguage({ lang, snippet }));
  }

  return (
    <div className="px-6 h-[4rem] sm:h-[5rem] flex items-center justify-between w-full bg-zinc-700 ">
      <div className="flex flex-row items-center justify-center m-2 w-full scale-70 sm:scale-80 md:scale-100">
        <AnimatedTooltip items={users} />
      </div>

      <select
        value={language}
        className="capitalize text-xs md:text-sm outline-none border-none bg-zinc-500 px-3 py-2 rounded-lg"
        onChange={handleChange}
      >
        {options.map((option) => {
          return (
            <option
              className={`${
                option === language && "bg-zinc-600"
              } hover:bg-zinc-300`}
              key={option}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dropdown;
