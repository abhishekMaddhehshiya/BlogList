import { Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Layout from "./pages/Layout"
import PublicRoutes from "./components/PublicRoutes"
import PrivateRoutes from "./components/PrivateRoutes"

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyPosts from "./pages/MyPosts"
import BlogDetails from "./pages/BlogDetails"

function App() {
  return (
    <Routes>

      {/* Public routes */}
      <Route
        path="/signin"
        element={
          <PublicRoutes>
            <SignIn />
          </PublicRoutes>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoutes>
            <SignUp />
          </PublicRoutes>
        }
      />

      {/* Protected layout */}
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Layout />
          </PrivateRoutes>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="my-posts" element={<MyPosts />} />
        <Route path="blog/:id" element={<BlogDetails/>}/>
      </Route>

    </Routes>
  )
}

export default App
