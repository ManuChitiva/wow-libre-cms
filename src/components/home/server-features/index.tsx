"use client";
import { webProps } from "@/constants/configs";
import React from "react";

import { useTranslation } from "react-i18next";

const ServerFeatures = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-midnight mt-10 mb-16 rounded-xl ">
      <div className="gap-16 items-center py-12 px-6 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-20 lg:px-8 contenedor ">
        <div className="font-light sm:text-lg text-gray-500 ">
          <h2 className="mb-5 text-5xl font-extrabold text-white tracking-tight leading-tight title-server">
            {t("features-server.title")}
          </h2>
          <p className="mb-6 text-xl md:text-2xl leading-relaxed text-gray-200">
            {t("features-server.short-description")}
          </p>
          <p className="mb-6 text-xl md:text-2xl leading-relaxed text-gray-200">
            {t("features-server.detailed-description")}
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-200">
            {t("features-server.summary")}
          </p>
          <div className="mt-10">
            <a
              href="/news"
              className="group relative px-8 py-5 text-blue-300 border-2 border-blue-500 rounded-2xl font-bold tracking-wide bg-[#0a0f1a] overflow-hidden transition duration-300 hover:text-white hover:border-blue-400"
            >
              {/* Luz expansiva desde el centro */}
              <span className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <span className="w-0 h-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 group-hover:w-[120%] transition-all duration-500 rounded-full"></span>
              </span>

              {/* Rombos decorativos */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 border-2 border-blue-500 rotate-45 bg-[#0a0f1a] z-10 transition duration-300 group-hover:border-blue-400"></span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 border-2 border-blue-500 rotate-45 bg-[#0a0f1a] z-10 transition duration-300 group-hover:border-blue-400"></span>

              <span className="relative text-2xl z-10">
                {t("features-server.btn.text")}
              </span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:mt-0 mt-20 select-none">
          <img
            src={webProps.homeFeaturesImg}
            alt="features"
            className=" shadow shadow-teal-300 w-500% h-500 object-cover mx-auto rounded-full hover:shadow-[0_0_25px_5px_#1abc9c] transition-shadow duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default ServerFeatures;
