import { useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar: React.FC<{ onOptionChange: (option: string) => void }> = ({
  onOptionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const router = useRouter();
  const [openDashboard, setOpenDashboard] = useState(false);

  const handleMenuClick = (menu: string) => {
    setSelectedOption(menu);
    onOptionChange(menu);
  };

  const handleReturnPage = () => {
    router.push("/realms");
    setSelectedOption("");
  };

  return (
    <aside
      className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 
  w-full flex flex-col justify-between h-screen 
  border-r bg-black transition duration-300 
  md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] 
  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-hide"
    >
      {" "}
      <div>
        <div className="mt-8 text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/WoW_icon.svg/1200px-WoW_icon.svg.png"
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-200 lg:block">
            Welcome
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>
        <hr className="my-4 border-gray-600" />
        <h6 className="px-4 text-xl font-semibold text-gray-400 uppercase tracking-wider">
          Reino
        </h6>
        <ul className="space-y-2 tracking-wide mt-8">
          {/* Promotions <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("promotions");
              }}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white transition-all duration-300 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                  clipRule="evenodd"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                />
              </svg>
              <span className="group-hover:text-blue-400 text-white">
                Promociones
              </span>
            </a>
          </li> */}

          {/* Portals */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("portals");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "portals"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                  clipRule="evenodd"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                />
              </svg>
              <span className="group-hover:text-blue-400 text-white">
                Portales
              </span>
            </a>
          </li>
          {/* Reino */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("adversing");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "adversing"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                  clipRule="evenodd"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                />
              </svg>
              <span className="group-hover:text-blue-400 text-white select-none">
                Reino
              </span>
            </a>
          </li>
          {/* Settings
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("settings");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "settings"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                  clipRule="evenodd"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                />
              </svg>
              <span className="group-hover:text-blue-400 text-white select-none">
                Settings
              </span>
            </a>
          </li>
           */}
          {/* Productos */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("products");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "products"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                  clipRule="evenodd"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                />
              </svg>
              <span className="group-hover:text-blue-400 text-white">
                Productos
              </span>
            </a>
          </li>
          {/* Separador + Sección de servidor */}
          <hr className="my-4 border-gray-600" />
          <h6 className="px-4 text-xl font-semibold text-gray-400 uppercase tracking-wider">
            Servidor
          </h6>
          {/* Payment Methods  */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("paymentMethods");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300
            ${
              selectedOption === "paymentMethods"
                ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
            }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                <path d="M19 3h-4v2h4v4h2V5a2 2 0 00-2-2zm-4 14v2h4a2 2 0 002-2v-4h-2v4h-4z" />
              </svg>
              <span>Medios de pago</span>
            </a>
          </li>
          {/* Proveedores (se queda fuera del dashboard) */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("provider");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300
            ${
              selectedOption === "provider"
                ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
            }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                <path d="M19 3h-4v2h4v4h2V5a2 2 0 00-2-2zm-4 14v2h4a2 2 0 002-2v-4h-2v4h-4z" />
              </svg>
              <span>Proveedores</span>
            </a>
          </li>
          {/* FAQs */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("faqs");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "faqs"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17a1.25 1.25 0 110-2.5A1.25 1.25 0 0112 19zm1-4h-2v-.5c0-1.1.9-2 2-2 .55 0 1-.45 1-1s-.45-1-1-1a1 1 0 00-1 1H9c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.3-.84 2.4-2 2.82V15z"
                />
              </svg>

              <span className="group-hover:text-blue-400 text-white">Faqs</span>
            </a>
          </li>
          {/* Advertising */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("advertising");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "advertising"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2z"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M8 9h8v2H8V9zm0 4h5v2H8v-2z"
                />
              </svg>

              <span className="group-hover:text-blue-400 text-white">
                Advertising
              </span>
            </a>
          </li>

          {/* Votes */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("votes");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "votes"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  d="M3 10h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M14.59 2.59a2 2 0 00-2.83 0L8 6.34V8h8V6.34l-1.41-1.41z"
                />
              </svg>

              <span className="group-hover:text-blue-400 text-white">
                Votes
              </span>
            </a>
          </li>
          {/* Dashboard */}
          <li>
            <a
              href="#"
              aria-label="dashboard"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("dashboard");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "dashboard"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                  className="fill-current text-cyan-400 dark:fill-slate-600"
                ></path>
                <path
                  d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                  className="fill-current text-cyan-200 group-hover:text-cyan-300"
                ></path>
                <path
                  d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                  className="fill-current group-hover:text-sky-300"
                ></path>
              </svg>
              <span className="-mr-1 font-medium text-gray-200">Dashboard</span>
            </a>
          </li>
          {/* News */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("news");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "news"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  d="M12 2a7 7 0 00-7 7v3.586l-.707.707A1 1 0 005 15h14a1 1 0 00.707-1.707L19 12.586V9a7 7 0 00-7-7z"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M13.73 21a2 2 0 01-3.46 0h3.46z"
                />
              </svg>

              <span className="group-hover:text-blue-400 text-white">
                Noticias
              </span>
            </a>
          </li>

          {/* Bank */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("bank");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "bank"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  d="M12 2L2 7v2h20V7L12 2z"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M4 10v10h2v-8h2v8h2v-8h2v8h2v-8h2v8h2v-8h2v8h2V10H4z"
                />
              </svg>

              <span className="group-hover:text-blue-400 text-white">Bank</span>
            </a>
          </li>

          {/* Users */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("users");
              }}
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition-all duration-300 select-none
              ${
                selectedOption === "users"
                  ? "bg-gradient-to-r from-[#1a1a1a] to-[#2b2b2b] shadow-[0_0_12px_2px_#e18132] text-[#e18132]"
                  : "text-white hover:bg-gradient-to-r hover:from-[#2a2a2a] hover:to-[#1a1a1a] hover:text-[#e18132]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-300"
                  d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z"
                />
                <path
                  className="fill-current text-gray-200 group-hover:text-cyan-600"
                  d="M4 20v-1c0-2.2 3.6-4 8-4s8 1.8 8 4v1H4z"
                />
              </svg>
              <span className="group-hover:text-blue-400 text-white">
                Usuarios
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span
            className="group-hover:text-gray-400 text-white"
            onClick={handleReturnPage}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
