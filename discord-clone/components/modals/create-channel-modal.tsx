"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormChannelData,
  formChannelSchema,
  FormData,
  formSchema,
} from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFile } from "../file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ModalProvider } from "../providers/modal-provider";
import { ChannelType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateChannelModal = () => {
  const { isOpen, onClose, type } = useModal();

  const router = useRouter();
  const form = useForm<FormChannelData>({
    resolver: zodResolver(formChannelSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });
  const isOpenModal = isOpen && type === "createChannel";

  const onSubmit = async (data: FormChannelData) => {
    try {
      await axios.post("/api/servers", data);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleClose}>
      <div className="">
        <DialogContent className="bg-white  text-black p-0 overflow-hidden ">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-center text-2xl font-bold">
              Create Channel
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Channel Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="!bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          disabled={isLoading}
                          placeholder="Enter channel name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"type"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Channel Type</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-500 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                            <SelectValue placeholder="Select a channel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ChannelType).map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="capitalize"
                            >
                              {type.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button variant={"primary"} disabled={isLoading}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreateChannelModal;
