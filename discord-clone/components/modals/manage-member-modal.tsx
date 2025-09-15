"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { UserAvatar } from "../user-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const MemberModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const isOpenModal = isOpen && type === "members";

  const { server } = data as { server: ServerWithMembersWithProfiles };
  const roleWithIcon  = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4  text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <div className="">
        <DialogContent className="bg-white  text-black p-0 overflow-hidden ">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-center text-2xl font-bold">
              Manage Members
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {server?.members.length} Members{" "}
            </DialogDescription>
          </DialogHeader>
          <div>
            {server?.members.map((member) => (
              <div key={member.id} className="flex">
                <UserAvatar src={member.profile?.imageUrl} />
                <div>
                  {member.profile.name}
                  {roleWithIcon[member.role]}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default MemberModal;
