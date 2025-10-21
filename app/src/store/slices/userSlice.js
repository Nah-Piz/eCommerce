import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {
        isLogged: false
    }
}

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        loginUser(state, action) {
            state.user.isLogged = true;
        }
    }
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;