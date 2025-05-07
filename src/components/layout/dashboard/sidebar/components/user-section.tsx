import ProfileIcon from "@/components/common/profile-icon";
import Image from "next/image";
import React from "react";
import { LuEllipsisVertical } from "react-icons/lu";

// Define your color options
const avatarColors = ["#0063D0", "#008961", "#753CBF", "#E32083", "#D50000", "#2E2E30"] as const;

// Function to get a consistent color for a user
const getAvatarColor = (userId?: string) => {
  if (!userId) return avatarColors[0];
  const hash = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
};

export default function UserSection({ userData }: { userData?: User }) {
  // Variables
  const avatarColor = getAvatarColor(userData?._id);
  const userInitial = userData?.firstName?.[0]?.toUpperCase() || "U";

  return (
    <div className="w-[255px] h-[70px] pt-4 border-t flex items-center justify-between">
      <div className="flex justify-center items-center">
        {/* Profile picture */}
        <div
          className="w-[54px] h-[54px] rounded-full overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: avatarColor }}
        >
          {userData?.photo ? (
            <Image
              src={userData.photo}
              alt="User profile"
              width={54}
              height={54}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-white text-xl font-bold">{userInitial}</span>
          )}
        </div>

        {/* User data */}
        <div className="ml-[10px] w-[142px]">
          {/* Name */}
          <p className="text-sm font-bold truncate capitalize">
            {userData?.firstName} {userData?.lastName}
          </p>

          {/* Email */}
          <p className="text-xs text-custom-black/50 font-semibold break-all">{userData?.email}</p>
        </div>
      </div>

      {/* Profile menu */}
      <ProfileIcon
        icon={<LuEllipsisVertical className="text-custom-black/50" />}
        links={[{ href: "/profile", label: "profile" }]}
        showSignOut={true}
      />
    </div>
  );
}
