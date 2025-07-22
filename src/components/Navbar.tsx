import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const onLogout = () => {
    localStorage.removeItem(storageKey);
    toast.success("Logged Out Successfully", {
            style: {
              backgroundColor: 'black',
              color: 'white',
            }
          });
    setTimeout(() => {
      location.replace(pathname);
    }, 1500);
  };
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md bg-indigo-700 text-white">
      <ul className="flex items-center justify-between">
        <li className="duration-200 font-semibold text-lg hover:text-indigo-300">
          <NavLink to="/">Home</NavLink>
        </li>
        {userData ? (
          <div className="flex items-center text-indigo-600 space-x-4">
            <li className="duration-200 text-lg">
              <NavLink to="/todos">todos</NavLink>
            </li>
            <li className="duration-200 text-lg">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <button
              className="bg-indigo-500 text-white p-2 rounded-md cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="flex items-center space-x-3">
            <li className="duration-200 font-semibold text-lg hover:text-indigo-300">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="duration-200 font-semibold text-lg hover:text-indigo-300">
              <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
