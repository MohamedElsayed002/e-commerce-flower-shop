"use client";

import { ImSpinner3 } from "react-icons/im";
import ProfileSettingsForm from "./profile-settings-form";
import { useGetUserData } from "@/hooks/auth/use-profile-data";
import { useTranslations } from "next-intl";

export default function ProfileData() {
  // Translation
  const t = useTranslations();

  // Queries
  const { userData, isLoading, isError, error } = useGetUserData();

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
              <ImSpinner3 />
            </div>
      ) : isError ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {t('failed-to-load-profile-data')}
        </div>
      ) : (
        <ProfileSettingsForm initialData={userData} />
      )}
    </>
  );
}
