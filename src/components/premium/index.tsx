import { claimBenefitsPremium, getBenefitsPremium } from "@/api/subscriptions";
import { SubscriptionsBenefit } from "@/model/model";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../utilities/loading-spinner";

interface PremiumProps {
  language: string;
  token: string;
  serverId: number;
  accountId: number;
  characterId: number;
  t: (key: string, options?: any) => string;
}

const Premium: React.FC<PremiumProps> = ({
  serverId,
  accountId,
  characterId,
  language,
  token,
  t,
}) => {
  const [subscription, setSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [subscriptionBenefits, setSubscriptionBenefits] = useState<
    SubscriptionsBenefit[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const subscriptionData = await getBenefitsPremium(
          language,
          token,
          serverId
        );
        setSubscriptionBenefits(subscriptionData.benefits);
        setSubscription(subscriptionData.benefits.length > 0);
      } catch (error) {
        console.error("Error fetching subscription benefits:", error);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchBanners();
  }, [language, token, refresh, characterId]);

  const handleButtonClick = async (benefitId: number): Promise<void> => {
    try {
      await claimBenefitsPremium(
        serverId,
        accountId,
        characterId,
        benefitId,
        language,
        token
      );
      setRefresh(true);
      setCurrentPage(1);
      Swal.fire({
        icon: "success",
        title: "¡Beneficio reclamado con éxito! 🎉",
        text: "Tu recompensa ahora está disponible. ¡Disfrútala!",
        color: "white",
        background: "#0B1218",
        confirmButtonText: "¡Genial!",
        confirmButtonColor: "#1DB954",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
      });
      return;
    }
  };

  // Calcular los elementos actuales según la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subscriptionBenefits.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(subscriptionBenefits.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="contenedor flex items-center justify-center mt-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-neon_green p-8 rounded-lg shadow-lg">
      {subscription && subscriptionBenefits.length > 0 ? (
        <div>
          {/* Contenedor general de las tarjetas */}
          <div className="max-w-full mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentItems.map((card, index) => (
                <div key={index} className="p-4">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between h-[330px] transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-gray-800 hover:via-black hover:to-gray-900">
                    {/* Imagen */}
                    <img
                      src={card.img}
                      alt={card.name}
                      className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />

                    {/* Contenido */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                        {card.name}
                      </h3>
                      <p className="text-gray-200 mb-4 text-lg flex-grow">
                        {card.description}
                      </p>
                      <button
                        onClick={() => handleButtonClick(card.id)}
                        className="w-full font-bold action-button bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white py-1 px-2 rounded-lg transition-all duration-300 shadow-lg"
                      >
                        {card.btn_txt}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles de paginación */}
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[390px] max-h-[800px] p-6 flex flex-col justify-between">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold mb-4 text-yellow-500">
              ¡Suscríbete y desbloquea un mundo de posibilidades!
            </h2>
            <p className="text-lg text-gray-300 mb-3">
              Accede a beneficios exclusivos que transformarán tu experiencia.
            </p>
            <p className="text-xl text-gray-100 font-semibold">
              Da el paso hoy y descubre todas las ventajas que hemos preparado
              para ti.{" "}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                Beneficios Exclusivos
              </h3>
              <ul className="list-disc list-inside text-gray-200 text-xl">
                <li>Acceso a eventos especiales</li>
                <li>Descuentos en productos</li>
                <li>Migraciones rápidas y seguras a otros servidores</li>
                <li>
                  Protección garantizada: tus personajes migrados sin pérdida de
                  datos
                </li>
                <li>
                  Copias de seguridad automáticas de tus personajes en
                  servidores asociados
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-yellow-500">
                Soporte Prioritario
              </h3>
              <p className="text-gray-200 text-xl">
                Obtén asistencia rápida y prioritaria para cualquier duda o
                problema que tengas.
              </p>
            </div>
          </div>

          <div className="mt-1">
            <Link
              href="#"
              className="block w-full text-center font-bold action-button bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white py-1 px-2 rounded-lg transition-all duration-300 shadow-lg"
            >
              ¡Adquiere tu Suscripción!
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;
