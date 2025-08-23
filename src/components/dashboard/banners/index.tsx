"use client";
import { createBanner, deleteBanner, getBanners } from "@/api/advertising";
import { Banners } from "@/model/banners";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface AdvertisingBannersProps {
  token: string;
  t: (key: string) => string;
}

const BannersAdvertisingDashboard: React.FC<AdvertisingBannersProps> = ({
  token,
  t,
}) => {
  const [banners, setBanners] = useState<Banners[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("es");

  useEffect(() => {
    fetchBanners();
  }, [selectedLanguage, token]);

  const fetchBanners = async () => {
    try {
      const fetchedBanners = await getBanners(selectedLanguage);
      setBanners(fetchedBanners);
    } catch (error) {
      console.error("Error al obtener los banners:", error);
    }
  };

  const [form, setForm] = useState<Banners>({
    id: 0,
    media_url: "",
    alt: "",
    language: "",
    type: "IMAGE",
    label: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBanner(
        form.language,
        form.media_url,
        form.alt,
        form.type,
        form.label,
        token
      );

      setForm({
        id: 0,
        media_url: "",
        alt: "",
        language: "",
        type: "IMAGE",
        label: "",
      });
      fetchBanners();
      Swal.fire({
        title: t("banners-dashboard.alerts.create-success-title"),
        text: t("banners-dashboard.alerts.create-success-message"),
        icon: "success",
        confirmButtonText: t("banners-dashboard.buttons.accept"),
        customClass: {
          confirmButton:
            "bg-cyan-600 text-white font-semibold py-2 px-4 rounded",
        },
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: t("banners-dashboard.alerts.create-error-title"),
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
    }
  };

  const handleDelete = async (bannerId: number) => {
    try {
      await deleteBanner(bannerId, token);
      Swal.fire({
        title: t("banners-dashboard.alerts.delete-success-title"),
        text: t("banners-dashboard.alerts.delete-success-message"),
        icon: "success",
        confirmButtonText: t("banners-dashboard.buttons.accept"),
        customClass: {
          confirmButton:
            "bg-cyan-600 text-white font-semibold py-2 px-4 rounded",
        },
      });
      fetchBanners();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: t("banners-dashboard.alerts.delete-error-title"),
        text: `${t("banners-dashboard.alerts.delete-error-message")} ${
          error.message
        }`,
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-10 px-6">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-[#EAC784] mb-2">
          {t("banners-dashboard.title")}
        </h1>
        <p className="text-lg text-gray-300">
          {t("banners-dashboard.subtitle")}
        </p>
        <p
          className="mt-4 text-md text-[#ffcc33] font-medium bg-[#7a5b26]/20 inline-block px-4 py-2 rounded-lg border border-[#bfa35f]/40"
          dangerouslySetInnerHTML={{ __html: t("banners-dashboard.warning") }}
        />
      </div>

      <div className="flex flex-col lg:flex-row h-full gap-8">
        {/* Formulario */}
        <div className="flex-1 bg-[#1a1a1a] p-8 rounded-lg shadow-lg h-full border border-[#7a5b26]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#EAC784] tracking-wide">
            {t("banners-dashboard.form.title")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-[#c2a25f]">
                {t("banners-dashboard.form.media-label")}
              </label>
              <input
                type="text"
                name="media_url"
                value={form.media_url}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-700 text-white focus:border-[#bfa35f] outline-none"
                placeholder={t("banners-dashboard.form.media-placeholder")}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#c2a25f]">
                {t("banners-dashboard.form.alt-label")}
              </label>
              <input
                type="text"
                name="alt"
                value={form.alt}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-700 text-white focus:border-[#bfa35f] outline-none"
                placeholder={t("banners-dashboard.form.alt-placeholder")}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#c2a25f]">
                {t("banners-dashboard.form.language-label")}
              </label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-700 text-white focus:border-[#bfa35f] outline-none"
              >
                <option value="" disabled>
                  {t("banners-dashboard.form.language-placeholder")}
                </option>
                <option value="ES">Español</option>
                <option value="EN">Inglés</option>
                <option value="PT">Portugués</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#c2a25f]">
                {t("banners-dashboard.form.type-label")}
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-700 text-white focus:border-[#bfa35f] outline-none"
              >
                <option value="IMAGE">
                  {t("banners-dashboard.form.type-image")}
                </option>
                <option value="VIDEO">
                  {t("banners-dashboard.form.type-video")}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#c2a25f]">
                {t("banners-dashboard.form.label-label")}
              </label>
              <input
                type="text"
                name="label"
                value={form.label}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-700 text-white focus:border-[#bfa35f] outline-none"
                placeholder={t("banners-dashboard.form.label-placeholder")}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-transparent border border-[#ffcc33] text-[#ffcc33] font-semibold py-3 rounded hover:bg-gradient-to-r hover:from-[#ffcc33]/20 hover:to-[#ffcc33]/10 transition"
            >
              {t("banners-dashboard.form.submit")}
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="flex-1 h-full overflow-y-auto">
          <div className="mb-4">
            <label
              htmlFor="language"
              className="block mb-2 text-lg font-medium text-[#EAC784]"
            >
              {t("banners-dashboard.list.filter-label")}
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="p-2 rounded-md bg-[#2a2a2a] border border-gray-700 text-white focus:border-[#bfa35f] outline-none"
            >
              <option value="ES">Español</option>
              <option value="EN">Inglés</option>
              <option value="PT">Portugués</option>
            </select>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-[#EAC784] tracking-wide">
            {t("banners-dashboard.list.title")}
          </h3>
          {banners.length === 0 ? (
            <p className="text-gray-400">{t("banners-dashboard.list.empty")}</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] border border-[#7a5b26] rounded-lg overflow-hidden shadow-lg hover:border-[#ffcc33] transition"
                >
                  {banner.type === "IMAGE" ? (
                    <img
                      src={banner.media_url}
                      alt={banner.alt}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <video
                      src={banner.media_url}
                      controls
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <p className="font-bold text-[#EAC784]">{banner.alt}</p>
                    <p className="text-sm text-gray-400">
                      Idioma: {banner.language} | Tipo: {banner.type}
                    </p>
                    {banner.label && (
                      <p className="text-xs mt-2 text-[#ffcc33]">
                        {banner.label}
                      </p>
                    )}
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="mt-3 inline-flex items-center text-[#ffcc33] bg-gradient-to-r from-[#7a1f1f] to-[#a52a2a] border border-[#a52a2a] font-medium rounded-lg px-3 py-1.5 hover:brightness-110 transition"
                    >
                      {t("banners-dashboard.buttons.delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannersAdvertisingDashboard;
