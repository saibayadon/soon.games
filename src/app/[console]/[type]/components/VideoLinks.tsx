import Link from "next/link";

type Video = {
  id: number;
  video_id: string;
};

interface VideoLinksProps {
  videos?: Video[];
}

/**
 * Renders a list of video links for a game
 */
export function VideoLinks({ videos }: VideoLinksProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <>
      {videos.map((video, index) => (
        <Link
          className="mr-2 hover:underline"
          rel="external"
          target="_blank"
          href={`https://youtu.be/${video.video_id}`}
          key={video.video_id}
        >
          video {index}
        </Link>
      ))}
    </>
  );
}
