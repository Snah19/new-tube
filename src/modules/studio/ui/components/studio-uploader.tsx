import { Button } from "@/components/ui/button";
import MuxUploader, { MuxUploaderDrop, MuxUploaderFileSelect, MuxUploaderProgress, MuxUploaderStatus } from "@mux/mux-uploader-react";
import { UploadIcon } from "lucide-react";

interface StudioUploaderProps {
  endpoint?: string | null;
  onSuccess: () => void;
};

const UPLOADER_ID = "video-uploader";

export const StudioUploader = ({ endpoint, onSuccess }: StudioUploaderProps) => {
  return (
    <div>
      <MuxUploader className="hidden group/uploader" onSuccess={onSuccess} endpoint={endpoint} id={UPLOADER_ID} />
      <MuxUploaderDrop className="group/drop" muxUploader={UPLOADER_ID} >
        <div className="flex flex-col items-center gap-6" slot="heading">
          <div className="flex justify-center items-center gap-2 w-32 h-32 rounded-full bg-muted">
            <UploadIcon className="size-10 text-muted-foreground group/drop-[&[active]]:animate-bounce transition-all duration-300" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm">Drag and drop video files to upload</p>
            <p className="text-xs text-muted-foreground">Your videos will be private until you publish them</p>
          </div>
          <MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
            <Button className="rounded-full" type="button">
              Select file
            </Button>
          </MuxUploaderFileSelect>
        </div>
        <span className="hidden" slot="separator" />
        <MuxUploaderStatus className="text-sm" muxUploader={UPLOADER_ID} />
        <MuxUploaderProgress className="text-sm" muxUploader={UPLOADER_ID} type="percentage" />
        <MuxUploaderProgress muxUploader={UPLOADER_ID} type="bar" />
      </MuxUploaderDrop>
    </div>
  );
};