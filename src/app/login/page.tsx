"use client";

import { login } from "@/api/account/login";
import LoadingSpinner from "@/components/utilities/loading-spinner";
import UseAuthRedirect from "@/components/utilities/logged-in";
import AlertComponent from "@/components/utilities/show-alert";
import { webProps } from "@/constants/configs";
import { useUserContext } from "@/context/UserContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import "./style.css";

const Login = () => {
  const { t } = useTranslation();
  const { user, setUser } = useUserContext();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  /* VALIDA SI YA ESTA LOGUEADO */
  UseAuthRedirect();

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userName.trim() && !password.trim()) {
      Swal.fire({
        icon: "warning",
        title: t("login.error.empty-field-title"),
        text: t("login.error.empty-field-message"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: t("login.error.empty-field-buttom-message"),
        timer: 4500,
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await login(userName, password);
      const { jwt, refresh_token, expiration_date, avatar_url, language } =
        response;
      const expirationDateUTC = new Date(expiration_date).toUTCString();

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

      if (user) {
        setUser({
          ...user,
          logged_in: true,
          avatar: avatar_url,
          language: language,
          pending_validation: false,
        });
      }

      router.push("/accounts");
    } catch (error: any) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      {error && (
        <AlertComponent
          error={error}
          btn_primary_txt={t("errors.show-alert.btn-primary")}
          btn_secondary_txt={t("errors.show-alert.btn-secondary")}
        />
      )}
      <div className="login-banner">
        <img src={webProps.loginBanner} alt="LoginImage" />
      </div>
      <div className="login-form">
        <div className="login-form-btn-back text-xl md:text-4xl lg:text-5xl xl:text-5xl">
          <a href="/">X</a>
        </div>
        <div className="login-form-section-primary">
          <h2 className="font-semibold text-3xl md:text-6xl lg:text-6xl xl:text-6xl">
            {t("login.title")}
          </h2>
        </div>
        <div className="login-form-section-register">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="email" className="mb-2">
              {t("login.username")}
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="email"
              onChange={handleUserNameChange}
            />
            <label htmlFor="password" className="mb-2">
              {t("login.password")}
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            {isSubmitting && (
              <div className="mb-4 text-center">
                <LoadingSpinner />
              </div>
            )}
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 login-form-section-register-buttom"
              type="submit"
            >
              {t("login.buttom")}
            </button>
          </form>
          <div className="login-form-section-question mt-2">
            <p>
              {t("login.create-account-question")}
              <Link
                className="hover:text-gray-400 font-semibold border-b-2 border-orange-400"
                href="/register"
              >
                {t("login.create-account-message")}
              </Link>
            </p>

            <p>
              <Link
                className=" hover:text-gray-400 font-semibold"
                href="/recovery"
              >
                {t("login.old-password")}
              </Link>
            </p>
          </div>
          <div className="login-form-section-footer pt-2">
            <div className="mt-28 text-xl md:text-1xl lg:text-2xl xl:text-2xl">
              © {webProps.serverName} {new Date().getFullYear()} — All rights
              reserved. Thank you for being part of our community!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
