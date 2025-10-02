// import { useState, useEffect } from "react";

// function ImageSlider() {
//   const [currentImage, setCurrentImage] = useState(0);
//   const images = [
//     "/assets/slider1.jpg",
//     "/assets/slider2.jpg",
//     "/assets/slider3.jpg",
//     "/assets/slider4.jpg",
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 10000);

//     return () => clearInterval(timer);
//   }, [images.length]);

//   return (
//     <div className="w-full max-w-[950px] mx-auto mt-4 mb-8 md:pt-16 relative">
//       <div className="relative w-full h-[100px] md:h-[150px] overflow-hidden rounded-xl">
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
//               index === currentImage
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-full"
//             }`}
//           >
//             <img
//               src={img}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ImageSlider;

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = [
    "/assets/slider1.jpg",
    "/assets/slider2.jpg",
    "/assets/slider3.jpg",
    "/assets/slider4.jpg",
  ];

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index) => {
    setCurrentImage(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextImage();
    }, 5000); // Reducido a 5 segundos para mejor UX

    return () => clearInterval(timer);
  }, [nextImage, isPaused]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 mb-12 md:mt-8 md:mb-16 lg:mt-12 lg:mb-20 relative">
      <div
        className="relative w-full h-28 sm:h-28 md:h-32 lg:h-40 xl:h-48 overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out transform ${
              index === currentImage
                ? "opacity-100 translate-x-0 scale-100"
                : index < currentImage
                ? "opacity-0 -translate-x-full scale-95"
                : "opacity-0 translate-x-full scale-95"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}

        {/* Botones de navegación */}
        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 md:opacity-100"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 md:opacity-100"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        {/* Estado de pausa */}
        {isPaused && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium animate-fade-in">
            Pausado
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageSlider;
