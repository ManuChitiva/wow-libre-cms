"use client";

import "./style.css";

import PageCounter from "@/components/utilities/counter";
import TitleWow from "@/components/utilities/serverTitle";
import React, { ChangeEvent, useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "@/hook/useAuth";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Footer from "@/components/footer";

import { useTranslation } from "react-i18next";
import { ServerModel } from "@/model/model";
import { getServers } from "@/api/account/realms";
import { useUserContext } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";

const AccountIngame = () => {
  const { user, setUser } = useUserContext();
  const [userName, setUsername] = useState("");
  const [servers, setServers] = useState<ServerModel[]>([]);
  const [gameMail, setGameMail] = useState("");
  const [selectedServer, setSelectedServer] = useState<{
    name: string;
    expansion: string;
  }>();
  const router = useRouter();
  const { t } = useTranslation();

  useAuth(t("errors.message.expiration-session"));

  const searchParams = useSearchParams();
  const disclaimerParam = searchParams.get("showWelcome");
  const disclaimer = disclaimerParam === "true";

  useEffect(() => {
    if (disclaimer) {
      Swal.fire({
        title: `<span style="font-family: 'Cinzel', serif; font-size: 2rem; color: #FFD700; text-shadow: 2px 2px 4px #000000;">
    ${t("register.section-page.account-game.show-welcome.title")}
  </span>`,
        html: `
    <div style="text-align: center; color: #E6E6E6; font-family: 'Merriweather', serif; font-size: 1.5rem; line-height: 1.5; margin-top: 10px;">
      <p>${t("register.section-page.account-game.show-welcome.description")}</p>
      
    </div>
    <img src="https://static.wixstatic.com/media/5dd8a0_87f6b8f5c91343c3823fd351dcc8798d~mv2.webp" alt="Símbolo WoW" style="margin-top: 20px; width: 100px; height: 100px; border-radius: 12px; box-shadow: 0 0 15px #FFD700; display: block; margin-left: auto; margin-right: auto;" />
  `,
        background: "radial-gradient(circle, #0B1218 0%, #001020 100%)",
        color: "#FFD700",
        confirmButtonText: "OK",
        confirmButtonColor: "#1E90FF",
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
  }, [disclaimer, t]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const serversData = await getServers();
        setServers(serversData);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: t("register.error.servers-fetch-empty"),
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      }
    };

    fetchServers();
  }, []);

  const handleServerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedServerName = event.target.value;
    const server = servers.find((server) => server.name === selectedServerName);
    if (server) {
      setSelectedServer({ name: server.name, expansion: server.expansion });
    }
  };

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleGameMailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGameMail(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const regex = /^[a-zA-Z0-9\s]*$/;

    if (!selectedServer) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.server-is-empty"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (!userName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.username-empty"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (!regex.test(userName)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: t("register.error.special-characters"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (userName.trim().length < 5 || userName.trim().length > 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.username-invalid-length"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (user && selectedServer) {
      setUser({
        ...user,
        username: userName,
        server: selectedServer.name,
        expansion: selectedServer.expansion,
        email: gameMail,
      });
    }
    router.push("/register/account-ingame");
  };

  const handleVolverClick = () => {
    router.push("/accounts");
  };

  return (
    <div className="contenedor">
      <NavbarAuthenticated />
      <div className="registration registration-container container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.account-game.title-server-message"
          )}
        />
        <form
          className="registration-container-form"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group">
            {/* Select para elegir expansión */}
            <label
              htmlFor="expansionSelect"
              className="mb-2 registration-container-form-label text-lg md:text-xl lg:text-2xl"
            >
              {t("register.section-page.account-game.realm-txt")}
            </label>
            <select
              id="expansionSelect"
              className="mb-3 px-4 py-2 border rounded-md text-black registration-input text-base md:text-lg lg:text-xl"
              value={selectedServer?.name || ""}
              onChange={handleServerChange}
            >
              <option value="" disabled>
                {t("register.section-page.account-game.select-server")}
              </option>
              {servers.map((server) => (
                <option key={server.id} value={server.name}>
                  {server.name} - {server.exp_name}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de nombre de usuario */}
          <div className="form-group">
            <label
              htmlFor="usernameForm"
              className="mb-2 registration-container-form-label text-lg md:text-xl lg:text-2xl"
            >
              {t("register.section-page.account-game.username-txt")}
            </label>

            <input
              id="usernameForm"
              className="mb-3 px-4 py-2 border rounded-md text-black registration-input text-base md:text-lg lg:text-xl"
              type="text"
              maxLength={20}
              placeholder={t(
                "register.section-page.account-game.username-placeholder"
              )}
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          {Number(selectedServer?.expansion) > 2 && (
            <div className="form-group">
              <label
                htmlFor="emailGameForm"
                className="mb-2 registration-container-form-label text-lg md:text-xl lg:text-2xl"
              >
                {t("register.section-page.account-game.email-game-txt")}
              </label>

              <input
                id="emailGameForm"
                className="mb-3 px-4 py-2 border rounded-md text-black registration-input text-base md:text-lg lg:text-xl"
                type="text"
                maxLength={60}
                placeholder={t(
                  "register.section-page.account-game.email-game-placeholder"
                )}
                value={gameMail}
                onChange={handleGameMailChange}
              />
              <p className="text-lg text-gray-300 mt-1">
                {t("register.section-page.account-game.email-game-disclaimer")}
              </p>
            </div>
          )}

          <PageCounter currentSection={1} totalSections={2} />
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-registration text-base md:text-lg lg:text-xl"
            type="submit"
          >
            {t("register.section-page.account-game.button.btn-primary")}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-registration text-base md:text-lg lg:text-xl"
            type="button"
            onClick={handleVolverClick}
          >
            {t("register.section-page.account-game.button.btn-secondary")}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AccountIngame;
