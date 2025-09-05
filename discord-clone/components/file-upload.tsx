"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import "@/app/globals.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <UploadDropzone
      className="ut-upload-dropzone:p-4 ut-upload-dropzone:rounded-lg ut-upload-dropzone:bg-gray-100 ut-upload-dropzone:border-dashed ut-upload-dropzone:border-gray-300"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log(res);

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
