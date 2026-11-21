import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi, getAuthError } from "../api/authApi.js";
import {
  clearAuthError,
  setAnonymous,
  setAuthenticated,
  setAuthError,
  setChecking,
  setSubmitting
} from "../state/authSlice.js";

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const sessionRequest = useRef(null);

  useEffect(() => {
    let active = true;
    sessionRequest.current ??= authApi.refresh();
    sessionRequest.current
      .then((session) => {
        if (active) dispatch(setAuthenticated(session));
      })
      .catch(() => {
        if (active) dispatch(setAnonymous());
      });
    return () => {
      active = false;
    };
  }, [dispatch]);

  const authenticate = async (operation, values) => {
    dispatch(setSubmitting());
    try {
      const session = await operation(values);
      dispatch(setAuthenticated(session));
    } catch (error) {
      dispatch(setAuthError(getAuthError(error)));
    }
  };

  const login = (credentials) => authenticate(authApi.login, credentials);
  const register = (details) => authenticate(authApi.register, details);

  const logout = async () => {
    dispatch(setChecking());
    try {
      await authApi.logout();
      dispatch(setAnonymous());
    } catch (error) {
      dispatch(setAuthError(getAuthError(error)));
    }
  };

  return {
    ...auth,
    login,
    register,
    logout,
    clearError: () => dispatch(clearAuthError())
  };
}
