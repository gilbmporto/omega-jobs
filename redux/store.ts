import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./usersSlice"
import loadingsReducer from "./loadingsSlice"

const store = configureStore({
  reducer: {
    users: usersReducer,
    loadings: loadingsReducer,
  },
})

export default store
