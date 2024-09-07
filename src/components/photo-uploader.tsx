import React, { useState } from "react";
import { Button } from "./ui/button";
import unknown from "../assets/unknown.jpeg";

interface ProfilePhotoUploaderProps {
  getProfilePhoto: (photo: string) => void;
}

const ProfilePhotoUploader = ({
  getProfilePhoto,
}: ProfilePhotoUploaderProps) => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("profilePhoto", base64String);
        setProfilePhoto(base64String);
        getProfilePhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-start gap-5">
      <img
        src={profilePhoto ? profilePhoto : unknown}
        alt="Profile"
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />
      <div className="flex flex-col items-start gap-2">
        <Button variant={"primary"} type="button">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="bg-transparent"
          />
        </Button>
      </div>
    </div>
  );
};

export default ProfilePhotoUploader;
