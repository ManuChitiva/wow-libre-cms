"use client";
import { getProductOffert } from "@/api/store";
import { useUserContext } from "@/context/UserContext";
import { Product } from "@/model/model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "react-multi-carousel/lib/styles.css";
import MultiCarousel from "../carrousel-multiple";

const Bidding = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product>();
  const { user } = useUserContext();

  const handleSelectItem = (id: string) => {
    router.push(`/store/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsWithDiscount = await getProductOffert(user.language);
        setProducts(productsWithDiscount);
      } catch (err: any) {}
    };
    fetchProducts();
  }, [user]);

  return (
    <div className="contenedor mx-auto mt-10 px-4">
      <div className="text-center md:text-left mb-8">
        <h2 className="text-5xl font-extrabold text-yellow-400 mb-4">
          {t("home-products.title")}
        </h2>
        <p className="text-xl text-white mt-2">{t("home-products.subtitle")}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* OFERTA DEL DÍA */}
        <div className="bg-gradient-to-b bg-[#1a1a1a] border border-[#7a5b26] transition-shadow duration-300 hover:shadow-[0_0_25px_5px_#7a5b26] rounded-xl p-6 w-full md:max-w-md h-auto md:h-[50rem] flex flex-col">
          <h3 className="text-3xl font-bold text-white mb-4">
            {t("home-products.offer-day.title")}
          </h3>

          <div className="flex justify-center items-center mb-4 h-80 rounded-lg overflow-hidden select-none">
            <img
              src={
                products?.img_url ||
                "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cm8yZXJqcTd5c2x0ZzRtbXoxOGJoZmR6M3M0cTIycm84NnBnYnhoNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/F9N48eIyrQ3kF9ooVz/giphy.gif"
              }
              alt="Product Max Discount"
              className="w-full h-full object-contain transition duration-300 hover:opacity-75"
            />
          </div>

          <div className="text-white flex-1 flex flex-col justify-between">
            {products ? (
              <>
                <div>
                  <h4 className="text-2xl font-bold text-yellow-400">
                    {products.name}
                  </h4>
                  <p className="text-lg text-gray-300">{products.category}</p>
                  <p className="text-lg text-gray-400">{products.partner}</p>
                </div>

                <div className="mt-4">
                  <p className="text-2xl font-semibold text-blue-400">
                    {products.use_points
                      ? `${products.discount_price} Points`
                      : `$ ${products.discount_price} Usd`}
                  </p>
                </div>

                <p className="text-base text-gray-400 mt-2">
                  {products?.disclaimer ??
                    t("home-products.offer-day.disclaimer")}
                </p>

                {/* Botón abajo y ancho completo */}
                <div className="mt-auto px-4 pb-2">
                  <button
                    onClick={() => handleSelectItem(products.reference_number)}
                    className="group relative w-full px-8 py-4 text-orange-100 border-2 border-orange-500 rounded-2xl font-bold tracking-wide bg-orange-500 overflow-visible transition duration-300 hover:text-white hover:border-orange-400 shadow-md hover:shadow-orange-400/40"
                  >
                    {/* Luz expansiva */}
                    <span className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                      <span className="w-0 h-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 group-hover:w-[120%] transition-all duration-500 rounded-full"></span>
                    </span>

                    {/* Rombos laterales */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 border-2 border-orange-300 rotate-45 bg-orange-500 z-10 transition duration-300 group-hover:border-orange-300"></span>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 border-2 border-orange-300 rotate-45 bg-orange-500 z-10 transition duration-300 group-hover:border-orange-300"></span>

                    <span className="relative z-10">
                      {t("home-products.offer-day.btn.primary")}
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-base text-gray-400 mt-2">
                  {t("home-products.offer-day.disclaimer")}
                </p>
                {/* Botón abajo y ancho completo */}
                <div className="mt-auto">
                  <Link href="/store" passHref>
                    <button className="w-full bg-orange-500 border border-orange-600 focus:outline-none hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-semibold dark:bg-orange-600 dark:text-white dark:border-orange-700 dark:hover:bg-orange-700 dark:hover:border-orange-700 dark:focus:ring-orange-800 text-white py-3 px-4 rounded text-xl transition-all">
                      {t("home-products.offer-day.btn.alternative")}
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CARRUSEL */}
        <div className="bg-gradient-to-br from-[#0b1218] via-[#1b2735] to-[#4a789f]  transition-shadow duration-300 hover:shadow-[0_0_25px_5px_#4a789f]  rounded-xl p-6 w-full h-auto md:h-[50rem]">
          <MultiCarousel t={t} />
        </div>
      </div>
    </div>
  );
};

export default Bidding;
