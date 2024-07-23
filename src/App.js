import './style.scss';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LeftBar from "./components/leftBar/LeftBar";
import NavBar from "./components/navBar/NavBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Cookies from 'js-cookie';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient()
  const cookieExists = Cookies.get('accessToken') !== undefined
console.log("cookie"+Cookies.get('accessToken'));
  const ProductedRoute = ({children}) =>{
    if(!currentUser){
      console.log("false" + !cookieExists + currentUser);
      return <Navigate to="/login" />
    }
    return children
  }
  const Layout = ()=>{
    return(
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <NavBar />
          <div style={{display:"flex" }}>
            <LeftBar />
            <div style={{flex:6}}> 
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </ QueryClientProvider>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <ProductedRoute>
          <Layout />
        </ProductedRoute>
      ,
      children:[
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
