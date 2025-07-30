"use client";
import { getProductsDiscount } from "@/api/store";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import { Product } from "@/model/model";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";

interface MultiCarouselProps {
  t: (key: string, options?: any) => string;
}

const MultiCarousel: React.FC<MultiCarouselProps> = ({ t }) => {
  const router = useRouter();
  const { user } = useUserContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsWithDiscount = await getProductsDiscount(user.language);
        setProducts(productsWithDiscount);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, [user]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleSelectItem = (id: string) => {
    router.push(`/store/${id}`);
  };

  return (
    <div className="rounded-2xl p-4 ">
      <div>
        <h3 className="text-start pl-4 text-2xl text-white lg:text-3xl mt-3">
          {t("home-products.carrousel-offert.title")}
        </h3>
      </div>
      {error ? (
        <div className="flex items-center justify-center h-full mt-20 select-none">
          <LoadingSpinner />
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      ) : (
        <Carousel
          className="max-h-[50rem] max-w-[80rem]"
          responsive={responsive}
          autoPlay={false}
          autoPlaySpeed={3000}
          infinite={true}
          slidesToSlide={1}
          transitionDuration={500}
        >
          {products.map((product) => (
            <div
              className="group relative flex flex-col justify-between m-4 rounded-lg overflow-hidden p-4 transition-all border border-indigo-500 min-h-[32rem]"
              key={product.id}
              onClick={() => handleSelectItem(product.reference_number)}
            >
              <span className="absolute inset-0 rounded-lg pointer-events-none z-20 border-animation"></span>
              <div className="relative z-10">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="w-full h-[20rem] object-cover transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="mt-2 flex flex-col flex-grow">
                <p className="text-lg text-[#f6a001] mt-2 lg:text-4xl mb-4 pt-4">
                  {product.name}
                </p>
                <p className="text-lg text-gray-200 md:text-xl lg:text-2xl xl:text-xl">
                  {product.category}
                </p>
                <p className="text-lg text-gray-200 md:text-xl lg:text-2xl xl:text-xl">
                  {product.partner}
                </p>
                {product.use_points ? (
                  <p className="text-lg text-[#6396f3] pt-9 lg:text-2xl">
                    {product.price} Points
                  </p>
                ) : (
                  <p className="text-lg text-[#6396f3] pt-9 lg:text-2xl">
                    ${product.price} USD
                  </p>
                )}

                <p className="text-lg text-gray-300 pt-2 lg:text-xl">
                  {product.disclaimer.length > 30
                    ? `${product.disclaimer.slice(0, 30)}...`
                    : product.disclaimer}
                </p>

                {/* El botón siempre se mantiene abajo */}
                <div className="mt-auto">
                  <button className="group relative w-full mt-6 px-6 py-2 text-sm text-indigo-200 border-2 border-indigo-500 rounded-xl font-bold tracking-wide bg-indigo-500 overflow-visible transition duration-300 hover:text-white hover:border-indigo-400 shadow-md hover:shadow-indigo-400/40">
                    {/* Luz expansiva */}
                    <span className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                      <span className="w-0 h-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 group-hover:w-[120%] transition-all duration-500 rounded-full"></span>
                    </span>

                    {/* Rombos */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 border-2 border-indigo-400 rotate-45 bg-indigo-500 z-10 transition duration-300"></span>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 border-2 border-indigo-400 rotate-45 bg-indigo-500 z-10 transition duration-300"></span>
                    <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 border-2 border-indigo-400 rotate-45 bg-indigo-500 z-10 transition duration-300"></span>

                    <span className="relative z-10 text-xl">
                      {t("home-products.carrousel-offert.btn")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MultiCarousel;
