"use client";

import { registerAccountWeb } from "@/api/account/register";
import Footer from "@/components/footer";
import NavbarMinimalist from "@/components/navbar-minimalist";
import PageCounter from "@/components/utilities/counter";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import TitleWow from "@/components/utilities/serverTitle";
import AlertComponent from "@/components/utilities/show-alert";
import { GOOGLE_API_KEY_RE_CAPTCHA } from "@/configs/configs";
import { useUserContext } from "@/context/UserContext";
import { AccountWebRequestDto } from "@/model/model";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import "../style.css";

const AccountWeb = () => {
  const { user, setUser } = useUserContext();
  const language = user.language;
  const country = user.country;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const siteKey = GOOGLE_API_KEY_RE_CAPTCHA;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    (window as any).onCaptchaResolved = (token: string) => {
      setCaptchaToken(token);
    };

    return () => {
      document.body.removeChild(script);

      // Limpia la función global para evitar fugas de memoria
      delete (window as any).onCaptchaResolved;
    };
  }, []);

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
    if (!captchaToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Capcha invalid",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.password-web-no-matches"),
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
        text: t("register.error.password-web-empty"),
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
        text: t("register.error.password-web-empty"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const userDateOfBirth = user.date_of_birth;

      const formattedDateOfBirth = userDateOfBirth
        ? !isNaN(new Date(userDateOfBirth).getTime())
          ? new Date(userDateOfBirth).toISOString().split("T")[0]
          : new Date().toISOString()
        : new Date().toISOString();

      const requestBody: AccountWebRequestDto = {
        country: user.country,
        date_of_birth: formattedDateOfBirth,
        first_name: user.first_name,
        last_name: user.last_name,
        cell_phone: user.cell_phone || null,
        email: user.email,
        password: password,
        language: language,
        token: captchaToken,
      };

      const response = await registerAccountWeb(requestBody, language);
      const { jwt, refresh_token, expiration_date, avatar_url } = response;
      const expirationDateUTC = new Date(expiration_date).toUTCString();

      setUser({
        id: null,
        username: "",
        country: country,
        language: language,
        date_of_birth: null,
        first_name: "",
        last_name: "",
        cell_phone: "",
        email: "",
        logged_in: true,
        avatar: avatar_url,
        expansion: null,
        server: null,
        pending_validation: false,
      });

      Cookies.set("token", jwt, {
        expires: new Date(expirationDateUTC),
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("refresh_token", refresh_token, {
        expires: new Date(expirationDateUTC),
        secure: true,
        sameSite: "Strict",
      });
    } catch (error: any) {
      setError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    router.push(`/register/username?showWelcome=true`);
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="contenedor register">
      <NavbarMinimalist />
      {error && (
        <AlertComponent
          error={error}
          btn_primary_txt={t("errors.show-alert.btn-primary")}
          btn_secondary_txt={t("errors.show-alert.btn-secondary")}
        />
      )}
      <div className="register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.account-web.title-server-message"
          )}
        />
        <form
          className="register-container-form pt-5"
          onSubmit={handleFormSubmit}
        >
          <div className="hidden">
            <label
              htmlFor="usernameInput"
              className="mb-2 register-container-form-label"
            >
              Username
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              id="usernameInput"
              placeholder="Username"
              value={user.username}
              readOnly
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="passInput"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.account-web.input.password-web-text")}
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              id="passInput"
              placeholder={t(
                "register.section-page.account-web.input.password-web-placeholder"
              )}
              value={password}
              required
              autoComplete="new-password"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="confirmPassInput"
              className="mb-2 register-container-form-label"
            >
              {t(
                "register.section-page.account-web.input.password-confirm-web-text"
              )}
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              id="confirmPassInput"
              autoComplete="new-password"
              placeholder={t(
                "register.section-page.account-web.input.password-confirm-web-text-placeholder"
              )}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="g-recaptcha"
              id="recaptcha"
              data-sitekey={siteKey}
              data-callback="onCaptchaResolved"
            ></div>
            <br />
          </div>
          {isSubmitting && (
            <div className="mb-4 text-center">
              <LoadingSpinner />
            </div>
          )}
          <PageCounter currentSection={5} totalSections={5} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.account-web.button.btn-primary")}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
          >
            {t("register.section-page.account-web.button.btn-secondary")}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AccountWeb;
