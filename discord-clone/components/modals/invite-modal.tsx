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
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useEffect, useState } from "react";
import axios from "axios";

const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const isOpenModal = isOpen && type === "invite";
  const origin = useOrigin();
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
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
              Invite Friends
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Server Invite Link
            </Label>
            <div className="flex items-center mt-2 gap-x-2 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
              <Input
                disabled={isLoading}
                className="bg-zinc-300 border-0 "
                value={inviteUrl}
              />
              <Button onClick={onCopy} disabled={isLoading} size={"icon"}>
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4 " />
                )}
              </Button>
            </div>
            <Button
            onClick={onNew}
              disabled={isLoading}
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
