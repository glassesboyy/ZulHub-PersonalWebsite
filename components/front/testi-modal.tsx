"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import { cn } from "@/lib/utils";
import {
  testimonialFormSchema,
  TestimonialFormValues,
} from "@/lib/validations/testimonial-validation";
import { relationOptions } from "@/types/testimonials";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface TestiModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TestiModal({ open, onOpenChange }: TestiModalProps) {
  const { createTestimonial } = useTestimonials();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      email: "",
      relation: "client",
      message: "",
      isApproved: false,
    },
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    const success = await createTestimonial(
      data.name,
      data.email,
      data.relation,
      data.message
    );
    if (success) {
      setIsSuccess(true);
      form.reset();
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => {
          setIsSuccess(false);
        }, 300);
      }, 5000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[550px] bg-gradient-to-b from-background/90 to-muted/60",
          "transition-all duration-700",
          !isSuccess
            ? "border border-primary/10 hover:brightness-110 hover:border-primary/20"
            : "border border-primary/10"
        )}
      >
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-[Audiowide] tracking-widest text-white uppercase">
                Share Your Experience
              </DialogTitle>
              <DialogDescription className="text-center text-xs text-white/50">
                Your insights help shape my journey and show the value of our
                collaboration. Thank you!
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xs">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-xxxs bg-background/50 border-border/40 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xs">
                        Professional Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-background/50 border-border/40 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xs">
                        How Do You Know Me?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background/50 border-border/40 text-white">
                            <SelectValue placeholder="Select relation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border/40">
                          {relationOptions.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="text-white text-xs hover:bg-muted/50"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xs">
                        Share Your Experience
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          className="bg-background/50 border-border/40 text-white placeholder:text-white/30 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-2">
                  <Button variant="gradient" type="submit" size={"sm"}>
                    Submit Message
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center space-y-2 ">
            <CheckCircle2 className="w-12 h-12 text-white" />
            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-[audioWide] tracking-widest uppercase font-semibold text-primary">
                Testimonial Received!
              </h3>
              <p className="text-xxs text-muted-foreground">
                Thanks a bunch for sharing! It&apos;s now waiting for review
                before being published just to make sure everything&apos;s good
                to go. Appreciate the love!
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
