"use client";

import "../style.css";

import PageCounter from "@/components/utilities/counter";
import TitleWow from "@/components/utilities/serverTitle";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import Cookies from "js-cookie";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import Footer from "@/components/footer";
import useAuth from "@/hook/useAuth";

import { registerAccountGame } from "@/api/account/register";
import { useTranslation } from "react-i18next";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const AccountIngame = () => {
  const { user } = useUserContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const jwt = Cookies.get("token");
  const { t } = useTranslation();

  useAuth(t("errors.message.expiration-session"));

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.password-game-no-matches"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.password-game-empty"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (password.trim().length < 5 || password.trim().length > 30) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.password-game-invalid-length"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    setIsSubmitting(true);

    try {
      await registerAccountGame(
        {
          username: user.username,
          password: password,
          realm_name: user.server || "",
          expansion: user.expansion || "",
          game_mail: user.email,
        },
        jwt || ""
      );

      router.push("/accounts");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVolverClick = () => {
    router.push("/accounts");
  };

  return (
    <div className="contenedor ">
      <NavbarAuthenticated />
      <div className="register-container register">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.finaly-create-account-game.title-server-message"
          )}
        />
        <form
          className="register-container-form pt-5"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group">
            <label
              htmlFor="input-password"
              className="mb-2 register-container-form-label"
            >
              {t(
                "register.section-page.finaly-create-account-game.password-txt"
              )}
            </label>

            <input
              id="input-password"
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              maxLength={20}
              type="password"
              placeholder={t(
                "register.section-page.finaly-create-account-game.password-placeholder"
              )}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="input-confirm-password"
              className="mb-2 register-container-form-label"
            >
              {t(
                "register.section-page.finaly-create-account-game.confirm-password-txt"
              )}
            </label>
            <input
              id="input-confirm-password"
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              maxLength={20}
              placeholder={t(
                "register.section-page.finaly-create-account-game.confirm-password-placeholder"
              )}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {isSubmitting && (
            <div className="flex flex-col items-center justify-center mb-4">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600 text-lg">
                {t(
                  "register.section-page.finaly-create-account-game.loading-sniper-txt"
                )}
              </p>
            </div>
          )}
          <PageCounter currentSection={2} totalSections={2} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register text-base md:text-lg lg:text-xl"
            type="submit"
            disabled={isSubmitting}
          >
            {t(
              "register.section-page.finaly-create-account-game.button.btn-primary"
            )}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register text-base md:text-lg lg:text-xl"
            type="button"
            disabled={isSubmitting}
            onClick={handleVolverClick}
          >
            {t(
              "register.section-page.finaly-create-account-game.button.btn-secondary"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AccountIngame;
