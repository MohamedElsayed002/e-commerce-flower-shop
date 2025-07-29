interface HeadingProps {
  name?: string;
  children: React.ReactNode;
}

export default function Heading({ name, children }: HeadingProps) {
  return (
    <div className="mb-6 flex items-center space-x-2">
      <h1 className="text-2xl font-semibold capitalize">{children}</h1>
      <p className="text-2xl font-semibold capitalize">{name}</p>
    </div>
  );
}
