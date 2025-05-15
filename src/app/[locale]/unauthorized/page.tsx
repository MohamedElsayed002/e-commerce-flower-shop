import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Image */}
      <Image
        src="/assets/images/block.png"
        alt="Unauthorized"
        width={360}
        height={360}
        className="mb-6"
      />

      {/* Text */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        You are not authorized to access this page.
      </h1>

      {/* Text */}
      <p className="text-gray-500 ">If you think this is wrong, please contact support.</p>

      <div className="border-t border-gray-300 my-4 w-full max-w-sm mx-auto" />
      {/* Button */}
      <Link href="/">
        <Button className="bg-wh text-black rounded-lg shadow-sm border px-6 py-2 hover:bg-transparent">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}
