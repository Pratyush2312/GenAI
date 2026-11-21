import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./features/auth/hooks/useAuth.js";
import AccountPage from "./features/auth/ui/AccountPage.jsx";
import LoginPage from "./features/auth/ui/LoginPage.jsx";
import RegisterPage from "./features/auth/ui/RegisterPage.jsx";

export default function App() {
  const { status, user, error, login, register, logout, clearError } = useAuth();

  if (status === "checking") {
    return (
      <main className="grid min-h-screen place-items-center bg-canvas">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent/20 border-t-accent" aria-label="Loading session" />
      </main>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <AccountPage user={user} onLogout={logout} error={error} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onSubmit={login} onClearError={clearError} error={error} isLoading={status === "submitting"} />
          )
        }
      />
      <Route
        path="/register"
        element={
          user ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage onSubmit={register} onClearError={clearError} error={error} isLoading={status === "submitting"} />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
