
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoutes from "./ProtectedRoutes";
import RecipeList from "../components/pages/recipe/RecipeList";
import { Login } from "../components/pages/auth/Login";
import { Signup } from "../components/pages/auth/Signup";
import { RecipeDetails } from "../components/pages/recipe/RecipeDetails";
import { RecipeForm } from "../components/pages/recipe/RecipeForm";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/recipe/list",
        element: <ProtectedRoutes><RecipeList /></ProtectedRoutes>,
      },
      {
        path: "/recipe/add",
        element: <ProtectedRoutes><RecipeForm /></ProtectedRoutes>,
      },
      {
        path: "/recipe/edit/:id",
        element: <ProtectedRoutes><RecipeForm /></ProtectedRoutes>,
      },
      {
        path: "/recipe/:id",
        element: <ProtectedRoutes><RecipeDetails /></ProtectedRoutes>,
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
      
    ],
  },
]);
