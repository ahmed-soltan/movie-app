import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

import { toast } from "@/components/ui/use-toast";
import { delay } from "@/utils/delay";

export interface UserState {
  id: string;
  username: string;
  email: string;
  password: string;
  photoUrl?: string;
  isLoggedIn?: boolean;
}

interface UsersState {
  users: UserState[];
}

const initialState: UsersState = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser: (
      state,
      action: PayloadAction<Omit<UserState, "id" | "photoUrl">>
    ) => {
      delay(1000);
      
      const users = state.users;
      const existingUser = users.find(
        (user) => user.email === action.payload.email
      );

      if (existingUser) {
        toast({
          title: "Email already exists",
          description: "Please use a different email",
          variant: "destructive",
        });
        return;
      }

      const hashedPassword = bcrypt.hashSync(action.payload.password, 10);

      const newUser: UserState = {
        id: uuid(),
        photoUrl: "",
        ...action.payload,
        password: hashedPassword,
        isLoggedIn: false,
      };

      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));

      toast({
        title: "Account Created successfully",
        variant: "success",
      });
    },

    loginUser: (
      state,
      action: PayloadAction<Omit<UserState, "id" | "username">>
    ) => {
      delay(1000);

      const users = state.users;
      const user = users.find((u) => u.email === action.payload.email);

      if (!user) {
        toast({
          title: "Invalid Email or password",
          description: "Please check your credentials",
          variant: "destructive",
        });
        throw new Error("Invalid email or password")      
      }

      if (bcrypt.compareSync(action.payload.password , user.password)) {
        user.isLoggedIn = true;
        localStorage.setItem("currentUser", JSON.stringify(user));

        toast({
          title: "Logged in successfully",
          variant: "success",
        });

        return
      }

      toast({
        title: "Invalid Email or password",
        description: "Please check your credentials",
        variant: "destructive",
      });
      throw new Error("Invalid email or password")      
    },
  },
});

export const { registerUser, loginUser } = usersSlice.actions;

export default usersSlice.reducer;
