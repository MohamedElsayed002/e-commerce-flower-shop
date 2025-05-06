"use client";

import React from "react";
import NavigationSection from "./components/navigation-section";
import UserSection from "./components/user-section";

export default function Sidebar() {
  return (
    <aside className="w-[303px] flex justify-between items-center flex-col p-6 border-r border-black/8 h-screen">
      <NavigationSection />
      <UserSection />
    </aside>
  );
}
