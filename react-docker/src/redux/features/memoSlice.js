import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    value: [],
};

export const memoSlice = createSlice({
    name: "memo",
    // initialStateは空なので初期状態は空
    initialState,
    // reducerによって前の状態から新しい状態へと変更
    reducers: {
        setMemo: (state, action) => {
            // action.payloadに現在のユーザの状態が入ってくる
            state.value = action.payload;
        },
    },
});

export const {setMemo} = memoSlice.actions;
export default memoSlice.reducer;