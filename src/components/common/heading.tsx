import React from "react";

type HeadingProps = {
  name?: string;
  children: React.ReactNode;
};

// Heading component that accepts a title (children) and an optional name
export default function Heading({ name, children }: HeadingProps) {
  return (
    <div className="mb-7 flex items-center space-x-2">
      {/* Title */}
      <h1 className="text-2xl font-semibold">{children}</h1>

      {/* Optional name  */}
      <p className="text-2xl font-semibold">{name}</p>
    </div>
  );
}
