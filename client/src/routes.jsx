import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";

export const router = createBrowserRouter([
    {
        path:"/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        path:"/login",
        element: <HomePage />,
        errorElement: <Error />
    },
    {
        path:"/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        path:"/login",
        element: <LoginPage />,
        errorElement: <Error />
    },

])