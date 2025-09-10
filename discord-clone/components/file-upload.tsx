import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
// import "@uploadthing/react/styles.css"
// import "@uploadthing/react/styles.css";

import Image from "next/image";

interface FileUploadProps {
  value: string;
  endpoint: "serverImage" | "messageFile";
  onChange: (url?: string) => void;
}

export const UploadFile = ({ value, endpoint, onChange }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (fileType && value !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Upload result", res);
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log("Error", error);
      }}
      appearance={{
        container:
          "flex flex-col items-center justify-center border-2 border-dashed border-zinc-400 rounded-lg p-6 bg-zinc-50 hover:bg-zinc-100 transition",
        uploadIcon: "w-10 h-10 text-zinc-500 mb-2",
        label: "text-sm font-medium text-zinc-700",
        allowedContent: "text-xs text-zinc-500 mt-1",
        button:
          "mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm",
      }}
    />
  );
};
