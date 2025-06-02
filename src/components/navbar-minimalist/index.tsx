import { webProps } from "@/constants/configs";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NavbarMinimalist = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="flex flex-col md:flex-row items-center justify-center w-full p-5 box-border mt-10 relative">
      <div className="flex flex-col items-center w-full md:w-auto md:flex-row md:items-center">
        <Link
          className="flex flex-col items-center md:flex-row md:items-center"
          href="/"
        >
          <img
            className="max-w-[20%] md:max-w-[17%]"
            src={webProps.logo}
            alt="LogoServer"
          />
          <p className="text-white text-4xl md:text-4xl  pt-4  md:mt-8 md:pt-0 title-server text-center md:text-left">
            {webProps.serverName}
          </p>
        </Link>
      </div>

      <button
        className="md:hidden absolute left-5 top-10 text-white text-5xl"
        onClick={toggleMenu}
      >
        ☰
      </button>

      <nav
        className={`md:flex items-center pt-5  ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300 font-serif"
          href="/"
        >
          <p className="">{t("navbar-minimalist.sections.position-one")}</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300 font-serif"
          href="/guild"
        >
          <p className="">{t("navbar-minimalist.sections.position-two")}</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300 font-serif"
          href="/bank"
        >
          <p className="">{t("navbar-minimalist.sections.position-three")}</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300 font-serif"
          href="/store"
        >
          <p className="">{t("navbar-minimalist.sections.position-four")}</p>
        </Link>
        <Link
          target="_blank"
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300 font-serif"
          href="/news"
        >
          <p className="">{t("navbar-minimalist.sections.position-five")}</p>
        </Link>
        <Link
          className="flex items-center text-white text-2xl md:text-3xl hover:bg-gray-700 px-6 py-3 rounded-lg transition duration-300 font-serif"
          href="/help"
        >
          <p className="">{t("navbar-minimalist.sections.position-six")}</p>
        </Link>
      </nav>
    </header>
  );
};

export default NavbarMinimalist;
