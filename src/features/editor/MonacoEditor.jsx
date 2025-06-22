import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CODE_SNIPPETS } from "./constants";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";

function MonacoEditor() {
  const language = useSelector((state) => state.editor.language);
  const { roomId } = useParams();
  const [code, setCode] = useState(CODE_SNIPPETS[language] || "");
  const codeRef = useRef();
  const editorRef = useRef();

  function onMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  useEffect(() => {
    const snippet = CODE_SNIPPETS[language] || "";
    setCode(snippet);
    codeRef.current = snippet;
  }, [language]);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  useEffect(() => {
    function handleCodeUpdate(incomingCode) {
      if (incomingCode !== codeRef.current) {
        setCode(incomingCode);
      }
    }

    socket.on("code-update", handleCodeUpdate);

    return () => {
      socket.off("code-update", handleCodeUpdate);
    };
  }, []);

  function handleChange(value = "") {
    if (!roomId) return;
    setCode(value);

    socket.emit("code-change", { roomId, code: value });
  }

  return (
    <div className="flex-1 overflow-auto">
      <Editor
        key={language}
        height="100%"
        theme="vs-dark"
        language={language}
        defaultValue="//some comment"
        onMount={onMount}
        value={code}
        onChange={handleChange}
      />
    </div>
  );
}

export default MonacoEditor;
