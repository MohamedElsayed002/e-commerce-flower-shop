declare type SearchParams = { [key: string]: string | string[] | undefined };

declare type LocaleLayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;

declare type RouteProps = {
  params: { locale: "en" | "ar" };
  searchParams: SearchParams;
};

declare type Translations<T> = {
  language: "ar" | "en";
  data: T;
};
