"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, InitialModelSchema } from "@/types";
import { FileUpload } from "@/components/file-upload";

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverName: "",
      serverImage: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = (values: InitialModelSchema) => {
    console.log(values);
  };

  if (!isMounted) return null;

  return (
    <Dialog open>
      <div className="relative">

      <DialogContent className="bg-white text-black p-0 overflow-hidden absolute top-0 bottom-0 left-0 right-0 m-auto w-full max-w-lg h-fit">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Customize Your Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex justify-center items-center text-center ">
                <FormField
                  control={form.control}
                  name="serverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="serverName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-xs uppercase text-zinc-500 dark:text-secondary/70">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-black bg-zinc-300/50 border-0 focus-visible:ring-0  focus-visible:ring-offset-0"
                        {...field}
                        placeholder="Enter server name"
                      />
                    </FormControl>
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
