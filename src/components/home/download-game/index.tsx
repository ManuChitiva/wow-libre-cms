"use client";
import { useTranslation } from "react-i18next";

const DownloadGame = () => {
  const { t } = useTranslation();

  return (
    <section
      className="rounded-3xl
 contenedor overflow-hidden bg-gradient-to-br from-[#0b1218] via-[#1b2735] to-[#4a789f] hover:shadow-[0_0_25px_5px_#4a789f]
 sm:grid sm:grid-cols-2 sm:items-center mt-20 mb-20"
    >
      <div className=" p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {t("home-who-we-are.title")}
          </h2>

          <p className="hidden text-gray-300 md:mt-4 md:block text-2xl">
            {t("home-who-we-are.description")}
          </p>

          <div className="mt-4 md:mt-8">
            <a
              href="/contributions"
              className="inline-block px-9 py-6 text-xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600  rounded-lg shadow-lg transition duration-300"
            >
              {t("home-who-we-are.btn-text")}
            </a>
          </div>
        </div>
      </div>

      <img
        alt="DownloadGame"
        src="https://static.wixstatic.com/media/5dd8a0_b992dcaaf7f04578a44fd1aadcc91365~mv2.png"
        className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[20px]"
      />
    </section>
  );
};

export default DownloadGame;
