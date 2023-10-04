import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";

type ImageSliderProps = {
  images: {
    url: string;
    alt: string;
  }[];
};

/**
 * Renders an image slider component.
 *
 * @param {ImageSliderProps} imageUrls - An array of image URLs.
 * @return {JSX.Element} The rendered image slider component.
 */
function ImageSlider({ images }: ImageSliderProps): JSX.Element {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  return (
    <section
      aria-label="Image-Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <a className="skip-link" href="#after-image-slider-controls">Skip Image SLider Controls</a> {/* skip link */}
      <div
        className=""
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map(({ url, alt }, index) => (
          <img
            className="img-slider-img"
            src={url}
            key={url}
            alt={alt}
            style={{ translate: `${-100 * imageIndex}%` }} // -100% * index. onMove - move 100% left/right
            aria-hidden={imageIndex !== index}
          />
        ))}
      </div>
      <button
        onClick={showPrevImage}
        style={{ left: 0 }}
        className="img-slider-btn"
        aria-label="View Previous Image"
      >
        <ArrowBigLeft aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        style={{ right: 0 }}
        className="img-slider-btn"
        aria-label="View Next Image"
      >
        <ArrowBigRight aria-hidden />
      </button>
      <div
        className=""
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            onClick={() => setImageIndex(index)}
            aria-label={`View Image ${index + 1}`}
          >
            {index === imageIndex ? <CircleDot aria-hidden /> : <Circle />}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls"/>
    </section>
  );
}
export default ImageSlider;
