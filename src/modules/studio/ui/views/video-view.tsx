import { FormSection } from "./form-section";

interface VideoViewProps {
  videoId: string;
};

export const VideoView = ({ videoId }: VideoViewProps) => {
  return (
    <div className="max-w-screen-lg pt-2.5 px-4">
      <FormSection videoId={videoId} />
    </div>
  );
};