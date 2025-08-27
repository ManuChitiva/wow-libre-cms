import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinnerCentral from "@/components/utilities/loading-spinner-v2";
import { PaymentMethod } from "@/model/PaymentMethod";
import {
  createPaymentMethod,
  deletePaymentMethod,
  getPaymentMethodAvailable,
} from "@/service/PaymentMethodsService";

interface PaymentMethodsDashboardProps {
  token: string;
  t: (key: string) => string;
}

const PaymentMethodsDashboard: React.FC<PaymentMethodsDashboardProps> = ({
  token,
  t,
}) => {
  const [loading, setLoading] = useState(true);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [type, setType] = useState<string>(""); // PayU o Stripe
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const data = await getPaymentMethodAvailable(token);
      setMethods(data);
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPaymentMethod(token, type, type, form);
      await fetchData();
      Swal.fire({
        icon: "success",
        title: t("payment-dashboard.success.title"),
        text: t("payment-dashboard.success.created"),
      });
      setForm({});
      setType("");
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
      title: t("payment-dashboard.confirm.title"),
      text: t("payment-dashboard.confirm.text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("payment-dashboard.confirm.confirm"),
      cancelButtonText: t("payment-dashboard.confirm.cancel"),
    });

    if (confirm.isConfirmed) {
      try {
        await deletePaymentMethod(token, id);
        await fetchData();
        Swal.fire({
          icon: "success",
          title: t("payment-dashboard.success.title"),
          text: t("payment-dashboard.success.deleted"),
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("payment-dashboard.errors.title"),
          text: t("payment-dashboard.errors.delete"),
        });
      }
    }
  };

  const renderFields = () => {
    if (type === "PAYU") {
      return (
        <>
          <InputField
            label="Host"
            name="host"
            value={form.host || ""}
            onChange={handleChange}
            placeholder="Ingrese el host de PayU"
          />
          <InputField
            label="API Key"
            name="apiKey"
            value={form.apiKey || ""}
            onChange={handleChange}
            placeholder="Ingrese su API Key"
          />
          <InputField
            label="API Login"
            name="apiLogin"
            value={form.apiLogin || ""}
            onChange={handleChange}
            placeholder="Ingrese su API Login"
          />
          <InputField
            label="Key Public"
            name="keyPublic"
            value={form.keyPublic || ""}
            onChange={handleChange}
            placeholder="Ingrese su Key Public"
          />
          <InputField
            label="Merchant ID"
            name="merchantId"
            value={form.merchantId || ""}
            onChange={handleChange}
            placeholder="Ingrese su Merchant ID"
          />
          <InputField
            label="Account ID"
            name="accountId"
            value={form.accountId || ""}
            onChange={handleChange}
            placeholder="Ingrese su Account ID"
          />
          <InputField
            label="Success URL"
            name="successUrl"
            value={form.successUrl || ""}
            onChange={handleChange}
            placeholder="Ingrese su Success URL"
          />
          <InputField
            label="Cancel URL"
            name="cancelUrl"
            value={form.cancelUrl || ""}
            onChange={handleChange}
            placeholder="Ingrese su Cancel URL"
          />
          <InputField
            label="Webhook URL"
            name="webhookUrl"
            value={form.webhookUrl || ""}
            onChange={handleChange}
            placeholder="Ingrese su Webhook URL"
          />
        </>
      );
    }
    if (type === "STRIPE") {
      return (
        <>
          <InputField
            label="API Secret"
            name="apiSecret"
            value={form.apiSecret || ""}
            onChange={handleChange}
            placeholder="Ingrese su API Secret"
          />
          <InputField
            label="API Public"
            name="apiPublic"
            value={form.apiPublic || ""}
            onChange={handleChange}
            placeholder="Ingrese su API Public"
          />
          <InputField
            label="Success URL"
            name="successUrl"
            value={form.successUrl || ""}
            onChange={handleChange}
            placeholder="Ingrese su Success URL"
          />
          <InputField
            label="Cancel URL"
            name="cancelUrl"
            value={form.cancelUrl || ""}
            onChange={handleChange}
            placeholder="Ingrese su Cancel URL"
          />
          <InputField
            label="Webhook URL"
            name="webhookUrl"
            value={form.webhookUrl || ""}
            onChange={handleChange}
            placeholder="Ingrese su Webhook URL"
          />
        </>
      );
    }
    return null;
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
      <div className="relative z-10">
        <p className="text-2xl font-bold text-center text-[#F5C657] mb-4">
          {t("payment-dashboard.info.instruction")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Formulario dinámico */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] border border-[#7a5b26] rounded-xl p-8 space-y-6 max-h-[80vh] overflow-y-auto hover:shadow-[0_0_20px_4px_#7a5b26] transition-shadow"
          >
            <h2 className="text-4xl font-bold text-[#EAC784] mb-6">
              {t("payment-dashboard.form.title")}
            </h2>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[#c2a25f] md:text-2xl">
                {t("payment-dashboard.form.select-method")}
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setForm({});
                }}
                required
                className="p-3 rounded-md bg-[#2a2a2a] border border-gray-700 focus:border-[#bfa35f] outline-none md:text-2xl text-white"
              >
                <option value="">
                  {t("payment-dashboard.form.select-placeholder")}
                </option>
                <option value="PAYU">PayU</option>
                <option value="STRIPE">Stripe</option>
              </select>
            </div>

            {renderFields()}

            <button
              type="submit"
              className="w-full bg-transparent text-[#ffcc33] font-semibold px-6 py-3 rounded border border-[#ffcc33] hover:bg-gradient-to-r hover:from-[#ffcc33]/20 hover:to-[#ffcc33]/10 transition"
            >
              {t("payment-dashboard.form.submit-button")}
            </button>
          </form>

          {/* Listado */}
          <div className="bg-[#1a1a1a] border border-[#7a5b26] rounded-xl p-8 space-y-6 max-h-[80vh] overflow-y-auto hover:shadow-[0_0_20px_4px_#7a5b26] transition-shadow">
            <h2 className="text-4xl font-bold text-[#EAC784] mb-6">
              {t("payment-dashboard.list.title")}
            </h2>
            {methods.length === 0 ? (
              <p className="text-gray-400">
                {t("payment-dashboard.list.empty")}
              </p>
            ) : (
              methods.map((method) => (
                <div
                  key={method.id}
                  className="bg-[#2a2a2a] p-4 rounded-md border border-gray-700 hover:bg-[#3a3a3a] hover:border-[#ffcc33] hover:shadow-lg transition"
                >
                  <p>
                    <span className="font-semibold text-[#c2a25f] text-2xl">
                      Nombre
                    </span>{" "}
                    {method.name}
                  </p>
                  <p>
                    <span className="font-semibold text-[#c2a25f] text-2xl">
                      Tipo:
                    </span>{" "}
                    {method.payment_type}
                  </p>
                  <p>
                    <span className="font-semibold text-[#c2a25f] text-2xl">
                      Fecha de creacion:
                    </span>{" "}
                    {method.created_at}
                  </p>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="mt-4 bg-gradient-to-r from-[#7a1f1f] to-[#a52a2a] text-[#ffcc33] font-semibold px-6 py-3 rounded border border-[#a52a2a] hover:brightness-110 transition"
                  >
                    {t("payment-dashboard.list.remove")}
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

export default PaymentMethodsDashboard;

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-[#c2a25f] md:text-2xl">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="p-3 rounded-md bg-[#2a2a2a] border border-gray-700 focus:border-[#bfa35f] outline-none md:text-2xl"
    />
  </div>
);
