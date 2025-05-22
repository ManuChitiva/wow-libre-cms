"use client";

import { getProducts } from "@/api/store";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import AdvertisingStore from "@/components/store/banners";
import { useUserContext } from "@/context/UserContext";
import { CategoryDetail } from "@/model/model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Store = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<{
    [key: string]: CategoryDetail[];
  }>({});
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts(user.language);
        let categoriesObject: { [key: string]: CategoryDetail[] } = {};
        if (productsData instanceof Map) {
          categoriesObject = Object.fromEntries(productsData);
        } else if (typeof productsData === "object" && productsData !== null) {
          categoriesObject = productsData as {
            [key: string]: CategoryDetail[];
          };
        }

        setCategories(categoriesObject);
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  const handleSelectItem = (id: string) => {
    router.push(`/store/${id}`);
  };

  return (
    <div className="contenedor">
      <NavbarAuthenticated />
      <div className="mt-14">
        <AdvertisingStore />
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div>
          <div className="flex justify-center items-center h-screen">
            <svg
              className="animate-spin h-10 w-10 text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="4"
                stroke="currentColor"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4.29 4.29a1 1 0 011.42 0L12 10.59l6.29-6.3a1 1 0 011.42 1.42l-7 7a1 1 0 01-1.42 0l-7-7a1 1 0 010-1.42z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      <nav className="w-full  flex items-center justify-start bg-gray-800 text-white mt-10 mb-10">
        {Object.keys(categories).map((category) => (
          <a
            key={category}
            href={`#${category}`}
            className="hover:text-gray-300 px-4 py-5 hover:bg-gray-700 transition duration-200 ease-in-out font-serif  text-3xl text-yellow-500"
          >
            {category}
          </a>
        ))}
      </nav>

      {Object.entries(categories).map(([categoryName, categoryDetails]) => (
        <div
          key={categoryName}
          id={categoryName}
          className="pt-20 bg-gray-800  "
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 md:w-1/3 flex flex-col justify-center text-center max-w-md mx-auto space-y-4">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {categoryName}
                  </h2>
                  <p className="text-gray-400 text-xl font-semibold">
                    {categoryDetails[0]?.disclaimer}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap md:w-2/3 gap-4 mb-10 cursor-pointer">
                {categoryDetails[0]?.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-800 hover:bg-gray-700 relative p-4 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{ height: "450px" }}
                    onClick={() => handleSelectItem(product.reference_number)}
                  >
                    {product.discount > 0 && (
                      <span className="absolute top-4 right-4 bg-orange-500 text-white text-lg font-semibold px-2 py-1 rounded-full animate-pulse shadow-lg">
                        ¡{product.discount}% de descuento!
                      </span>
                    )}

                    <img
                      src={product.img_url}
                      alt={`Image ${product.id}`}
                      className="w-full h-1/2 object-cover rounded-md mb-4 transition-transform duration-300 "
                    />

                    <div className="flex flex-col flex-grow">
                      <p className="text-white mb-2 text-3xl leading-tight font-bold hover:text-orange-300 transition-colors duration-300">
                        {product.name}
                      </p>
                      <p className="text-gray-400 mb-2 text-xl leading-tight">
                        {product.disclaimer}
                      </p>
                      <p className="text-orange-300 mb-2 text-2xl mt-3">
                        {product.category}
                      </p>
                      <p className="text-gray-400 mb-2 text-lg">
                        {product.partner}
                      </p>
                      <div className="mt-auto">
                        {product.discount > 0 ? (
                          <>
                            {product.use_points === false ? (
                              <>
                                <p
                                  className="text-orange-300 font-bold"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  ${product.discount_price} USD
                                </p>
                                <p className="line-through text-gray-500">
                                  ${product.price.toLocaleString()} USD
                                </p>
                              </>
                            ) : (
                              <>
                                <p
                                  className="text-orange-300 font-bold"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  {`${Math.floor(
                                    product.discount_price
                                  ).toLocaleString()} Points`}
                                </p>
                                <p className="line-through text-gray-500">
                                  {`${product.price.toLocaleString()} Points`}
                                </p>
                              </>
                            )}
                          </>
                        ) : (
                          <p
                            className="text-orange-300 font-bold"
                            style={{ fontSize: "1.5rem" }}
                          >
                            {product.use_points === false
                              ? `$${product.price.toLocaleString()} USD`
                              : `${product.price.toLocaleString()} Points`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
