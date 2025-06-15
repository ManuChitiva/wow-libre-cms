import React, { useState, useEffect } from "react";
import {
  createPlatform,
  getPlatforms,
  updatePlatform,
  deletePlatform,
} from "@/api/voting";
import { UserModel } from "@/context/UserContext";
import { VotingPlatforms } from "@/model/VotingPlatforms";
import Swal from "sweetalert2";

interface VoteEntry {
  name: string;
  url: string;
  ip: string;
  image: string;
}

interface VotingProps {
  token: string;
  user: UserModel;
}

const VotesDashboard: React.FC<VotingProps> = ({ token, user }) => {
  const [formData, setFormData] = useState<VoteEntry>({
    name: "",
    url: "",
    ip: "",
    image: "",
  });
  const [partners, setPartners] = useState<VotingPlatforms[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await getPlatforms(token || null);
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      const selected = partners.find((p) => p.name === value);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          name: selected.name,
          url: selected.postback_url,
          image: selected.img_url,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingId !== null) {
        await updatePlatform(
          token,
          editingId,
          formData.name,
          formData.image,
          formData.url,
          formData.ip
        );
      } else {
        await createPlatform(
          token,
          formData.name,
          formData.image,
          formData.url,
          formData.ip
        );
      }

      setFormData({ name: "", url: "", ip: "", image: "" });
      setEditingId(null);
      const updated = await getPlatforms(token);
      setPartners(updated);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la plataforma.",
      });
    }
  };

  const handleEdit = (partner: VotingPlatforms) => {
    setFormData({
      name: partner.name,
      url: partner.postback_url,
      ip: "",
      image: partner.img_url,
    });
    setEditingId(partner.id);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deletePlatform(token, id);
      const updated = await getPlatforms(token);
      setPartners(updated);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la plataforma.",
      });
    }
  };

  return (
    <div className="text-gray-200 flex flex-col items-center md:p-24 relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images4.alphacoders.com/620/thumb-1920-620388.jpg')",
        }}
      />
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10 relative z-10">
        {/* Formulario */}
        <section
          aria-label="Formulario para agregar votaciones"
          className="relative rounded-lg shadow-xl p-8 w-full md:w-[600px] bg-gray-900 border border-transparent"
          style={{
            backgroundImage: "linear-gradient(#1f2937, #111827)",
            borderImage: "linear-gradient(to right, #6366f1, #06b6d4)",
            borderImageSlice: 1,
          }}
        >
          <h2 className="text-3xl font-extrabold text-indigo-400 mb-8 tracking-wide">
            {editingId ? "Editar Plataforma" : "Administrador de Votaciones"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                Nombre de la plataforma
              </label>
              <input
                type="text"
                name="name"
                maxLength={90}
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-800 p-3 text-gray-200 border border-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                URL de votación
              </label>
              <input
                type="url"
                name="url"
                maxLength={80}
                value={formData.url}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-800 p-3 text-gray-200 border border-gray-700"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                IP
              </label>
              <input
                type="text"
                name="ip"
                maxLength={80}
                value={formData.ip}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-800 p-3 text-gray-200 border border-gray-700"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                URL de la imagen
              </label>
              <input
                type="url"
                name="image"
                maxLength={80}
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-800 p-3 text-gray-200 border border-gray-700"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full ${
                editingId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } font-semibold py-3 rounded shadow-md focus:ring-2 transition`}
            >
              {editingId ? "Actualizar plataforma" : "Agregar plataforma"}
            </button>
          </form>
        </section>

        {/* Lista de plataformas */}
        <section
          className="relative flex flex-col gap-6 w-full md:w-[700px] rounded-lg shadow-xl p-6 bg-gray-900 border border-transparent"
          style={{
            backgroundImage: "linear-gradient(#1f2937, #111827)",
            borderImage: "linear-gradient(to right, #6366f1, #06b6d4)",
            borderImageSlice: 1,
          }}
        >
          <div className="w-full rounded-lg shadow-lg p-6 bg-gray-800 max-h-[60vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-indigo-400 mb-4 tracking-wide">
              Plataformas integradas ({partners.length})
            </h3>
            {partners.length === 0 ? (
              <p className="text-gray-500">
                No hay plataformas registradas aún.
              </p>
            ) : (
              <ul className="space-y-4">
                {partners.map((partner) => (
                  <li
                    key={partner.id}
                    className="bg-gray-800 p-4 rounded-md shadow-sm border border-gray-700 w-full break-words"
                  >
                    <img
                      src={partner.img_url}
                      alt={partner.name}
                      className="w-80 h-80 object-cover rounded-full mb-2 mx-auto"
                      loading="lazy"
                    />
                    <p className="font-bold text-3xl text-center text-gray-100">
                      {partner.name}
                    </p>

                    <div className="flex justify-center gap-4 mt-4">
                      <button
                        onClick={() => handleEdit(partner)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(partner.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VotesDashboard;
