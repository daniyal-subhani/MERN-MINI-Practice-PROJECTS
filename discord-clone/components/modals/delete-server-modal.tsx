"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ModalProvider } from "../providers/modal-provider";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteServerModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const isOpenModal = isOpen && type === "deleteServer";
  const { server } = data;
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`), onClose();
      router.refresh();
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <div className="">
        <DialogContent className="bg-white  text-black p-0 overflow-hidden ">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-center text-2xl font-bold">
              Delete Server
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to do this ? {" "}
              <span>{server?.name}</span> will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"ghost"} disabled={isLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button variant={"primary"} disabled={isLoading} onClick={onDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DeleteServerModal;
