import { createSlice } from "@reduxjs/toolkit";
export const appSlice = createSlice({
    name: 'My redux',
    initialState: {
        count: 0,
        names: 'Redux test'
    }
})


export default appSlice.reducer