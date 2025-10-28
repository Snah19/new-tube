import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { useUser, useClerk } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "@/trpc/client";
import { commentInsertSchema } from "@/db/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

interface CommentFromProps {
  videoId: string;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  variant?: "comment" | "reply",
};

export const CommentForm = ({ videoId, parentId, onCancel, onSuccess, variant = "comment"}: CommentFromProps) => {
  const { user } = useUser();
  const clerk = useClerk();

  const utils = trpc.useUtils();
  const create = trpc.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId });
      utils.comments.getMany.invalidate({ videoId, parentId });
      form.reset();
      toast.success("Comment added.");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Something went wrong");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    }
  });

  const commentFormSchema = commentInsertSchema.omit({ userId: true });
  type CommentFormValues = z.infer<typeof commentFormSchema>;

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      parentId,
      videoId,
      value: ""
    }
  });

  const handleSubmit = (values: CommentFormValues) => {
    create.mutate(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  return (
    <Form {...form}>
      <form className="flex gap-4 group" onSubmit={form.handleSubmit(handleSubmit)}>
        <UserAvatar size="sm" imageUrl={user?.imageUrl || "/user-placeholder.svg"} name={user?.username || "User"} />
        <div className="flex-1">
          <FormField name="value" control={form.control} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className="resize-none bg-transparent overflow-hidden min-h-0" placeholder={ variant === "comment" ? "Add a comment..." : "Reply to this comment..." } {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="justify-end gap-2 mt-2 flex">
            {onCancel && ( <Button variant="ghost" onClick={handleCancel}>Cancel</Button> )}
            <Button type="submit" size="sm" disabled={create.isPending} >{variant === "comment" ? "Comment" : "Reply"}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};