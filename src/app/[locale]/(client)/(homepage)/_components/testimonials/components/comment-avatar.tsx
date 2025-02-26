import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

export function AvatarDemo({ ImageSrc }: { ImageSrc?: string }) {
  // Translation
  const t = useTranslations();
  return (
    <Avatar className="w-full h-full relative">
      <AvatarImage src={ImageSrc} alt={`${t("user-avatar")}`} className="w-full object-cover" />
      <AvatarFallback>USER</AvatarFallback>
    </Avatar>
  );
}
