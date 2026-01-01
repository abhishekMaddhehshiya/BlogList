import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { type RootState } from "../store"
import type { JSX } from "react"

const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
  const isAuth = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  return isAuth ? children : <Navigate to="/signin" replace />
}

export default PrivateRoutes
