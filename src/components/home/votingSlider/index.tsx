"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

import { getPlatforms } from "@/api/voting";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import { VotingPlatforms } from "@/model/VotingPlatforms";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import Slider from "react-slick";
import { socialLinks } from "@/constants/socialLinks";

const iconComponents = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  WhatsApp: FaWhatsapp,
  Telegram: FaTelegram,
};

const VotingSlider = () => {
  const [partners, setPartners] = useState<VotingPlatforms[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { user } = useUserContext();
  const token = Cookies.get("token");
  const isAuthenticated = token && user.logged_in;

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      try {
        const data = await getPlatforms(token || null);
        setPartners(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, [token]);

  const settings = {
    dots: false,
    infinite: partners.length > 4,
    arrows: true,
    speed: 500,
    slidesToShow: Math.min(2, partners.length),
    slidesToScroll: Math.min(2, partners.length),
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, partners.length),
          slidesToScroll: Math.min(1, partners.length),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, partners.length),
          slidesToScroll: Math.min(1, partners.length),
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1, partners.length),
          slidesToScroll: Math.min(1, partners.length),
        },
      },
    ],
  };

  return (
    <div className="contenedor py-10 px-4">
      <div className="slider-introduction mt-5  mb-10">
        <h2 className="text-4xl font-bold text-[#f6a001] title-server">
          {t("home-voting-platforms.title")}
        </h2>
        <p className="text-xl text-gray-300 mt-4">
          {t("home-voting-platforms.description")}
        </p>
        <a
          href="/help"
          target="_blank"
          className="text-lg text-yellow-500 mt-2 hover:text-yellow-400 underline"
        >
          {t("home-voting-platforms.btn-information")}
        </a>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-20">
          <LoadingSpinner />
        </div>
      ) : partners.length === 0 ? (
        <div className="flex flex-col items-center text-white text-center mt-20">
          <img
            src="https://static.wixstatic.com/media/5dd8a0_3c182df4bbfb46f0aba9f5ce8a1be128~mv2.jpg"
            alt="partners-not-found"
            className="w-32 h-32 md:w-60 md:h-60 mb-6 select-none rounded-full transition-transform duration-500 ease-in-out transform hover:rotate-180"
          />
          <p className="text-2xl font-serif">
            ⚔️
            <span className="text-indigo-400">
              {t("home-voting-platforms.empty-server-list-title")}🛡️
            </span>
            ⚔️
          </p>
          <p className="text-lg mt-4">
            {t("home-voting-platforms.empty-server-list-subtitle")}🛡️
          </p>
        </div>
      ) : (
        <Slider {...settings}>
          {partners.map((partner) => (
            <div key={partner.id} className="slider cursor-pointer">
              <div className="cards-slider bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl rounded-xl border border-gray-700 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
                <div className="slider-content text-center">
                  <p className="text-2xl font-semibold text-gray-100 mb-2">
                    {partner.name}
                  </p>
                  <p className="text-lg text-orange-300 italic">
                    {t("home-voting-platforms.benefit")}
                  </p>
                </div>
                <div className="slider-image flex justify-center items-center my-6">
                  <img
                    src={partner.img_url}
                    alt="Logo"
                    draggable="false"
                    className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-full border-4 border-gray-600 shadow-md transition-transform transform hover:scale-110"
                  />
                </div>
                <div className="text-center mt-6">
                  {isAuthenticated ? (
                    partner.postback_url && (
                      <Link
                        href={partner.postback_url}
                        target="_blank"
                        passHref
                      >
                        <button className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ease-in-out">
                          {t("home-voting-platforms.btn-register-discover")}
                        </button>
                      </Link>
                    )
                  ) : (
                    <Link href="/register" passHref>
                      <button className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ease-in-out">
                        {t("home-voting-platforms.btn-register-txt")}
                      </button>
                    </Link>
                  )}
                </div>
                <div className="slider-text mb-4 text-center">
                  <div className="flex justify-center mt-4 text-yellow-400">
                    <p className="text-3xl  font-bold">
                      {t("home-voting-platforms.disclaimer")
                        .split("")
                        .map((letter, index) => (
                          <span
                            key={index}
                            className="text-white animate-color-cycle "
                          >
                            {letter}
                          </span>
                        ))}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                  {socialLinks.map((social) => {
                    const Icon =
                      iconComponents[
                        social.name as keyof typeof iconComponents
                      ];
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={`${social.color} text-3xl transition hover:opacity-80`}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default VotingSlider;
