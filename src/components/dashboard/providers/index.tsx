import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import LoadingSpinnerCentral from "@/components/utilities/loading-spinner-v2";
import {
  createProvider,
  deleteProvider,
  getNotificationProviders,
} from "@/service/NotificationProviderService";
import { NotificationProviders } from "@/model/NotificationProviders";

interface FormConnection {
  name: string;
  host: string;
  client: string;
  secret: string;
}

interface ConnectionDashboardProps {
  token: string;
  t: (key: string) => string;
}

const ProviderConfigs: React.FC<ConnectionDashboardProps> = ({ token, t }) => {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<NotificationProviders[]>([]);
  const [form, setForm] = useState<FormConnection>({
    name: "",
    host: "",
    client: "",
    secret: "",
  });

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const data = await getNotificationProviders(token);
      setConnections(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (value.length > 100) {
      Swal.fire({
        icon: "warning",
        title: t("providers-dashboard.errors.warning"),
        text: t("providers-dashboard.errors.long-value"),
      });
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProvider(
        form.name,
        form.host,
        form.client,
        form.secret,
        token
      );
      await fetchData();
      Swal.fire({
        icon: "success",
        title: t("providers-dashboard.success.title"),
        text: t("providers-dashboard.success.created"),
      });
      setForm({ name: "", host: "", client: "", secret: "" });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: t("providers-dashboard.confirm.title"),
      text: t("providers-dashboard.confirm.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("providers-dashboard.confirm.confirm"),
      cancelButtonText: t("providers-dashboard.confirm.cancel"),
    });

    if (confirm.isConfirmed) {
      try {
        await deleteProvider(id, token);
        await fetchData();
        Swal.fire({
          icon: "success",
          title: t("providers-dashboard.success.title"),
          text: t("providers-dashboard.success.deleted"),
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("providers-dashboard.errors.title"),
          text: t("providers-dashboard.errors.delete"),
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <LoadingSpinnerCentral />
      </div>
    );
  }

  return (
    <div className="relative text-gray-300 p-8 bg-black m-10">
      <div className="absolute inset-0 bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="relative z-10">
        <p className="text-2xl font-bold text-center text-[#F5C657] mb-4">
          {t("providers-dashboard.info.instruction")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] border border-[#7a5b26] rounded-xl p-8 space-y-6 max-h-[80vh] overflow-y-auto hover:shadow-[0_0_20px_4px_#7a5b26] transition-shadow"
          >
            <h2 className="text-4xl font-bold text-[#EAC784] mb-6">
              {t("providers-dashboard.info.form-title")}
            </h2>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#c2a25f] md:text-2xl">
                {t("providers-dashboard.form.select-service")}
              </label>
              <select
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="p-3 rounded-md bg-[#2a2a2a] border border-gray-700 focus:border-[#bfa35f] outline-none md:text-2xl text-white"
              >
                <option value="">
                  {t("providers-dashboard.form.select-placeholder")}
                </option>
                <option value="METRICS">
                  {t("providers-dashboard.form.metrics-option")}
                </option>
                <option value="MAILS">
                  {t("providers-dashboard.form.mails-option")}
                </option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#c2a25f] md:text-2xl">
                {t("providers-dashboard.form.host-label")}
              </label>
              <input
                type="text"
                name="host"
                max={50}
                placeholder={t("providers-dashboard.form.host-placeholder")}
                value={form.host}
                onChange={handleChange}
                required
                className="p-3 rounded-md bg-[#2a2a2a] border border-gray-700 focus:border-[#bfa35f] outline-none md:text-2xl"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#c2a25f] md:text-2xl">
                {t("providers-dashboard.form.client-label")}
              </label>
              <input
                type="text"
                name="client"
                max={50}
                placeholder={t("providers-dashboard.form.client-placeholder")}
                value={form.client}
                onChange={handleChange}
                required
                className="p-3 rounded-md bg-[#2a2a2a] border border-gray-700 focus:border-[#bfa35f] outline-none md:text-2xl"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#c2a25f] md:text-2xl">
                {t("providers-dashboard.form.secret-label")}
              </label>
              <input
                type="text"
                name="secret"
                max={50}
                placeholder={t("providers-dashboard.form.secret-placeholder")}
                value={form.secret}
                onChange={handleChange}
                required
                className="p-3 rounded-md bg-[#2a2a2a] border border-gray-700 focus:border-[#bfa35f] outline-none md:text-2xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-transparent text-[#ffcc33] font-semibold px-6 py-3 rounded border border-[#ffcc33] hover:bg-gradient-to-r hover:from-[#ffcc33]/20 hover:to-[#ffcc33]/10 transition"
            >
              {t("providers-dashboard.form.submit-button")}
            </button>
          </form>

          {/* List */}
          <div className="bg-[#1a1a1a] border border-[#7a5b26] rounded-xl p-8 space-y-6 max-h-[80vh] overflow-y-auto hover:shadow-[0_0_20px_4px_#7a5b26] transition-shadow">
            <h2 className="text-4xl font-bold text-[#EAC784] mb-6">
              {t("providers-dashboard.list.title")}
            </h2>

            {connections.length === 0 ? (
              <p className="text-gray-400">
                {t("providers-dashboard.list.empty")}
              </p>
            ) : (
              connections.map((conn) => (
                <div
                  key={conn.id}
                  className="bg-[#2a2a2a] p-4 rounded-md border border-gray-700 hover:bg-[#3a3a3a] hover:border-[#ffcc33] hover:shadow-lg transition"
                >
                  <p>
                    <span className="font-semibold text-[#c2a25f] text-2xl">
                      {t("providers-dashboard.list.type")}:
                    </span>{" "}
                    {conn.name}
                  </p>
                  <p>
                    <span className="font-semibold text-[#c2a25f] text-2xl">
                      {t("providers-dashboard.list.host")}:
                    </span>{" "}
                    {conn.host}
                  </p>
                  <p>
                    <span className="font-semibold text-[#c2a25f] text-2xl">
                      {t("providers-dashboard.list.client")}:
                    </span>{" "}
                    {conn.client}
                  </p>
                  <button
                    onClick={() => handleDelete(conn.id)}
                    className="mt-4 bg-gradient-to-r from-[#7a1f1f] to-[#a52a2a] text-[#ffcc33] font-semibold px-6 py-3 rounded border border-[#a52a2a] hover:brightness-110 transition"
                  >
                    {t("providers-dashboard.list.remove")}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderConfigs;
