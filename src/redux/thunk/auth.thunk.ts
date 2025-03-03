import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../slice/auth.slice";
import { setUser, clearUser } from "../slice/user.slice";
import { Signup, Login } from "@/interfaces/auth.interface";
import { loginService, signupService } from "@/services/auth.service";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (input: Login, thunkAPI) => {
    const user = await loginService(input);
    thunkAPI.dispatch(login({ token: user.token }));
    localStorage.setItem("token", user.token);
    thunkAPI.dispatch(setUser(user.user));
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (input: Signup, thunkAPI) => {
    const user = await signupService(input);
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(logout());
      thunkAPI.dispatch(clearUser());
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
);
