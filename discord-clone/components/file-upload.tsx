"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import "@/uploadthing/react/style.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0]?.ufsUrl);
        }}
        onUploadError={(error: Error) => {
          console.error(
            `Error uploading file to ${endpoint}: ${error.message}`
          );
        }}
      />
    </div>
  );
};
