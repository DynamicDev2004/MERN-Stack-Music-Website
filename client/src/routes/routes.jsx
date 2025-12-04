import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import App from "../App";
import DashboardProtector from "../pages/DashboardProtector";
import Home from "../pages/Home";
import ProfileSettings from "../pages/ProfileSettings";
import Dashboard from "../pages/Dashboard";
import Library from "../pages/Library";
import Admin from "../pages/Admin";
import Explore from "../pages/Explore";
import Favourite from "../pages/Favourite";
import Category from "../pages/Category";
import AdminManageSongs from "../components/admin-components/AdminManageSongs";
import CategoryResults from "../pages/CategoryResults";
import Search from "../pages/Search";
import ForgetPassword from "../pages/ForgetPassword";
import Playlist from "../pages/Playlist";
import NotFound from "../pages/404";


const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
    {
      path: '/',
      element: <Navigate to={'/auth/login'}/>
    },
    {
      path: '*',
      element: <Navigate to={'/404'}/>
    },
    {
      path: '/404',
      element: <NotFound/>
    },

      {
        path: "auth",
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          
          },
          {
            path: "forget-password",
            element: <ForgetPassword/>,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardProtector />,
        children: [
          {
            path: "",
            element: <Dashboard />,
            children: [
              {
                path: "",
                element: <Navigate to={"home"} />,
              },
              {
                path: "home",
                element: <Home />,
              },
              {
                path: "explore",
                element: <Explore />,
              },
              {
                path: "library",
                element: <Library />,
              },
              {
                path: "favourite",
                element: <Favourite/>,
              },
              {
                path: "settings",
                element: <ProfileSettings />,
              },
              {
                path: "categories",
                element: <Category />,
              },
              {
                path: "playlists",
                element: <Playlist />,
              },
              {
                path: "search",
                element: <Search/>,
              },
              {
                path: "categories/:keyword",
                element: <CategoryResults/>,
              },
              {
                path: "admin",
                element: <Admin/>,
              },
               {
                  path: 'admin/manage',
                  element: <AdminManageSongs/>
                 }
            ],
          },
        ],
      },
    ],
  },
]);

export default appRoutes;
