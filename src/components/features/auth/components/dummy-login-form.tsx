"use client";

import { useTranslations } from "next-intl";

export default function DummyLoginForm() {
  const t = useTranslations();

  return (
    <div>
      <h1>Dummy Login Form</h1>
      <form>
        <input type="email" placeholder={t("enter-e-mail")} />
        <input type="password" placeholder={t("enter-password")} />
        <button type="submit">{t("login")}</button>
      </form>
    </div>
  );
}