import { createFaq, deleteFaq, getFaqs } from "@/api/faqs";
import { FaqType } from "@/enums/FaqType";
import { FaqsModel } from "@/model/model";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface FaqsDashboardProps {
  token: string;
  t: (key: string) => string;
}

type FaqWithLanguage = FaqsModel & {
  language: string;
};

const FaqsDashboard: React.FC<FaqsDashboardProps> = ({ token, t }) => {
  const [faqs, setFaqs] = useState<FaqWithLanguage[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("ES");
  const [type, setType] = useState<FaqType>(FaqType.SUPPORT);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ES");
  const [selectedType, setSelectedType] = useState<FaqType>(FaqType.SUPPORT);

  const fetchAllFaqs = async () => {
    setLoading(true);

    try {
      const faqsData = await getFaqs(selectedType, selectedLanguage);

      const faqsWithLang = faqsData.map((faq) => ({
        ...faq,
        language: selectedLanguage,
      }));

      setFaqs(faqsWithLang);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFaqs();
  }, [selectedLanguage, selectedType]);

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim() || !language || !type) return;

    try {
      await createFaq(question, answer, type, language, token);

      Swal.fire({
        icon: "success",
        title: "FAQ agregada",
        text: "La pregunta frecuente fue agregada exitosamente.",
        confirmButtonText: "Aceptar",
      });
      fetchAllFaqs();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: err.message,
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleDelete = async (idFaq: number) => {
    try {
      await deleteFaq(idFaq, token);
      Swal.fire({
        icon: "success",
        title: "FAQ eliminada",
        text: "La pregunta frecuente fue eliminada exitosamente.",
        confirmButtonText: "Aceptar",
      });
      fetchAllFaqs();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar",
        text: err.message,
        confirmButtonText: "Aceptar",
      });
    }
  };

  const filteredInfoFaqs = faqs.filter(
    (f) => f.language === selectedLanguage && f.type === selectedType
  );

  return (
    <div className="text-gray-200 flex flex-col items-center md:p-24 relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://images4.alphacoders.com/620/thumb-1920-620386.jpg')",
        }}
      />
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10 relative z-10">
        {/* Formulario */}
        <section
          aria-label="Formulario para agregar FAQs"
          className="relative rounded-lg shadow-xl p-8 w-full md:w-[600px] bg-[#1a1a1a] border border-[#7a5b26] transition-shadow duration-300 hover:shadow-[0_0_25px_5px_#7a5b26]"
          style={{
            backgroundImage: "linear-gradient(#1a1a1a, #111111)",
          }}
        >
          <h2 className="text-3xl font-extrabold text-[#c9aa57] mb-8 tracking-wide">
            {t("faqs-dashboard.title")}
          </h2>

          <form onSubmit={handleAddFaq} className="space-y-6">
            <div>
              <label
                htmlFor="question"
                className="block mb-2 font-semibold text-gray-300"
              >
                {t("faqs-dashboard.question")}
              </label>
              <input
                id="question"
                type="text"
                className="w-full rounded-md bg-[#111111] p-3 text-gray-200 border border-[#7a5b26] focus:border-[#c9aa57] focus:outline-none transition"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="block mb-2 font-semibold text-gray-300"
              >
                {t("faqs-dashboard.answer")}
              </label>
              <textarea
                id="answer"
                rows={4}
                className="w-full rounded-md bg-[#111111] p-3 text-gray-200 border border-[#7a5b26] focus:border-[#c9aa57] focus:outline-none transition resize-none"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-2 font-semibold text-gray-300">
                  {t("faqs-dashboard.language.title")}
                </label>
                <select
                  className="w-full rounded-md bg-[#111111] p-3 text-gray-200 border border-[#7a5b26] focus:border-[#c9aa57]"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                >
                  <option value="ES"> {t("faqs-dashboard.language.es")}</option>
                  <option value="EN">{t("faqs-dashboard.language.en")}</option>
                  <option value="PT">{t("faqs-dashboard.language.pt")}</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block mb-2 font-semibold text-gray-300">
                  {t("faqs-dashboard.type.title")}
                </label>
                <select
                  className="w-full rounded-md bg-[#111111] p-3 text-gray-200 border border-[#7a5b26] focus:border-[#c9aa57]"
                  value={type}
                  onChange={(e) => setType(e.target.value as FaqType)}
                  required
                >
                  <option value={FaqType.SUPPORT}>
                    {t("faqs-dashboard.type.support")}
                  </option>
                  <option value={FaqType.SUBSCRIPTION}>
                    {t("faqs-dashboard.type.subscription")}
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7a5b26] hover:bg-[#9c7b30] font-semibold py-3 rounded shadow-md focus:ring-2 focus:ring-[#c9aa57] transition"
            >
              {t("faqs-dashboard.btn.add-faq")}
            </button>
          </form>
        </section>

        {/* Listado */}
        <section
          className="relative flex flex-col gap-6 w-full md:w-[700px] rounded-lg shadow-xl p-6 bg-[#1a1a1a] border border-[#7a5b26]"
          style={{
            backgroundImage: "linear-gradient(#1a1a1a, #111111)",
          }}
        >
          <div className="mb-4 px-4 sm:px-6 pt-6 space-y-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                {t("faqs-dashboard.filter-faqs-type")}
              </label>
              <select
                className="w-full sm:w-48 rounded-md bg-[#111111] p-3 text-gray-200 border border-[#7a5b26]"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="ES">{t("faqs-dashboard.language.es")}</option>
                <option value="EN">{t("faqs-dashboard.language.en")}</option>
                <option value="PT">{t("faqs-dashboard.language.pt")}</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-300">
                {t("faqs-dashboard.filter-faqs-language")}
              </label>
              <select
                className="w-full sm:w-48 rounded-md bg-[#111111] p-3 text-gray-200 border border-[#7a5b26]"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as FaqType)}
              >
                <option value={FaqType.SUPPORT}>
                  {t("faqs-dashboard.type.support")}
                </option>
                <option value={FaqType.SUBSCRIPTION}>
                  {t("faqs-dashboard.type.subscription")}
                </option>
              </select>
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-6">
            <div className="w-full rounded-lg shadow-lg p-6 bg-[#111111] max-h-[60vh] overflow-y-auto">
              <h3 className="text-2xl font-semibold text-[#c9aa57] mb-4 tracking-wide">
                FAQs Filtradas
              </h3>
              {loading ? (
                <div className="relative flex justify-center py-4">
                  <svg
                    className="animate-spin h-10 w-10 text-[#7a5b26]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      strokeWidth="4"
                      stroke="currentColor"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4.29 4.29a1 1 0 011.42 0L12 10.59l6.29-6.3a1 1 0 011.42 1.42l-7 7a1 1 0 01-1.42 0l-7-7a1 1 0 010-1.42z"
                    ></path>
                  </svg>
                </div>
              ) : filteredInfoFaqs.length === 0 ? (
                <p className="text-gray-500">
                  {t("faqs-dashboard.empty.title")}
                </p>
              ) : (
                <ul className="space-y-4">
                  {filteredInfoFaqs.map((faq, idx) => (
                    <li
                      key={idx}
                      className="bg-[#1a1a1a] p-5 rounded-lg shadow-md border border-[#7a5b26] w-full break-words"
                    >
                      <p className="text-sm font-semibold text-[#c2a25f] mb-2 uppercase tracking-wide break-words whitespace-normal">
                        {t("faqs-dashboard.language-text")}: {faq.language} |{" "}
                        {t("faqs-dashboard.type-text")}: {faq.type}
                      </p>

                      <p className="font-bold text-lg text-[#EAC784] leading-snug mb-2 break-words whitespace-normal">
                        {faq.question}
                      </p>

                      <p className="text-base text-gray-300 leading-relaxed break-words whitespace-normal mb-4">
                        {faq.answer}
                      </p>

                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="mt-2 px-4 py-2 bg-gradient-to-r from-[#7a1f1f] to-[#a52a2a] text-[#ffcc33] font-medium rounded-md border border-[#a52a2a] hover:brightness-110 transition"
                      >
                        {t("faqs-dashboard.btn.delete-faq")}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FaqsDashboard;
