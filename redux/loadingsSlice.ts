import { createSlice } from "@reduxjs/toolkit"

const loadingsSlice = createSlice({
  name: "loadings",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      return { ...state, isLoading: action.payload }
    },
  },
})

export const { setIsLoading } = loadingsSlice.actions

export default loadingsSlice.reducer
