import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  status: "checking",
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setChecking(state) {
      state.status = "checking";
      state.error = null;
    },
    setSubmitting(state) {
      state.status = "submitting";
      state.error = null;
    },
    setAuthenticated(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = "authenticated";
      state.error = null;
    },
    setAnonymous(state) {
      state.user = null;
      state.accessToken = null;
      state.status = "anonymous";
      state.error = null;
    },
    setAuthError(state, action) {
      state.status = "anonymous";
      state.error = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    }
  }
});

export const {
  setChecking,
  setSubmitting,
  setAuthenticated,
  setAnonymous,
  setAuthError,
  clearAuthError
} = authSlice.actions;

export default authSlice.reducer;
