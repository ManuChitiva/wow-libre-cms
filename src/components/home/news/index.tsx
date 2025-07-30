"use client";
import { getNews } from "@/api/news";
import LoadingSpinnerCentral from "@/components/utilities/loading-spinner-v2";
import { NewsModel } from "@/model/News";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const LatestNewsCarousel = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33);
  const [slideSize, setSlideSize] = useState({
    width: "250px",
    height: "200px",
  });
  const [newsItems, setNewsItems] = useState<NewsModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const updateSizes = () => {
      if (window.innerWidth < 640) {
        setCenterSlidePercentage(80);
        setSlideSize({ width: "90vw", height: "180px" });
      } else if (window.innerWidth < 1024) {
        setCenterSlidePercentage(45);
        setSlideSize({ width: "45vw", height: "200px" });
      } else {
        setCenterSlidePercentage(33);
        setSlideSize({ width: "250px", height: "200px" });
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await getNews(10, 0);
        setNewsItems(data);
        setError(data.length === 0);
      } catch (err: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <LoadingSpinnerCentral />;
  if (error) return null;

  const hasMultiple = newsItems.length > 1;
  const useCenterMode = newsItems.length > 5;

  return (
    <div className="bg-midnight contenedor  mt-10 text-white px-4 py-6 sm:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-left pl-2 title-server">
        Noticias y Actualizaciones
      </h2>
      <Carousel
        showArrows={hasMultiple}
        infiniteLoop={hasMultiple}
        autoPlay={hasMultiple}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showIndicators={hasMultiple}
        centerMode={useCenterMode}
        centerSlidePercentage={useCenterMode ? centerSlidePercentage : 100}
        swipeable={hasMultiple}
        emulateTouch={hasMultiple}
      >
        {newsItems.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} passHref>
            <div
              className="block rounded-lg shadow-lg relative flex-shrink-0 mx-1 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer"
              style={{
                backgroundImage: `url(${item.img_url})`,
                height: slideSize.height,
                width: useCenterMode ? slideSize.width : "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg transition-opacity duration-300 ease-in-out hover:opacity-90" />
              <div className="absolute bottom-4 left-4 text-xl md:text-lg">
                <h3 className="text-yellow-400  font-semibold">{item.title}</h3>
                <p className="text-gray-300">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default LatestNewsCarousel;
