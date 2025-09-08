"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
    endpoint: "serverImage" | "messageFile";
    value: string;
    onChange: (value: string) => void;
}


export const FileUpload = ({
    endpoint,
    value,
    onChange
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();
    if(fileType && value !== "pdf") {
        return (
            <div className="text-red-500">Invalid file type. Please upload a PDF.</div>
        )
    }
  return (
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res)=> {
        console.log("Files uploaded:", res);
        onChange(res?.[0]?.ufsUrl)
        
    }}
    onUploadError={(error: Error) => {
        console.log("Upload error:", error);
    }}
    />
  )
}

