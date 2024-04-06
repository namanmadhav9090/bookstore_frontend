import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: {
    userData:{},
    isAuthenticated: false
  },
  reducers: {
    setUser: (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
    },
    logout: (state) => {
        state.isAuthenticated = false;
        state.userData = {}
    }
  },
});

export const {
    setUser,
    logout
} = userSlice.actions;

export default userSlice.reducer;
