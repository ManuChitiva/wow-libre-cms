"use client";
import {
  recoverPassword,
  validateRecoverPassword,
} from "@/api/account/security";
import NavbarMinimalist from "@/components/navbar-minimalist";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [currentForm, setCurrentForm] = useState("reset");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const language = user.language;

  const handleFormChange = (formType: string) => {
    setCurrentForm(formType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await recoverPassword(email);
      setSuccessMessage(t("reset-password.section-one.success-message"));
      handleFormChange("additional");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
        color: "white",
        background: "#0B1218",
        timer: 4000,
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.toLocaleUpperCase();
    setOtp(newOtp);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    const otpCode = otp.join("");

    try {
      await validateRecoverPassword(email, otpCode, language);
      setSuccessMessage("Success");
      Swal.fire({
        icon: "success",
        title: t("reset-password.section-two.title-success"),
        text: t("reset-password.section-two.success-message"),
        color: "white",
        background: "#0B1218",
        willClose: () => {
          router.push("/login");
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setLoading(false);
    setError(null);
    setSuccessMessage(null);
    handleFormChange("reset");
  };

  return (
    <div className="contenedor bg-gradient-to-br bg-midnight text-gray-100">
      <NavbarMinimalist />
      <div className="flex items-center justify-center py-16 px-4 mt-10">
        <div className="w-full max-w-9xl bg-gray-900 border border-indigo-800/30 rounded-2xl shadow-2xl p-8 md:p-15 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mt-8">
            {currentForm === "reset" ? (
              <>
                <h1 className="text-4xl font-extrabold text-indigo-400">
                  {t("reset-password.section-one.title")}
                </h1>
                <p className="text-2xl text-slate-300">
                  {t("reset-password.section-one.sub-title")}
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                  <label htmlFor="email" className="block text-2xl">
                    <span className="text-indigo-300">
                      {t("reset-password.section-one.var-mail")}
                    </span>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t(
                        "reset-password.section-one.var-mail-placeholder"
                      )}
                      className="text-2xl mt-2 w-full px-4 py-3 text-white bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </label>
                  {error && <p className="text-red-500 text-2xl">{error}</p>}
                  {successMessage && (
                    <p className="text-green-500 text-2xl">{successMessage}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition duration-200"
                    disabled={loading}
                  >
                    {loading
                      ? t("reset-password.section-one.btn.send")
                      : t("reset-password.section-one.btn.txt")}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-extrabold text-indigo-400">
                  {t("reset-password.section-two.title")}
                </h1>
                <p className="text-2xl text-slate-300">
                  {t("reset-password.section-two.sub-title")}
                </p>

                <form onSubmit={handleOtpSubmit} className="mt-10 space-y-6">
                  <p className="text-indigo-300 text-base">
                    {t("reset-password.section-two.disclaimer")}
                  </p>
                  <div className="flex justify-between space-x-2">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-full max-w-[60px] py-4 text-center text-xl text-white bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="-"
                      />
                    ))}
                  </div>
                  {error && <p className="text-red-500 text-base">{error}</p>}

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition duration-200"
                  >
                    {loading
                      ? t("reset-password.section-two.btn.send")
                      : t("reset-password.section-two.btn.txt")}
                  </button>

                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition duration-200"
                  >
                    {t("reset-password.section-two.btn.return")}
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="w-full md:w-1/2 mt-10 md:mt-0 flex items-center justify-center">
            <img
              src="https://static.wixstatic.com/media/5dd8a0_63a72eedb8914a68b6b9356631479b66~mv2.webp"
              alt="recovery-password"
              className="rounded-2xl shadow-xl object-cover w-full h-auto max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
