"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutoSize from "react-textarea-autosize";
import { ArrowUpIcon, Loader2Icon, FlaskConical, Zap, ScrollText, Wind, Clapperboard, Music, Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { useCreateMessages } from '@/modules/messages/hooks/message';
import { Spinner } from "@/components/ui/spinner"

const formSchema = z.object({
  content: z.string().min(1, "Content is required").max(300, "Content must be less than 300 characters"),

});


type FormValues = z.infer<typeof formSchema>;

const MessageForm = ({ projectId }: { projectId: string }) => {

  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync, isPending } = useCreateMessages(projectId);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
    mode: "onChange"
  });


  const onSubmit = async (values: FormValues) => {
    try {
      const res = await mutateAsync(values.content);
      toast.success("Message sent Successfully.");
      form.reset();
    } catch (error: any) {
      if (error?.message?.includes("RATE_LIMIT_EXCEEDED")) {
        toast.error("Daily limit reached. Come back tomorrow!");
      } else {
        toast.error("Failed to send Message ");
      }
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className={cn("relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isLoading && "shadow-lg ring-2 ring-primary/20 ")}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <TextAreaAutoSize
              {...field}
              disabled={isPending}
              placeholder='Cook your idea here'
              onFocus={() => setIsLoading(true)}
              onBlur={() => setIsLoading(false)}
              minRows={3}
              maxRows={10}
              className={cn('pt-4 resize-none border-none w-full outline-none bg-transparent', isPending && 'opacity-50')}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            />
          )}
        />
        <div className='flex gap-x-2 items-end justify-between pt-2'>
          <div className='text-[10px] text-muted-foreground font-mono'>
            <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded
              border  bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
              <span>&#8984;</span>Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
            className={cn('size-8 rounded-full', isPending && "bg-muted-foreground border")}
            disabled={isPending}
            type='submit'>
            {
              isPending ? (<Spinner />) : (<ArrowUpIcon className='size-4 ' />)
            }

          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MessageForm;
