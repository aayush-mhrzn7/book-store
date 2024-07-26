import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    data: null,
  },
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.data = action.payload;
      console.log(action.payload);
      console.log(action);
    },
    logout: (state, _) => {
      state.status = false;
      state.data = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
