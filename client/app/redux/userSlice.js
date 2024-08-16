// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     isAuthenticated: false,
//   },
//   reducers: {
//     login: (state) => {
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { login, logout } = userSlice.actions;
// export default userSlice.reducer;
