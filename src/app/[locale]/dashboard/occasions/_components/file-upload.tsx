"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdUploadFile } from "react-icons/md";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export function FileUpload({ onFileSelect, accept = "image/*" }: FileUploadProps) {
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-end h-[49px] w-[746px] px-4 rounded-lg border border-input"
        onClick={handleFileClick}
      >
        <span>{fileName}</span>
        <Button
          variant="ghost"
          className="text-custom-rose-900 hover:text-custom-rose-900 hover:bg-transparent"
        >
          <MdUploadFile className="text-gray-500" />
          Upload file
        </Button>
      </div>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={accept}
      />
    </div>
  );
}
