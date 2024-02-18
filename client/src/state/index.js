import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    accessToken: null,
    refreshToken: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setLogout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        
    }
})

export const { setLogin, setLogout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;