import { createSlice } from "@reduxjs/toolkit";
import { CODE_SNIPPETS } from "./constants";

const language = "javascript";

const initialState = {
  language,
  codeSnippet: CODE_SNIPPETS[language],
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    writeCode(state, action) {
      state.code = action.payload;
    },
    selectLanguage(state, action) {
      state.language = action.payload.lang;
      // state.codeSnippet = action.payload.snippet;
    },
    resetEditor(state) {
      state.language = language;
      state.codeSnippet = CODE_SNIPPETS[language];
    },
  },
});

export const { writeCode, selectLanguage, resetEditor } = editorSlice.actions;

export default editorSlice.reducer;
