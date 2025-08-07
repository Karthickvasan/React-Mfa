// routes.jsx
import LoginPage from "./pages/LoginPages.jsx";
import Verify2FA from "./pages/Verify2FA.jsx";
import Setup2FA from "./pages/Setup2FA.jsx";
import HomePage from "./pages/HomePage.jsx";
import Error from "./pages/ErrorPage.jsx";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path: "/setup-2fa",
        element: <Setup2FA />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <Verify2FA />,
        errorElement: <Error />,
      },
    ],
  },
]);
