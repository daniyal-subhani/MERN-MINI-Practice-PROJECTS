"use client";

import React, { useEffect, useState } from "react";
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
import { FormData, formSchema } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFile } from "../file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter()
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("SUBMIT", data);
      await axios.post("/api/servers", data)
      form.reset();
      router.refresh();
      window.location.reload();
      
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open>
      <div className="relative">
        <DialogContent className="bg-white  text-black p-0 overflow-hidden absolute top-0 right-0 left-0 bottom-0 w-full h-fit mx-auto">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-center text-2xl font-bold">
              Customize your server
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give your server a personality with a name and an image. You can
              always change it later.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="flex justify-center items-center text-center">
                  <FormField
                    name="imageUrl"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <UploadFile
                            value={field.value}
                            endpoint="serverImage"
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="!bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          disabled={isLoading}
                          placeholder="Enter server name"
                          {...field}
                        />
                      </FormControl>
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

export default InitialModal;
