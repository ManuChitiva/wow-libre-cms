"use client";
import { createBanner, deleteBanner, getBanners } from "@/api/advertising";
import { Banners } from "@/model/banners";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface AdvertisingBannersProps {
  token: string;
}

const BannersAdvertisingDashboard: React.FC<AdvertisingBannersProps> = ({
  token,
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
        title: "¡Éxito!",
        text: "Banner creado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton:
            "bg-indigo-600 text-white font-semibold py-2 px-4 rounded",
        },
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
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
        title: "¡Éxito!",
        text: "Banner eliminado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton:
            "bg-indigo-600 text-white font-semibold py-2 px-4 rounded",
        },
      });
      fetchBanners();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error al eliminar el banner: ${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Administración de Banners
        </h1>
        <p className="text-lg text-gray-400">
          (Crea y gestiona banners publicitarios)
        </p>
        <p className="mt-4 text-md text-orange-400 font-medium bg-orange-900/20 inline-block px-4 py-2 rounded-lg">
          ⚠️ Solo se pueden crear hasta <strong>5 banners</strong> por tipo en
          cada idioma.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row h-full gap-8">
        {/* Formulario - Lado izquierdo */}
        <div className="flex-1 bg-gray-800 p-8 rounded-2xl shadow-lg h-full">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Crear Nuevo Banner
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Media URL *</label>
              <input
                type="text"
                name="media_url"
                value={form.media_url}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Texto alternativo (alt) *
              </label>
              <input
                type="text"
                name="alt"
                value={form.alt}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600"
                placeholder="Descripción accesible"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Idioma *</label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600"
              >
                <option value="" disabled>
                  Selecciona un idioma
                </option>
                <option value="ES">Español</option>
                <option value="EN">Inglés</option>
                <option value="PT">Portugués</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Tipo *</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600"
              >
                <option value="IMAGE">Imagen</option>
                <option value="VIDEO">Video</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">
                Mensaje para el video (opcional)
              </label>
              <input
                type="text"
                name="label"
                value={form.label}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600"
                placeholder="Ej: Banner Promoción"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-md font-semibold"
            >
              Agregar Banner
            </button>
          </form>
        </div>

        {/* Grid de banners - Lado derecho */}
        <div className="flex-1 h-full overflow-y-auto">
          <div className="mb-4">
            <label
              htmlFor="language"
              className="block mb-2 text-lg font-medium "
            >
              Filtrar por idioma
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="p-2 rounded-md bg-gray-700 border border-gray-600 text-white"
            >
              <option value="ES">Español</option>
              <option value="EN">Inglés</option>
              <option value="PT">Portugues</option>
            </select>
          </div>

          <h3 className="text-2xl font-bold mb-6">Banners Registrados</h3>
          {banners.length === 0 ? (
            <p className="text-gray-400">No hay banners cargados todavía.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
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
                    <p className="font-bold text-white">{banner.alt}</p>
                    <p className="text-sm text-gray-400">
                      Idioma: {banner.language} | Tipo: {banner.type}
                    </p>
                    {banner.label && (
                      <p className="text-xs mt-2 text-blue-400">
                        {banner.label}
                      </p>
                    )}
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="text-lg inline-flex items-center text-white bg-orange-500 border border-orange-600 focus:outline-none hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg px-3 py-1.5 dark:bg-orange-600 dark:text-white dark:border-orange-700 dark:hover:bg-orange-700 dark:hover:border-orange-700 dark:focus:ring-orange-800"
                    >
                      Eliminar
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
