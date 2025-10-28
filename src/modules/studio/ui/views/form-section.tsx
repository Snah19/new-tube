"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CopyCheckIcon, CopyIcon, Globe2Icon, ImagePlusIcon, LockIcon, MoreVerticalIcon, RotateCcwIcon, SparklesIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { videoUpdateSchema } from "@/db/schema";
import { toast } from "sonner";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constant";
import { ThumbnailUploadModal } from "../components/thumbnail-upload-modal";
import { APP_URL } from "@/constants";

interface FormSectionProps {
  videoId: string;
};

export const FormSection = ({ videoId }: FormSectionProps) => {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const FormSectionSkeleton = () => {
  return (
    <p>Loading</p>
  );
};

const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
  const router = useRouter();
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const [thumbnailModelOpen, setThumbnailModalOpen] = useState(false);

  const utils = trpc.useUtils();

  const update = trpc.videos.update.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate();
      toast.success("Video updated");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const remove = trpc.videos.remove.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      toast.success("Video deleted");
      router.push("/studio");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const revalidate = trpc.videos.revalidate.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Video revalidated");
    }
  });

  const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Thumbnail restored");
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  });

  const form = useForm<z.infer<typeof videoUpdateSchema>>({
    resolver: zodResolver(videoUpdateSchema),
    defaultValues: video,
  });

  const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
    await update.mutateAsync(data);
  }

  // TODO: Change if deploying outside of VERCEL
  const fullUrl = `${APP_URL || "http://localhost:3000"}/videos/${videoId}`;
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <ThumbnailUploadModal open={thumbnailModelOpen} onOpenChange={setThumbnailModalOpen} videoId={videoId} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Video details</h1>
              <p className="text-xs text-muted-foreground">Manage your video details</p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={update.isPending}>Save</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => revalidate.mutate({ id: videoId })}>
                    <RotateCcwIcon className="size-4 mr-2" />
                    Revalidate
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => remove.mutate({ id: videoId })}>
                    <TrashIcon className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-8">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title
                    {/* TODO: Add AI generate button */}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Add a title to your video" />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description
                    {/* TODO: Add AI generate button */}
                  </FormLabel>
                  <FormControl>
                    <Textarea className="pr-10 resize-none" {...field} value={field.value ?? ""} rows={10} placeholder="Add a description to your video" />
                  </FormControl>
                </FormItem>
              
              )} />
              
              <FormField name="thumbnailUrl" control={form.control} render={() => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <div className="relative w-[153px] h-[84px] p-0.5 border border-dashed border-neutral-400 group">
                      <Image className="object-cover" src={video.thumbnailUrl ?? THUMBNAIL_FALLBACK} alt="Thumbnail" fill />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="absolute right-1 size-7 rounded-full bg-black/50 hover:bg-black/50 opacity-100 md:opacity-0 group-hover:opacity-100 duration-300" type="button" size="icon">
                            <MoreVerticalIcon className="text-white" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" side="right">
                          <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
                            <ImagePlusIcon className="size-4 mr-1" />
                            Change
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <SparklesIcon className="size-4 mr-1" />
                            AI-generated
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => restoreThumbnail.mutate({ id: videoId })}>
                            <RotateCcwIcon className="size-4 mr-1" />
                            Restore
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="categoryId" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>         
              )} />
            </div>

            <div className="flex flex-col gap-y-8 lg:col-span-2">
              <div className="flex flex-col gap-4 h-fit rounded-xl overflow-hidden bg-[#F9F9F9]">
                <div className="relative aspect-video overflow-hidden">
                  <VideoPlayer playbackId={video.muxPlaybackId} thumbnailUrl={video.thumbnailUrl}  />
                </div>
                <div className="flex flex-col gap-y-6 p-4">
                  <div className="flex justify-between items-center gap-x-2">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-xs text-muted-foreground">Video link</p>
                      <div className="flex items-center gap-x-2">
                        <Link href={`/videos/${video.id}`}>
                          <p className="text-sm text-blue-500 line-clamp-1">{fullUrl}</p>
                        </Link>
                        <Button className="shrink-0" type="button" variant="ghost" size="icon" onClick={onCopy} disabled={isCopied}>
                          {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-xs text-muted-foreground">Video status</p>
                      <p className="text-sm capitalize">{video.muxStatus}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-xs text-muted-foreground">Subtitles status</p>
                      <p className="text-sm capitalize">{video.muxTrackStatus || "No subtitles"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <FormField control={form.control} name="visibility" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Visibility
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value ? `${field.value}` : undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center" >
                            <Globe2Icon className="size-4 mr-2" />
                            <span>Public</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center">
                            <LockIcon className="size-4 mr-2" />
                            <span>Private</span>
                          </div>
                        </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>         
              )} />

            </div>
          </div>
        </form>
      </Form>
    </>
  );
};