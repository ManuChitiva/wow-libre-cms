import {
  createNew,
  createNewSection,
  deleteNewsById,
  deleteNewSection,
  getNews,
  getNewsById,
  updateNew,
} from "@/api/news";
import { NewsModel } from "@/model/News";
import { Section } from "@/model/NewsSections";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Swal from "sweetalert2";

interface NewsProps {
  token: string;
}

const NewsAdministrator: React.FC<NewsProps> = ({ token }) => {
  const [newsList, setNewsList] = useState<NewsModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [subnewsList, setSubnewsList] = useState<Section[]>([]);
  const [showSubnewsModal, setShowSubnewsModal] = useState(false);
  const [loadingSubnews, setLoadingSubnews] = useState(false);
  const [subnewsForm, setSubnewsForm] = useState({
    title: "",
    content: "",
    imgUrl: "",
  });
  const [showCreateSubnewsForm, setShowCreateSubnewsForm] = useState(false);
  const [parentNewsId, setParentNewsId] = useState<number | null>(null);
  const [globalIdCard, setGlobalIdCard] = useState<number>(0);

  const [form, setForm] = useState({
    title: "",
    sub_title: "",
    img_url: "",
    author: "",
  });
  const openSubnewsForm = (id: number) => {
    setParentNewsId(id);
    setSubnewsForm({ title: "", content: "", imgUrl: "" });
    setShowCreateSubnewsForm(true);
  };

  // Estado para la noticia seleccionada (para actualizar o crear subnoticias)
  const [selectedNews, setSelectedNews] = useState<NewsModel | null>(null);

  // Estado para la página actual
  const [page, setPage] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para seleccionar noticia y cargar datos en formulario
  const handleSelectNews = (news: NewsModel) => {
    setForm({
      title: news.title,
      sub_title: news.sub_title,
      img_url: news.img_url,
      author: news.author,
    });
    setSelectedNews(news);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const news = await getNews(5, page);
      setNewsList(news);
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setLoading(false);
    }
  };

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 100,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  // Función para actualizar noticia (a completar según backend)
  const handleUpdate = async () => {
    if (!selectedNews) {
      alert("Seleccione una noticia para actualizar.");
      return;
    }
    try {
      await updateNew(
        selectedNews.id,
        form.title,
        form.sub_title,
        form.img_url,
        form.author,
        token
      );

      await Swal.fire({
        title: "¡Éxito!",
        text: "La subnoticia ha sido creada correctamente.",
        icon: "success",
      });

      setPage(0);
      fetchData();
    } catch (error: any) {
      console.error("Error al crear subnoticia:", error);
      await Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  // Función para crear subnoticia
  const handleCreate = async () => {
    try {
      await createNew(
        form.title,
        form.sub_title,
        form.img_url,
        form.author,
        token
      );

      await Swal.fire({
        title: "¡Éxito!",
        text: "La subnoticia ha sido creada correctamente.",
        icon: "success",
      });

      setPage(0);
      fetchData();
    } catch (error: any) {
      console.error("Error al crear subnoticia:", error);
      await Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleCreateSubnews = async (id: number) => {
    try {
      await createNewSection(
        id,
        form.title,
        form.sub_title,
        form.img_url,
        form.author,
        token
      );

      await Swal.fire({
        title: "¡Éxito!",
        text: "La subnoticia ha sido creada correctamente.",
        icon: "success",
      });

      setPage(0);
      fetchData();
    } catch (error: any) {
      console.error("Error al crear subnoticia:", error);
      await Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  // Función para mostrar subnoticias
  const handleShowSubnews = async (id: number) => {
    if (!id) {
      alert("Seleccione una noticia para ver sus subnoticias.");
      return;
    }
    try {
      setLoadingSubnews(true);
      const newsWithSections = await getNewsById(id);
      setSubnewsList(newsWithSections.sections);
      setShowSubnewsModal(true);
      setGlobalIdCard(id);
    } catch (error) {
      alert("Error cargando subnoticias: " + error);
    } finally {
      setLoadingSubnews(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar noticia?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteNewsById(id, token);
      setNewsList((prev) => prev.filter((n) => n.id !== id));

      await Swal.fire({
        title: "¡Eliminada!",
        text: "La noticia ha sido eliminada correctamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      fetchData();
    } catch (error) {
      console.error("Error al eliminar noticia:", error);
      await Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la noticia.",
        icon: "error",
        confirmButtonColor: "#e3342f",
      });
    }
  };

  const handleDeleteSubNews = async (sectionId: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar sub noticia?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteNewSection(globalIdCard, sectionId, token);
      setSubnewsList((prev) =>
        prev.filter((section) => section.id !== sectionId)
      );
      await Swal.fire({
        title: "¡Eliminada!",
        text: "La noticia ha sido eliminada correctamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      fetchData();
    } catch (error) {
      console.error("Error al eliminar noticia:", error);
      await Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la noticia.",
        icon: "error",
        confirmButtonColor: "#e3342f",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Administrador de Noticias
      </h2>

      {/* Formulario */}
      <div className="mb-10 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Agregar / Editar Noticia</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Título"
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="sub_title"
            value={form.sub_title}
            onChange={handleInputChange}
            placeholder="Subtítulo"
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="img_url"
            value={form.img_url}
            onChange={handleInputChange}
            placeholder="URL de imagen"
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleInputChange}
            placeholder="Autor"
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botones */}
        <div className="flex space-x-4">
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Crear
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Noticias existentes */}
      <h3 className="text-2xl font-semibold mb-4 text-orange-400">
        Noticias existentes
      </h3>
      {loading ? (
        <p className="text-gray-400">Cargando noticias...</p>
      ) : (
        <>
          <Slider {...sliderSettings}>
            {newsList.map((news) => (
              <div
                key={news.id}
                className="px-4 max-w-md mx-auto cursor-pointer"
              >
                <div
                  className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl border border-gray-700 p-6 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 h-[430px] flex flex-col justify-between"
                  onClick={() => handleSelectNews(news)}
                >
                  <div>
                    <img
                      src={news.img_url}
                      alt={news.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h4 className="text-xl font-bold text-white mb-1">
                      {news.title}
                    </h4>
                    <p className="text-sm italic text-gray-300">
                      {news.sub_title}
                    </p>
                    <p className="text-xs text-gray-400 mt-3">
                      Por{" "}
                      <span className="text-white font-semibold">
                        {news.author}
                      </span>{" "}
                      • {new Date(news.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Botones dentro de la tarjeta */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openSubnewsForm(news.id);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Crear Subnoticia
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowSubnews(news.id);
                      }}
                      className="flex-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                    >
                      Subnoticias
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNews(news.id);
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Eliminar Noticia
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Controles de paginación */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 0}
              className="px-4 py-2 bg-blue-600 rounded disabled:bg-gray-600"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-white">Página {page + 1}</span>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-blue-600 rounded"
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {showSubnewsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-auto">
            <h3 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-3">
              Subnoticias de:{" "}
              <span className="text-orange-400">{selectedNews?.title}</span>
            </h3>

            {loadingSubnews ? (
              <p className="text-gray-400 text-center">
                Cargando subnoticias...
              </p>
            ) : subnewsList.length === 0 ? (
              <p className="text-gray-400 text-center">
                No hay subnoticias disponibles.
              </p>
            ) : (
              <ul className="divide-y divide-gray-700">
                {subnewsList.map(({ id, title }) => (
                  <li
                    key={id}
                    className="flex items-center justify-between py-3 hover:bg-gray-700 rounded px-3 transition"
                  >
                    <div>
                      <span className="text-sm font-semibold text-orange-400 mr-2">
                        {id}.
                      </span>
                      <span className="text-white text-base">{title}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteSubNews(id)}
                      className="text-red-500 hover:text-red-600 transition"
                      aria-label={`Eliminar subnoticia ${title}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSubnewsModal(false)}
                className="px-5 py-2 bg-red-700 hover:bg-red-800 rounded-md font-semibold text-white shadow-md transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      {showCreateSubnewsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-3">
              Crear Subnoticia
            </h3>
            <div className="grid gap-4 mb-4">
              <input
                type="text"
                name="title"
                value={subnewsForm.title}
                onChange={(e) =>
                  setSubnewsForm({ ...subnewsForm, title: e.target.value })
                }
                placeholder="Título"
                className="p-3 rounded bg-gray-700 text-white placeholder-gray-400"
              />
              <textarea
                name="content"
                value={subnewsForm.content}
                onChange={(e) =>
                  setSubnewsForm({ ...subnewsForm, content: e.target.value })
                }
                placeholder="Contenido"
                rows={4}
                className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 resize-none"
              />
              <input
                type="text"
                name="imgUrl"
                value={subnewsForm.imgUrl}
                onChange={(e) =>
                  setSubnewsForm({ ...subnewsForm, imgUrl: e.target.value })
                }
                placeholder="URL de imagen"
                className="p-3 rounded bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateSubnewsForm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    if (!parentNewsId) return;
                    await createNewSection(
                      parentNewsId,
                      subnewsForm.title,
                      subnewsForm.content,
                      subnewsForm.imgUrl,
                      "", // Si también necesitas `author`, agrégalo al form
                      token
                    );
                    await Swal.fire(
                      "Éxito",
                      "Subnoticia creada correctamente",
                      "success"
                    );
                    setShowCreateSubnewsForm(false);
                    fetchData();
                  } catch (err: any) {
                    console.error("Error al crear subnoticia:", err);
                    await Swal.fire("Error", err.message, "error");
                  }
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAdministrator;
