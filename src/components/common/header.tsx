import { useTranslations } from "next-intl";

export function Header({ title }: { title: string }) {
  const t = useTranslations();
  return <h1 className="text-2xl font-bold">{t(title)}</h1>;
}
