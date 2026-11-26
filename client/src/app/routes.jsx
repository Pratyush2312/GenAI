import { Navigate } from "react-router";
import { LoginPage } from "../features/auth/ui/pages/LoginPage.jsx";
import { RegisterPage } from "../features/auth/ui/pages/RegisterPage.jsx";
import { AccountPage } from "../features/auth/ui/pages/AccountPage.jsx";
import {
  GuestRoute,
  ProtectedRoute,
  SessionGate,
} from "../features/auth/UI/components/SessionGate.jsx";
import { ChatPage } from "../features/conversation/UI/pages/ChatPage.jsx";
import { NotFoundPage } from "./NotFoundPage.jsx";

export const routes = [
  {
    element: <SessionGate />,
    children: [
      { path: "/", element: <Navigate to="/chat" replace /> },
      {
        element: <GuestRoute />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/chat", element: <ChatPage /> },
          { path: "/account", element: <AccountPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
