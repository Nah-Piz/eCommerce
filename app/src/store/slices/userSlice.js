import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {
        isLogged: false,
        displayModalNow: false
    }
}

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        loginUser(state, action) {
            state.user.isLogged = true;
        },
        displayModal(state, action) {
            state.user.displayModalNow = action.payload;
        },
        logoutAction(state, action) {
            state.user.isLogged = false;
        }
    }
});

export const { loginUser,displayModal,logoutAction } = userSlice.actions;

export default userSlice.reducer;