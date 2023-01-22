import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: {} };

export const userSlice = createSlice({
    name: "user",
    // initialStateは空なので初期状態は空
    initialState,
    // reducerによって前の状態から新しい状態へと変更
    reducers: {
        setUser: (state, action) => {
            // action.payloadに現在のユーザの状態が入ってくる
            state.value = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;