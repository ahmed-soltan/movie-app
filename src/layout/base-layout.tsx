import React from "react";

import Header from "./header/header";
import Footer from "./footer/footer";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-[#0e0e0e]">
      <Header />
      <main className="w-full max-w-[1700px] mx-auto h-full min-h-screen py-[160px] md:py-[100px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
