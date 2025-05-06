import React from "react";
import { LuEllipsisVertical } from "react-icons/lu";

export default function UserSection() {
  return (
    <div className="w-[255px] h-[70px] pt-4 border-t flex items-center justify-between">
        {/* Profile picture */}
        <div className="flex justify-center items-center">
        <div className="w-[54px] h-[54px] rounded-full bg-blue-600"></div>
        <div className="ml-[10px]">
          <p className="text-sm font-bold">Firstname Lastname</p>
          <p className="text-xs text-custom-black/50 font-semibold">useremail@example.com</p>
        </div>
        </div>
        <LuEllipsisVertical className="text-custom-black/50" />
    </div>
  );
}
