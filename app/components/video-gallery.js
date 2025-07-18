const VideoGallery = () => {
  // Array of video data grouped in rows
  const videoGroups = [
    [
      { id: 1, src: "/images/car-video-1.mp4" },
      { id: 2, src: "/images/car-video-2.mp4" },
      { id: 3, src: "/images/car-video-3.mp4" }
    ],
    [
      { id: 4, src: "/images/car-video-4.mp4" },
      { id: 5, src: "/images/car-video-5.mp4" },
      { id: 6, src: "/images/car-video-6.mp4" }
    ]
  ];

  return (
    <div className="wrapper">
      <section className="section-3 target" id="video-gallery">
        <h1 className="section-heading">Video Gallery</h1>
        
        {videoGroups.map((videoGroup, groupIndex) => (
          <div key={`video-group-${groupIndex}`} className="videos-wrapper center">
            {videoGroup.map((video) => (
              <video 
                key={video.id}
                src={video.src}
                muted 
                loop 
                className="video"
              />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default VideoGallery;