import React from "react";

import ProfileNavbarRoutes from "@/layout/profile-layout/components/profile-navbar-routes";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="w-full h-full bg-[#0e0e0e] flex items-start gap-4 flex-wrap md:flex-nowrap">
      <ProfileNavbarRoutes />
      <main className="w-full p-3">
        {children}
      </main>
    </div>
  );
};

export default ProfileLayout;
