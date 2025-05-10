import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const ImageSlide = ({ images, imageUrl, name }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(imageUrl);
 
  const imagesLi = images.length > 0 ? images : [imageUrl];

  // Handle "Next" button click
  const nextSlide = () => {
    const newIndex =
      currentImageIndex === imagesLi.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(imagesLi[newIndex]);
  };

  // Handle "Previous" button click
  const prevSlide = () => {
    const newIndex =
      currentImageIndex === 0 ? imagesLi.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(imagesLi[newIndex]);
  };

  return (
    <section className="relative flex flex-col items-center w-full max-w-3xl mx-auto">
      {/* Main Image */}
      <div className="relative w-full  overflow-hidden rounded-lg">
        <img
          src={selectedImage || "/placeholder-image.jpg"}
          alt={name || "Product Image"}
          className=" rounded-lg w-full  object-contain md:object-cover transition-opacity duration-300"
          loading="lazy"
        />
        {/* Navigation Arrows */}
        {imagesLi.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-[65%] transform -translate-y-1/2 bg-white text-gray-800 w-12 h-12 p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Previous image"
            >
              <HiChevronLeft className="w-full h-full" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-[65%] transform -translate-y-1/2 bg-white text-gray-800 w-12 h-12 p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              aria-label="Next image"
            >
              <HiChevronRight className="w-full h-full" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default ImageSlide;
