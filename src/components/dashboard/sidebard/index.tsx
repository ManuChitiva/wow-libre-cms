import { useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar: React.FC<{ onOptionChange: (option: string) => void }> = ({
  onOptionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    setSelectedOption(menu);
    onOptionChange(menu);
  };

  const handleReturnPage = () => {
    router.push("/realms");
    setSelectedOption("");
  };

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-black transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <a href="#" title="home">
            <img
              src="https://www.pngplay.com/wp-content/uploads/11/World-Of-Warcraft-Logo-PNG-Photo-Image.png"
              className="w-32"
              alt="tailus logo"
            />
          </a>
        </div>

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

          {/* Settings */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("portals");
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
                Portales
              </span>
            </a>
          </li>
          {/* Settings */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("settings");
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
                Settings
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
                Reino
              </span>
            </a>
          </li>
          {/* Separador + Sección de servidor */}
          <hr className="my-4 border-gray-600" />
          <h6 className="px-4 text-xl font-semibold text-gray-400 uppercase tracking-wider">
            Servidor
          </h6>
          {/* Dashboard */}
          <li>
            <a
              href="#"
              aria-label="dashboard"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick("dashboard");
              }}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white transition-all duration-300 hover:bg-gray-700"
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
                Noticias
              </span>
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
              <span className="group-hover:text-blue-400 text-white">Faqs</span>
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
                Usuarios
              </span>
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
                Votes
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
