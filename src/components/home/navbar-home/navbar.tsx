"use client";

import { getAvailableCountries } from "@/api/country";
import { widgetPillSubscription } from "@/api/home";
import { webProps } from "@/constants/configs";
import { useUserContext } from "@/context/UserContext";
import { WidgetPillHome } from "@/model/model";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NavbarAuth from "./auth";
import Searcher from "./search/searcher";
import "./style.css";

const Navbar = () => {
  const { t } = useTranslation();
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSub, setLoadingSub] = useState(true);

  const { user, setUser } = useUserContext();
  const [pillHome, setPillHome] = useState<WidgetPillHome>();
  const jwt = Cookies.get("token");

  useEffect(() => {
    const fetchAvailableCountries = async () => {
      setLoading(true);
      try {
        const apiResponse = await getAvailableCountries();
        const uniqueLanguages = Array.from(
          new Set(apiResponse.map((country) => country.language))
        );
        setLanguages(uniqueLanguages);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCountries();
  }, []);

  useEffect(() => {
    const fetchWidgetPillSubscription = async () => {
      setLoadingSub(true);
      try {
        const widgetResponse = await widgetPillSubscription(
          user.language,
          jwt || null
        );
        setPillHome(widgetResponse);
      } catch (error) {
        setLoadingSub(true);
      } finally {
        setLoadingSub(false);
      }
    };

    if (user && jwt) {
      fetchWidgetPillSubscription();
    }
  }, [user]);

  const handleSearch = (query: string) => {
    console.log("Buscar:", query);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdown(!languageDropdown);
  };

  const changeLanguage = (language: string) => {
    if (user) {
      setUser({
        ...user,
        language: language,
      });
    }
    setLanguageDropdown(false);
  };

  return (
    <div className="navbar contenedor  text-white">
      <header>
        <Link className="logo-home flex items-center" href="/">
          <img
            className="w-20 h-20 md:w-28 md:h-28"
            src={webProps.logo}
            alt="Logo WowLibre"
          />
          <p className="title-server title-home ml-2 text-xl font-bold md:text-2xl">
            {webProps.serverName}
          </p>
        </Link>
      </header>
      <div className="searcher flex-grow text-black  text-2xl">
        <Searcher
          onSearch={handleSearch}
          placeHolder={t("navbar.search.place-holder")}
        />
      </div>
      {loadingSub || !pillHome ? (
        <div className="promotion">
          <a href="#">
            <img
              className="image-promotion"
              src="https://static.wixstatic.com/media/5dd8a0_2db1e48e89e340ce97be2820206b9d95~mv2.webp"
              alt="Pill Subscription"
            />
          </a>
        </div>
      ) : (
        <div className="promotion">
          <a href={pillHome?.url}>
            <img
              className="image-promotion"
              src={pillHome?.img}
              alt="Pill Subscription"
            />
          </a>
        </div>
      )}

      {loading ? (
        <div className="nav-ubication relative">
          <svg
            className="animate-spin h-10 w-10 text-purple-500"
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
      ) : (
        <div className="nav-ubication relative">
          <a
            className="cursor-pointer hover:text-gray-400 flex items-center"
            onClick={toggleLanguageDropdown}
          >
            {t("navbar.language")}
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </a>

          {languageDropdown && (
            <div className="absolute mt-10 right-0 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
              <ul className="text-white p-2">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    className="cursor-pointer p-2 hover:bg-gray-700 rounded-md"
                    onClick={() => changeLanguage(lang)}
                  >
                    {lang.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="nav-category">
        <nav className="category flex space-x-4">
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/guild"
          >
            {t("navbar.sections.position-one")}
          </Link>
          <Link
            className="category-link hover:text-gray-400 font-serif"
            target="_blank"
            href="/news"
          >
            {t("navbar.sections.position-two")}
          </Link>
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/bank"
          >
            {t("navbar.sections.position-three")}
          </Link>
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/store"
          >
            {t("navbar.sections.position-four")}
          </Link>
          <Link
            className="category-link hover:text-gray-400 font-serif"
            href="/help"
          >
            {t("navbar.sections.position-five")}
          </Link>
        </nav>
      </div>
      <div className="auth relative">
        <NavbarAuth />
      </div>
    </div>
  );
};

export default Navbar;
