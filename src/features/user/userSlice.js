import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  roomId: "",
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    joinRoom(state, action) {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    leaveRoom(state) {
      state.name = "";
      state.roomId = "";
    },
  },
});

export const { joinRoom, setUsers, leaveRoom } = userSlice.actions;

export default userSlice.reducer;
