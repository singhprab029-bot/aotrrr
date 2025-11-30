import React from "react";

export const VideoSlider = () => {
  const videos = [
    // 🔹 You can paste TikTok or YouTube *video URLs* here
    "https://youtu.be/AMfUlsWhtNc?si=4FY_8T6IXzMmO3I3",
    "https://youtu.be/AMfUlsWhtNc?si=4FY_8T6IXzMmO3I3",
    "https://youtu.be/AMfUlsWhtNc?si=4FY_8T6IXzMmO3I3",
  ];

  return (
    <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
      {videos.map((url, i) => (
        <div
          key={i}
          className="min-w-[260px] md:min-w-[360px] bg-black border border-gray-700 rounded-xl shadow-lg overflow-hidden"
        >
          <iframe
            src={url}
            className="w-full h-40 md:h-56"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ))}
    </div>
  );
};
