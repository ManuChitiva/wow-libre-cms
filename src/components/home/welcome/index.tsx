"use client";
import DiscordWidget from "@/components/discord";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { homeProps } from "@/constants/home";
import { useTranslation } from "react-i18next";

const WelcomeHome = () => {
  const { t, ready } = useTranslation();
  if (ready) {
    <div className="contenedor bg-midnight relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <LoadingSpinner />
    </div>;
  }
  return (
    <div className="contenedor bg-midnight relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-1x font-semibold text-indigo-400">
                {t("home-information.title")}
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {t("home-information.sub-title")}
              </h1>
              <p className="mt-6 text-xl/8 text-gray-300">
                {t("home-information.description")}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden flex flex-col items-center">
          <DiscordWidget />
         
        {/*  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              onClick={() => window.open("/register", "_blank")}
              className="text-xl inline-flex items-center justify-center rounded-lg bg-indigo-500 px-8 py-4 sm:px-20 sm:py-6 font-semibold text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              {t("home-information.btn.primary")}
            </button>

            <button
              onClick={() => window.open("/contributions#download", "_blank")}
              className="text-xl inline-flex items-center justify-center rounded-lg bg-gray-800 px-8 py-4 sm:px-20 sm:py-6 font-semibold text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
            >
              {t("home-information.btn.secondary")}
            </button>
          </div>
          */}
        </div>

        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-300 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-400">
                <li className="flex gap-x-3">
                  <svg
                    className="mt-1 size-5 flex-none text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong className="font-semibold text-white">
                      {t("home-information.push-deploy.title")}
                    </strong>{" "}
                    {t("home-information.push-deploy.description")}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="mt-1 size-5 flex-none text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong className="font-semibold text-white">
                      {t("home-information.certificates.title")}
                    </strong>{" "}
                    {t("home-information.certificates.description")}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="mt-1 size-5 flex-none text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                    <path
                      fillRule="evenodd"
                      d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong className="font-semibold text-white">
                      {t("home-information.database.title")}
                    </strong>{" "}
                    {t("home-information.database.description")}
                  </span>
                </li>
              </ul>
              <p className="mt-8">{t("home-information.congrats")}</p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-white">
                {t("home-information.notice.title")}
              </h2>
              <p className="mt-6">{t("home-information.notice.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHome;
