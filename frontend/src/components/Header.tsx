import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../store/slice/authSlice";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";


const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

   const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
   const user = useSelector(
    (state: RootState) => state.auth.user
  )
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <header className="sticky top-0 bg-gray-300 text-gray-700 px-4 lg:px-20 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="font-bold text-2xl text-black">
        BlogList
      </Link>

      {/* Middle links (HIDDEN on small screens) */}
      <nav className="hidden md:flex gap-6">
        <Link to={"/my-posts"} className="hover:text-black">
          My Posts
        </Link>
        <Link to="/about" className="hover:text-black">About</Link>
        <Link to="/contact" className="hover:text-black">Contact</Link>
      </nav>

      {/* Right side (Desktop) */}
      <div className="hidden md:flex gap-5 items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/signin" className="hover:text-black">Login</Link>
            <Link to="/signup" className="hover:text-black">Register</Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"
            >
              {user?.name? user.name[0] :'U'}
              
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow rounded">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl font-bold"
        >
          ☰
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded p-3 flex flex-col gap-3">
            <Link to={"/my-posts"}>My Posts</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            {!isAuthenticated ? (
              <>
                <Link to="/signin">Login</Link>
                <Link to="/signup">Register</Link>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
