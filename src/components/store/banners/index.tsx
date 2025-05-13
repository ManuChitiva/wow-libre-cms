"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const banners = [
  {
    image:
      "https://static.wixstatic.com/media/5dd8a0_6d93485a4fdc487fbcb817551ebae3a8~mv2.jpg",
    alt: "Store Discount",
  },
  {
    image:
      "https://static.wixstatic.com/media/5dd8a0_128b337290694ac7b65fa74b7e513744~mv2.jpg",
    alt: "Store Discount",
  },
];

const AdvertisingStore = () => {
  return (
    <div className="mt-4">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={9000}
        showThumbs={false}
        dynamicHeight={false}
        showIndicators={true}
        showStatus={false}
        width={"100%"}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative"
            style={{
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "45rem",
              }}
              className="rounded-2xl"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdvertisingStore;
