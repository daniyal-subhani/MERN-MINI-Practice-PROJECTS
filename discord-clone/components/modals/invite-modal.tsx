"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ModalProvider } from "../providers/modal-provider";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";

const InviteModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isOpenModal = isOpen && type === "invite";
  const origin = useOrigin();
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <div className="">
        <DialogContent className="bg-white  text-black p-0 overflow-hidden ">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-center text-2xl font-bold">
              Invite Friends
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Server Invite Link
            </Label>
            <div className="flex items-center mt-2 gap-x-2 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
              <Input className="bg-zinc-300 border-0 " value={inviteUrl} />
              <Button size={"icon"}>
                <Copy className="w-4 h-4 " />
              </Button>
            </div>
            <Button
              variant={"link"}
              size={"sm"}
              className="text-xs mt-4 text-zinc-400"
            >
              Generate new Link
              <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default InviteModal;
