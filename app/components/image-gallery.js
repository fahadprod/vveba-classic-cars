const ImageGallery = () => {
  // Array of image gallery data grouped in rows
  const imageGroups = [
    {
      shelfClass: "gallery-shelf",
      images: [
        { id: 1, src: "/images/gallery-car-1.jpg", className: "gallery-img-1" },
        { id: 2, src: "/images/gallery-car-2.jpg", className: "gallery-img-2" },
        { id: 3, src: "/images/gallery-car-3.jpg", className: "gallery-img-3" }
      ]
    },
    {
      shelfClass: "gallery-shelf",
      images: [
        { id: 4, src: "/images/gallery-car-4.jpg", className: "gallery-img-1" },
        { id: 5, src: "/images/gallery-car-5.jpg", className: "gallery-img-2" },
        { id: 6, src: "/images/gallery-car-6.jpg", className: "gallery-img-3" }
      ]
    }
  ];

  return (
    <div className="wrapper">
      <section className="section-4 target" id="image-gallery">
        <h1 className="section-heading">Image Gallery</h1>
        
        {imageGroups.map((group, groupIndex) => (
          <div key={`image-group-${groupIndex}`} className="gallery center">
            <div className={group.shelfClass}></div>
            {group.images.map((image) => (
              <img
                key={image.id}
                src={image.src}
                className={image.className}
                alt={`Gallery car ${image.id}`}
              />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ImageGallery;