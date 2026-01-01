import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type User = {
  id: string
  email: string
  name?: string
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}
const tokenFromStorage = localStorage.getItem("token")
const userFromStorage = localStorage.getItem("user")

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage,
  isAuthenticated: !!tokenFromStorage,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true

      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", action.payload.token)
    },

    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
