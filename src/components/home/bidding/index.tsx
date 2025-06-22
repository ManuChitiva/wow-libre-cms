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
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">
          {t("home-products.title")}
        </h2>
        <p className="text-lg text-white mt-2">{t("home-products.subtitle")}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* OFERTA DEL DÍA */}
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-xl p-6 w-full md:max-w-md h-auto md:h-[50rem] flex flex-col">
          <h3 className="text-2xl font-semibold text-white mb-4">
            {t("home-products.offer-day.title")}
          </h3>

          <div className="flex justify-center items-center mb-4 h-80 rounded-lg overflow-hidden select-none">
            <img
              src={
                products?.img_url ||
                "https://static.wixstatic.com/media/5dd8a0_94523c2ce6774c99a776afcd8c84d2f9~mv2.png"
              }
              alt="Product Max Discount"
              className="w-full h-full object-contain transition duration-300 hover:opacity-75"
            />
          </div>

          <div className="text-white flex-1 flex flex-col justify-between">
            {products ? (
              <>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400">
                    {products.name}
                  </h4>
                  <p className="text-xl text-gray-300">{products.category}</p>
                  <p className="text-xl text-gray-300">{products.partner}</p>
                </div>

                <div className="mt-4">
                  <p className="text-xl font-semibold text-blue-400">
                    {products.use_points
                      ? `${products.discount_price} Points`
                      : `$ ${products.discount_price} Usd`}
                  </p>
                </div>

                <p className="text-xl text-gray-400 mt-2">
                  {products?.disclaimer ??
                    t("home-products.offer-day.disclaimer")}
                </p>

                {/* Botón abajo y ancho completo */}
                <div className="mt-auto">
                  <button
                    onClick={() => handleSelectItem(products.reference_number)}
                    className="w-full bg-indigo-700 hover:bg-indigo-500 text-white py-2 px-4 rounded text-lg transition-all"
                  >
                    {t("home-products.offer-day.btn.primary")}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xl text-gray-400 mt-2">
                  {t("home-products.offer-day.disclaimer")}
                </p>
                {/* Botón abajo y ancho completo */}
                <div className="mt-auto">
                  <Link href="/store" passHref>
                    <button className="w-full bg-indigo-700 hover:bg-indigo-500 text-white py-2 px-4 rounded text-2xl transition-all">
                      {t("home-products.offer-day.btn.alternative")}
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CARRUSEL */}
        <div className="bg-gradient-to-b from-slate-800 via-slate-900 to-gray-950 rounded-xl p-6 w-full h-auto md:h-[50rem]">
          <MultiCarousel t={t} />
        </div>
      </div>
    </div>
  );
};

export default Bidding;
