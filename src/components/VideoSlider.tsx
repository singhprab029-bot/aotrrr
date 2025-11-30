import React from "react";

// Convert any YouTube URL → embed link
const toEmbed = (url: string) => {
  try {
    // youtu.be/VIDEOID
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // youtube.com/watch?v=VIDEOID
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // youtube.com/shorts/VIDEOID
    if (url.includes("/shorts/")) {
      const id = url.split("/shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url; // fallback
  } catch {
    return url;
  }
};

export const VideoSlider = () => {
  const videos = [
    // ⭐ Paste ANY YouTube link format — auto converts!
    "https://www.youtube.com/watch?v=AMfUlsWhtNc",
    "https://www.youtube.com/watch?v=AMfUlsWhtNc",
    "https://www.youtube.com/watch?v=AMfUlsWhtNc",
  ];

  return (
    <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
      {videos.map((url, i) => (
        <div
          key={i}
          className="min-w-[260px] md:min-w-[360px] bg-black border border-gray-700 rounded-xl shadow-lg overflow-hidden"
        >
          <iframe
            src={toEmbed(url)}
            className="w-full h-40 md:h-56"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ))}
    </div>
  );
};
