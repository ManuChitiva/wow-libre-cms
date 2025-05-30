"use client";
import { sendMail } from "@/api/account";
import { getAssociatedServers } from "@/api/account/realms";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import { useUserContext } from "@/context/UserContext";
import { InternalServerError } from "@/dto/generic";
import useAuth from "@/hook/useAuth";
import { ServerModel } from "@/model/model";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import "./style.css";

const LimitAccountRegister = 10;
const accountsPerPage = 5;

const Page = () => {
  const router = useRouter();
  const { user, clearUserData } = useUserContext();
  const token = Cookies.get("token");
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [filteredAccounts, setFilteredAccounts] = useState<ServerModel[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const [servers, setServers] = useState<ServerModel[]>([]);
  const [searchUsername, setUsername] = useState<string>("");
  const [searchServer, setSearchServer] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  useAuth(t("errors.message.expiration-session"));

  useEffect(() => {
    if (!token) {
      setRedirect(true);
      return;
    }

    const fetchData = async () => {
      try {
        const getServersVinculated = await getAssociatedServers(token);
        setServers(getServersVinculated.realms);
        setTotalPages(getServersVinculated.size);
        setHasAccount(getServersVinculated.size > 0);
        setLoading(false);
      } catch (error: any) {
        if (error instanceof InternalServerError) {
          if (error.statusCode === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: t("errors.message.expiration-session"),
              color: "white",
              background: "#0B1218",
              timer: 4000,
              willClose: () => {
                clearUserData();
                setRedirect(true);
              },
            });
            return;
          } else if (error.statusCode === 403) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: t("errors.role.message"),
              color: "white",
              background: "#0B1218",
              timer: 4000,
              willClose: () => {
                setRedirect(true);
              },
            });
            return;
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}`,
            color: "white",
            background: "#0B1218",
            timer: 4500,
          });
        }
      }
    };
    fetchData();
  }, [currentPage, searchUsername, searchServer]);

  if (redirect) {
    router.push("/");
  }

  useEffect(() => {
    const filtered = servers.filter((account) => {
      const matchesUsername = account.name
        .toLowerCase()
        .includes(searchUsername.toLowerCase());
      const matchesServer = account.name
        .toLowerCase()
        .includes(searchServer.toLowerCase());
      return matchesUsername && matchesServer;
    });

    setFilteredAccounts(filtered);
  }, [searchUsername, searchServer, servers, user]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/;

    if (regex.test(value)) {
      setUsername(value);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: t("account.errors.special-characters"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
  };

  const handleServerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/;

    if (regex.test(value)) {
      setSearchServer(value);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: t("account.errors.special-characters"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
  };

  if (loading) {
    return (
      <div className="contenedor mx-auto  h-screen-md">
        <NavbarAuthenticated />
        <div className="flex items-center justify-center mt-10">
          <div className="empty-table-message mb-4 select-none">
            <div className="content mb-30 mt-16">
              <img
                src="https://static.wixstatic.com/media/5dd8a0_1316758a384a4e02818738497253ea7d~mv2.webp"
                alt="Magician Casting A Power"
              />
              <p className="mb-5 font-serif">....</p>
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const accountMaximus = servers && servers.length > LimitAccountRegister;

  return (
    <div className="contenedor dark h-screen-md select-none ">
      <NavbarAuthenticated />

      <div className="text-center pt-32">
        <h1 className="text-4xl font-bold text-white">{t("realms.title")}</h1>
        <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
          {t("realms.subtitle")}
        </p>
      </div>
      {hasAccount ? (
        <div className="relative shadow-md sm:rounded-lg pt-16">
          <div className="flex items-center justify-between flex-wrap md:flex-nowrap space-y-4 md:space-y-0 pb-4 bg-white dark:bg-midnight">
            {/* Botón de acción alineado a la izquierda */}
            <div className="relative inline-block text-left ml-2">
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
                onClick={toggleDropdown}
              >
                Action
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownAction"
                className={`${
                  dropdownVisible ? "block" : "hidden"
                } absolute left-1 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              >
                {!accountMaximus && (
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <Link
                        href="/register/realm"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {t("realms.btn.create-server")}
                      </Link>
                    </li>
                  </ul>
                )}
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    {t("realms.btn.delete-server")}
                  </a>
                </div>
              </div>
            </div>

            {/* Buscador de servidor */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none ">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-server"
                  className="block p-2 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("account.search-server-placeholder")}
                  value={searchServer}
                  onChange={handleServerChange}
                />
              </div>
              {/* Buscador de usuario */}
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none ">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("account.search-placeholder")}
                  value={searchUsername}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto min-h-[400px] flex flex-col justify-between">
            <table className=" text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td scope="col" className="p-4">
                    <div className="flex items-center"></div>
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {t("realms.table.column-id")}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {t("realms.table.column-name")}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {t("realms.table.column-expansion")}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {t("realms.table.column-status")}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {t("realms.table.column-date")}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {t("realms.table.column-apikey")}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {t("realms.table.column-web")}
                  </td>
                  <td scope="col" className="px-6 py-3">
                    {t("realms.table.position-action")}
                  </td>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${row.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${row.id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">{row.id}</td>
                    <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={row.avatar}
                        alt="Avatar Server"
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {row.name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {row.emulator}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{row.exp_name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            row.status ? "bg-green-500" : "bg-red-500"
                          } me-2`}
                        ></div>
                        {row.status ? "Enable" : "Disable"}
                      </div>
                    </td>
                    <td className="px-6 py-4 items-center">
                      {row.creation_date}
                    </td>
                    <td
                      className="px-6 py-4 font-medium text-blue-500 text-xl dark:text-blue-500 hover:underline cursor-pointer"
                      onClick={() => handleCopy(row.api_key || "")}
                    >
                      {t("account.column-table.position-btn-copy")}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={
                          row.web_site.startsWith("https")
                            ? row.web_site
                            : `https://${row.web_site}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-500 text-xl dark:text-blue-500 hover:underline cursor-pointer"
                      >
                        {t("account.column-table.position-btn-visit")}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        className="font-medium text-blue-600 text-xl dark:text-blue-500 hover:underline cursor-pointer"
                        onClick={() =>
                          router.push(`/realms/dashboard?id=${row.id}`)
                        }
                      >
                        {t("account.column-table.position-btn-admin")}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-10 ">
              <ReactPaginate
                previousLabel={t("realms.btn.paginate-btn-secondary")}
                nextLabel={t("realms.btn.paginate-btn-primary")}
                breakLabel={""}
                pageCount={Math.ceil(totalPages / accountsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={"pagination flex space-x-2"}
                pageClassName={"page-item"}
                pageLinkClassName={
                  "text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                }
                previousClassName={"page-item"}
                previousLinkClassName={
                  "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                }
                nextClassName={"page-item"}
                nextLinkClassName={
                  "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                }
                breakClassName={"page-item"}
                breakLinkClassName={
                  "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                }
                activeClassName={"active"}
                activeLinkClassName={"bg-blue-900"}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-table-message items-center justify-center">
          <div className="content shadow-md sm:rounded-lg select-none">
            <img
              src="https://static.wixstatic.com/media/5dd8a0_1316758a384a4e02818738497253ea7d~mv2.webp"
              alt="Create Account"
              className="logo pb-10 pt-10 "
            />

            <p className="mb-5 text-lg">
              {t("realms.realm-empty.title")}
              <br />
              {t("realms.realm-empty.description")}
            </p>

            {servers && servers.length <= 10 && (
              <Link
                className="w-full sm:w-1/2 bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-700 transition"
                href="/register/realm"
              >
                {t("realms.realm-empty.btn-txt")}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
