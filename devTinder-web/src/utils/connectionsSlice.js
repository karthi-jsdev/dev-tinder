import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connecitons",
  initialState: null,
  reducers: {
    addConnecitons: (state, action) => {
      return action.payload;
    },
    removeConnecitons: (state, action) => null,
  },
});

export const {addConnecitons,removeConnecitons} = connectionsSlice.actions
export default connectionsSlice.reducer
