import { useState, useEffect } from "react";

function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/assets/slider1.jpg",
    "/assets/slider2.jpg",
    "/assets/slider3.jpg",
    "/assets/slider4.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full max-w-[900px] mx-auto mt-6 mb-8 md:pt-16 relative">
      <div className="relative w-full h-[100px] md:h-[150px] overflow-hidden rounded-xl">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
              index === currentImage
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
