"use client";
import { useTranslation } from "react-i18next";

const DownloadGame = () => {
  const { t } = useTranslation();

  return (
    <div className="contenedor mt-10 relative bg-gradient-to-br from-[#395c89] via-blue-500 to-[#395c89] p-[2px] rounded-[30px] shadow-lg hover:shadow-blue-500/40 transition duration-500 group">
      <section className="rounded-[28px] bg-gradient-to-br from-[#0b1218] via-[#1b2735] to-[#4a789f] overflow-hidden sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
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
                className="group relative px-8 py-4 text-blue-300 border-2 border-blue-500 rounded-2xl font-bold tracking-wide bg-[#0a0f1a] overflow-hidden transition duration-300 hover:text-white hover:border-blue-400"
              >
                {/* Luz expansiva desde el centro */}
                <span className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                  <span className="w-0 h-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 group-hover:w-[120%] transition-all duration-500 rounded-full"></span>
                </span>

                {/* Rombos decorativos */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 border-2 border-blue-500 rotate-45 bg-[#0a0f1a] z-10 transition duration-300 group-hover:border-blue-400"></span>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 border-2 border-blue-500 rotate-45 bg-[#0a0f1a] z-10 transition duration-300 group-hover:border-blue-400"></span>

                <span className="relative z-10">
                  {t("home-who-we-are.btn-text")}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <img
          alt="DownloadGame"
          src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dmRrc2V2aHYzbGNuNWw4cTQ3ZjNiemJkdzRvdTF6NTNmcm9ieDB6YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/X51WFX75zvvmSNgCg0/giphy.gif"
          className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[20px]"
        />
      </section>
    </div>
  );
};

export default DownloadGame;
