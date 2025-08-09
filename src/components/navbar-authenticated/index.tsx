import { getAmountWallet, getAmountWalletVoting } from "@/api/wallet";
import { useUserContext } from "@/context/UserContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../utilities/loading-spinner";
import { webProps } from "@/constants/configs";

const NavbarAuthenticated = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, clearUserData } = useUserContext();
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [loggin, setLoggin] = useState(false);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletAmountVoting, setWalletAmountVoting] = useState(0);

  const token = Cookies.get("token");

  useEffect(() => {
    setAvatar(user.avatar);
    setIsLoading(false);
    setLoggin(user.logged_in);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[77px] w-[200px] mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  const fetchWalletAmount = async () => {
    if (!user.logged_in || !token) return;

    try {
      const [amount, votes] = await Promise.all([
        getAmountWallet(token),
        getAmountWalletVoting(token),
      ]);

      setWalletAmount(amount);
      setWalletAmountVoting(votes);
    } catch (error) {
      setWalletAmount(0);
      setWalletAmountVoting(0);
    }
  };

  const toggleWalletModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchWalletAmount();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    clearUserData();
    router.push("/");
  };
  const formatNumber = (num: number) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + "K";
    }
    return num.toString();
  };
  return (
    <nav className="bg-midnight mt-10 ">
      <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="absolute  -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-12 w-12`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="absolute top-20 left-0 w-full bg-gray-800 text-white z-50"
            >
              <ul className="space-y-2 py-4 px-6">
                <li>
                  <Link
                    href="/"
                    className="block rounded-md px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {t("navbar_authenticated.sections.position-one")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guild"
                    className="block rounded-md px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {t("navbar_authenticated.sections.position-two")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="block rounded-md px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {t("navbar_authenticated.sections.position-three")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bank"
                    className="block rounded-md px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {t("navbar_authenticated.sections.position-four")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store"
                    className="block rounded-md px-4 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {t("navbar_authenticated.sections.position-five")}
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start select-none">
            <a
              className="flex flex-shrink-0 items-center cursor-pointer"
              href="/"
            >
              <img
                className="w-20 h-20 mt-2"
                src={webProps.logo}
                alt="LogoServer"
              />
              <p className="text-gray-300 ml-5  title-server mt-9 text-4xl">
                {webProps.serverName}
              </p>
            </a>
            <div className="hidden sm:ml-40 sm:block sm:mt-5">
              <div className="flex space-x-5">
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white font-serif "
                  href="/"
                >
                  {t("navbar_authenticated.sections.position-one")}
                </Link>
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white font-serif"
                  href="/guild"
                >
                  {t("navbar_authenticated.sections.position-two")}
                </Link>
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white font-serif"
                  href="/news"
                >
                  {t("navbar_authenticated.sections.position-three")}
                </Link>
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white font-serif"
                  href="/bank"
                >
                  {t("navbar_authenticated.sections.position-four")}
                </Link>
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white font-serif"
                  href="/store"
                >
                  {t("navbar_authenticated.sections.position-five")}
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative z-50">
              {/* Botón del saldo */}
              <div
                className="hidden sm:flex cursor-pointer mr-4 max-w-[80vw] overflow-hidden text-ellipsis whitespace-nowrap items-center 
             relative bg-gradient-to-br from-[#0c1018] via-[#1b2130] to-[#3b47a4]
             border border-[#5a8fff]/30
             transition-shadow duration-300 
             hover:shadow-[0_0_15px_2px_#5a8fff] 
             rounded-full px-4 py-2"
                onClick={toggleWalletModal}
              >
                <span className="text-lg font-semibold truncate text-white">
                  {t("navbar_authenticated.wallet.title")}
                </span>
              </div>

              {/* Contenido desplegable */}
              <div
                className={`absolute left-0 mt-2 w-56 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-[#EAC784] rounded-xl shadow-[0_0_15px_2px_rgba(255,204,51,0.3)] border border-[#7a5b26] p-4 transition-all duration-300 ${
                  isOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <p className="text-xl font-bold tracking-wide border-b border-[#7a5b26] pb-1 mb-2">
                  {t("navbar_authenticated.wallet.detail")}
                </p>

                <p className="text-lg font-semibold">
                  💰 {t("navbar_authenticated.wallet.available")}{" "}
                  <span className="text-[#ffcc33]">
                    {formatNumber(walletAmount)}
                  </span>
                </p>

                <p className="text-lg font-semibold">
                  🗳️ {t("navbar_authenticated.wallet.votes")}{" "}
                  <span className="text-[#ffcc33]">
                    {formatNumber(walletAmountVoting)}
                  </span>
                </p>

                <a
                  href="/store"
                  className="mt-3 block text-center bg-gradient-to-r from-[#B88917] to-[#6B4E16] hover:from-[#d49e17eb] hover:to-[#8B5E2F] text-white font-bold py-2 px-4 rounded-md border border-[#5A3E15] shadow-md hover:shadow-lg transition"
                >
                  ⚡ {t("navbar_authenticated.wallet.recharge")}
                </a>
              </div>
            </div>

            <button
              type="button"
              className="relative rounded-full bg-gradient-to-br from-[#0c1018] via-[#1b2130] to-[#323864]
             border border-[#5a8fff]/30 
             p-1 text-gray-400 hover:text-white 
             hover:shadow-[0_0_10px_2px_#5a8fff]
             transition-all duration-300
             focus:outline-none focus:ring-2 focus:ring-[#5a8fff] focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <span className="absolute -inset-1.5"></span>
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            <div className="relative ml-5">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleUserMenu}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  {loggin ? (
                    <img
                      className="h-14 w-14 rounded-full"
                      src={avatar}
                      alt="Icon profile"
                    />
                  ) : (
                    <img
                      className="h-14 w-14 rounded-full"
                      src={webProps.logo}
                      alt="WowLibre Logo"
                    />
                  )}
                </button>
              </div>
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md 
               bg-gradient-to-br from-[#0c1018] via-[#1b2130] to-[#323864] 
               shadow-lg ring-1 ring-[#5a8fff]/30 focus:outline-none 
               border border-[#5a8fff]/20"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {loggin ? (
                    <div>
                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-base text-gray-200 hover:bg-[#5a8fff]/20 hover:text-white transition"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        {t("navbar_authenticated.menu.logged-in.position-one")}
                      </Link>
                      <Link
                        href="/accounts"
                        className="block px-4 py-3 text-base text-gray-200 hover:bg-[#5a8fff]/20 hover:text-white transition"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        {t("navbar_authenticated.menu.logged-in.position-two")}
                      </Link>
                      <Link
                        href="/realms"
                        className="block px-4 py-3 text-base text-gray-200 hover:bg-[#5a8fff]/20 hover:text-white transition"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        {t("navbar_authenticated.menu.logged-in.position-four")}
                      </Link>
                      <a
                        href="#"
                        className="block px-4 py-3 text-base text-gray-200 hover:bg-red-500/20 hover:text-red-400 transition"
                        role="menuitem"
                        id="user-menu-item-2"
                        onClick={handleLogout}
                      >
                        {t(
                          "navbar_authenticated.menu.logged-in.position-three"
                        )}
                      </a>
                    </div>
                  ) : (
                    <div>
                      <Link
                        href="/login"
                        className="block px-4 py-3 text-base text-gray-200 hover:bg-[#5a8fff]/20 hover:text-white transition"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        {t("navbar_authenticated.menu.logged-out.position-one")}
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-3 text-base text-gray-200 hover:bg-[#5a8fff]/20 hover:text-white transition"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        {t("navbar_authenticated.menu.logged-out.position-two")}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAuthenticated;
