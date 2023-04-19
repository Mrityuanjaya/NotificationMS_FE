import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loginStatus: false,
        systemAdminStatus: false,
    },
    reducers: {
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
        setSystemAdminStatus: (state, action) => {
            state.systemAdminStatus = action.payload;
        },
    },
});

export const { setLoginStatus, setSystemAdminStatus } = userSlice.actions;
export default userSlice.reducer;
