"use client";
import NavbarMinimalist from "@/components/navbar-minimalist";
import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <div>
      <NavbarMinimalist />
      <div className="mt-10 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 p-12 rounded-2xl shadow-2xl max-w-5xl mx-auto font-sans border border-indigo-800/30">
        <div className="flex items-center mb-8">
          <div className="w-3 h-3 rounded-full bg-indigo-400 animate-ping mr-3"></div>
          <h1 className="text-4xl font-extrabold text-indigo-400">
            {t("terms.title")}
          </h1>
        </div>

        <p className="mb-8 text-xl leading-relaxed">{t("terms.intro")}</p>

        <div className="space-y-8">
          <section className="transition-transform duration-300 hover:scale-[1.02] hover:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-indigo-300">
              {t("terms.sections.license.title")}
            </h2>
            <p className="text-xl mt-2 text-gray-300">
              {t("terms.sections.license.content")}
            </p>
          </section>

          <section className="transition-transform duration-300 hover:scale-[1.02] hover:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-indigo-300">
              {t("terms.sections.liability.title")}
            </h2>
            <p className="text-xl mt-2 text-gray-300">
              {t("terms.sections.liability.content")}
            </p>
          </section>

          <section className="transition-transform duration-300 hover:scale-[1.02] hover:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-indigo-300">
              {t("terms.sections.community.title")}
            </h2>
            <p className="text-xl mt-2 text-gray-300">
              {t("terms.sections.community.content")}
            </p>
          </section>

          <section className="transition-transform duration-300 hover:scale-[1.02] hover:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-indigo-300">
              {t("terms.sections.changes.title")}
            </h2>
            <p className="text-xl mt-2 text-gray-300">
              {t("terms.sections.changes.content")}
            </p>
          </section>
        </div>

        <footer className="mt-12 border-t border-gray-800 pt-6 text-lg text-gray-500 text-center">
          <p>
            {t("terms.sections.footer")}{" "}
            <a
              href="https://www.wowlibre.com"
              className="ml-1 underline text-indigo-400"
            >
              {t("terms.sections.brand")}
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;
