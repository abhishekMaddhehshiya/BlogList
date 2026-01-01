import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { type RootState } from "../store"
import type { JSX } from "react"

export default function PublicRoutes({
  children,
}: {
  children: JSX.Element
}) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
