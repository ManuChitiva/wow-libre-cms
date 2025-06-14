"use client";
import { getBanners } from "@/api/advertising";
import { useUserContext } from "@/context/UserContext";
import { Banners } from "@/model/banners";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Advertising = () => {
  const [banners, setBanners] = useState<Banners[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUserContext();

  const fallbackBanners: Banners[] = [
    {
      id: 1,
      media_url:
        "https://static.wixstatic.com/media/5dd8a0_0dfa86d27a7a4811a5ff1b8ff6f781a0~mv2.webp",
      alt: "wowlibre_banner_one",
      language: "en",
      type: "IMAGE",
      label: "",
    },
    {
      id: 2,
      media_url:
        "https://static.wixstatic.com/media/5dd8a0_fd654b79b6024904bed55815fe7da54d~mv2.webp",
      alt: "wowlibre_banner_two",
      language: "es",
      type: "IMAGE",
      label: "",
    },
    {
      id: 3,
      media_url:
        "https://static.wixstatic.com/media/5dd8a0_21a165a3316e459f88b1b47e3ff0c4d0~mv2.webp",
      alt: "wowlibre_banner_three",
      language: "es",
      type: "IMAGE",
      label: "",
    },
  ];

  const videoBanners = banners.filter((b) => b.type === "VIDEO");

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const fetchedBanners = await getBanners(user.language);
        if (fetchedBanners.length > 0) {
          setBanners(fetchedBanners);
        } else {
          setBanners(fallbackBanners);
        }
      } catch (error) {
        setBanners(fallbackBanners);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [user]);

  useEffect(() => {
    if (videoBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videoBanners.length);
    }, 16000);

    return () => clearInterval(interval);
  }, [videoBanners]);

  if (loading) {
    return (
      <div className="mt-10 flex justify-center items-center">
        <Carousel
          showArrows
          infiniteLoop
          autoPlay
          interval={9000}
          showThumbs={false}
          dynamicHeight={false}
          showIndicators={false}
          showStatus={false}
          width={"100%"}
        >
          {fallbackBanners.map((banner, index) => (
            <div key={index} className="relative">
              <img
                src={banner.media_url}
                alt={banner.alt}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "50rem",
                }}
                className="rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

  if (videoBanners.length > 0) {
    const currentBanner = videoBanners[currentIndex];

    return (
      <div className="relative w-full h-[600px] overflow-hidden mt-5 border-none rounded-lg">
        <video
          key={currentBanner.id}
          src={currentBanner.media_url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-white text-7xl font-bold bg-black/40 title-server">
          {currentBanner.label}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 flex justify-center items-center">
      <Carousel
        showArrows
        infiniteLoop
        autoPlay
        interval={9000}
        showThumbs={false}
        dynamicHeight={false}
        showIndicators={false}
        showStatus={false}
        width={"100%"}
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <img
              src={banner.media_url}
              alt={banner.alt}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "60rem",
              }}
              className="rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Advertising;
