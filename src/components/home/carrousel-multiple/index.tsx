"use client";
import { getProductsDiscount } from "@/api/store";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import { Product } from "@/model/model";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
              className="flex flex-col m-4 rounded-lg overflow-hidden p-4 transition-all"
              key={product.id}
              onClick={() => handleSelectItem(product.reference_number)}
            >
              <div className="relative">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="w-full h-[20rem] object-cover transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="mt-2">
                <p className="text-lg text-[#f6a001] mt-2 lg:text-4xl mb-4 pt-4">
                  {product.name}
                </p>
                <p className="text-lg text-gray-200  md:text-xl lg:text-2xl xl:text-xl">
                  {product.category}
                </p>
                <p className="text-lg text-gray-200  md:text-xl lg:text-2xl xl:text-xl">
                  {product.partner}
                </p>
                {product.use_points ? (
                  <p className="text-lg text-[#6396f3] pt-9 lg:text-2xl">
                    {product.price} Points
                  </p>
                ) : (
                  <p className="text-lg text-[#6396f3]  pt-9 lg:text-2xl">
                    ${product.price} USD
                  </p>
                )}

                <p className="text-lg text-gray-300 pt-2 lg:text-xl">
                  {product.disclaimer.length > 30
                    ? `${product.disclaimer.slice(0, 30)}...`
                    : product.disclaimer}
                </p>
                <button className="w-full mt-8 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white py-2 px-4   rounded-lg shadow-lg transition text-lg">
                  {t("home-products.carrousel-offert.btn")}
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MultiCarousel;
