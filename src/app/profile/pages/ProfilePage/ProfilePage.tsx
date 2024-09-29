import { useState } from "react";

import { Button } from "@/components/ui/button";
import UserDetails from "./components/user-details";
import UserForm from "./components/user-form";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      {!isEditing && (
          <div className="flex items-start gap-5 mt-5 w-full flex-wrap-reverse md:flex-nowrap">
            <UserDetails/>
            <Button variant={"primary"} onClick={handleEditProfile} className="ml-auto ">Edit Profile</Button>
          </div>
      )}
      {isEditing && (
        <div className="flex items-start gap-5 mt-5 w-full">
          <UserForm handleEditProfile={handleEditProfile}/>
          <Button variant={"destructive"} onClick={handleEditProfile}>Cancel</Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
