import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loginStatus: false,
        systemAdminStatus: false,
        loadingStatus: false
    },
    reducers: {
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
        setSystemAdminStatus: (state, action) => {
            state.systemAdminStatus = action.payload;
        },
        setLoadingStatus: (state, action) => {
            state.loadingStatus = action.payload;
        }
    },
});

export const { setLoginStatus, setSystemAdminStatus, setLoadingStatus } = userSlice.actions;
export default userSlice.reducer;
