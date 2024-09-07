import { toast } from "@/components/ui/use-toast";
import { UserState } from "@/features/user/userSlice";
import { delay } from "@/utils/delay";

export const useUser = () => {
  let user: UserState | null = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")!)
    : null;


    const updateUserProfile = (userData: Partial<UserState>) => {
      delay(1000);
    
      if (!user) {
        return null;
      }
    
      const updatedUser: UserState = {
        id: user.id,
        username: userData.username || user.username,
        email: userData.email || user.email,
        password: user.password,
        photoUrl: userData.photoUrl || user.photoUrl,
        isLoggedIn: user.isLoggedIn,
      };
    
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
      const users = JSON.parse(localStorage.getItem("users") || "[]");
    
      const userIndex = users.findIndex((u: UserState) => u.id === updatedUser.id);
    
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
    
      user = updatedUser;
    
      toast({
        title: "Profile updated",
        variant: "success",
      });
    
      return updatedUser;
    };
    

  const logoutUser = () => {
    delay(1000);

    if (!user) {
      return null;
    }

    localStorage.removeItem("currentUser");
    toast({
      title: "User logged out",
      variant: "destructive",
    });
  };

  return {
    user,
    updateUserProfile,
    logoutUser,
  };
};
