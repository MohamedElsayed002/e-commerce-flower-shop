import React from "react";
import NavigationSection from "./components/navigation-section";
import UserSection from "./components/user-section";
import { fetchUserData } from "@/lib/apis/auth/profile.api";

export default async function Sidebar() {
  // Variables
  const userData = (await fetchUserData()) || [];

  return (
    <aside className="w-72 flex justify-between items-center flex-col p-6 border-r border-black/8 fixed inset-y-0 left-0 bg-white">
      {/* Navs */}
      <NavigationSection />

      {/* User */}
      <UserSection userData={userData} />
    </aside>
  );
}
