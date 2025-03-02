declare type SearchParams = { [key: string]: string | string[] | undefined };

declare type DatabaseFields = {
  _id: string;
  id: string;
  createdAt: string;
};
declare type RouteProps = {
  params: { locale: "en" | "ar" };
  searchParams: SearchParams;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;

declare type SkeletonProps = JSX.IntrinsicElements["div"];
