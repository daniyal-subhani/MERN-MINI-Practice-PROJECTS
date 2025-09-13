"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormData, formSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFile } from "../file-upload";
import { Input } from "../ui/input";
import ServerModal from "../modals/create-server-modal";
import InviteModal from "../modals/invite-modal";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, type } = useModal();
  console.log("Navbar render — isOpen:", isOpen, "type:", type);

  useEffect(() => {
    setIsMounted(true);
    console.log("IsOpen", isOpen);
    console.log(isMounted);
  }, []);
  const form= useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    }
  })

  if (!isMounted) return null;

  return (
    <>
     <ServerModal />
     <InviteModal />
    </>
  );
};
