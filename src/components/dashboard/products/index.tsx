import { getAllProducts } from "@/api/products";
import { ProductsDetailsDto } from "@/model/ProductsDetails";
import { t } from "i18next";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  disclaimer: string;
  discount: string;
  imageUrl: string;
  realmId: string;
  language: string;
  tax: string;
  returnTax: string;
  creditPointsValue: string;
  creditPointsEnabled: boolean;
  packages: string[];
  details: string;
}

const PAGE_SIZE = 5;

interface ProductsProps {
  token: string;
}
const ProductDashboard: React.FC<ProductsProps> = ({ token }) => {
  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: "",
    category: "",
    disclaimer: "",
    discount: "",
    imageUrl: "",
    realmId: "",
    language: "",
    tax: "",
    returnTax: "",
    creditPointsValue: "",
    creditPointsEnabled: false,
    packages: [],
    details: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "Electrónica",
    "Ropa",
    "Hogar",
  ]);
  const [nextId, setNextId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsDb, setProductsDb] = useState<ProductsDetailsDto>({
    products: [],
    total_products: 0,
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct: Product = {
      id: nextId,
      ...product,
    };
    setProducts((prev) => [...prev, newProduct]);
    setNextId(nextId + 1);

    setShowForm(false);
    setShowNewCategoryInput(false);
    setNewCategory("");
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory.trim())) {
      const cat = newCategory.trim();
      setCategories((prev) => [...prev, cat]);
      setProduct((prev) => ({
        ...prev,
        category: cat,
      }));
    }
    setShowNewCategoryInput(false);
    setNewCategory("");
  };

  const totalPages = Math.ceil(productsDb.total_products / PAGE_SIZE);
  const paginatedProducts = productsDb.products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiProducts = await getAllProducts(token);
        setProductsDb(apiProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Productos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="p-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cerrar Formulario" : "Crear Producto"}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl mb-6">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-blue-400 mb-2">
                Información básica
              </h2>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Nombre del producto</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Descripción</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Precio</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Descuento (%)</label>
              <input
                type="number"
                name="discount"
                value={product.discount}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Categoría</label>
              <div className="flex space-x-2">
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  {showNewCategoryInput ? "Cancelar" : "Nueva"}
                </button>
              </div>
              {showNewCategoryInput && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nueva categoría"
                  />
                  <button
                    type="button"
                    onClick={addCategory}
                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                  >
                    Crear
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">URL de imagen</label>
              <input
                type="text"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Idioma</label>
              <select
                name="language"
                value={product.language}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="es">Español</option>
                <option value="en">Inglés</option>
                <option value="fr">Francés</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Impuesto</label>
              <input
                type="text"
                name="tax"
                value={product.tax}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Impuesto devolución</label>
              <input
                type="text"
                name="returnTax"
                value={product.returnTax}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Valor puntos crédito</label>
              <input
                type="number"
                name="creditPointsValue"
                value={product.creditPointsValue}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <input
                type="checkbox"
                name="creditPointsEnabled"
                checked={product.creditPointsEnabled}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    creditPointsEnabled: e.target.checked,
                  }))
                }
              />
              <label className="text-sm">Habilitar puntos crédito</label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Paquetes (IDs)</label>
              <div className="flex flex-wrap gap-2 mb-2 text-xl ">
                {product.packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-700 px-2 py-1 rounded-full"
                  >
                    <span>{pkg}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setProduct((prev) => ({
                          ...prev,
                          packages: prev.packages.filter((_, i) => i !== idx),
                        }))
                      }
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Añade un ID y pulsa Enter"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.currentTarget.value.trim();
                    if (value !== "") {
                      setProduct((prev) => ({
                        ...prev,
                        packages: [...prev.packages, value],
                      }));
                      e.currentTarget.value = "";
                    }
                  }
                }}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex-1 bg-gray-900 p-4 rounded-xl shadow-lg overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Productos Registrados</h2>
        {productsDb.products.length === 0 ? (
          <p className="text-gray-400">No hay productos registrados.</p>
        ) : (
          <div className="max-w-9xl mx-auto select-none">
            <table className="w-full text-gray-400 border-separate border-spacing-y-4 text-lg">
              <thead className="bg-gray-800 text-gray-500">
                <tr>
                  <th className="p-6 text-left min-w-[180px] text-2xl font-semibold">
                    Nombre
                  </th>
                  <th className="p-6 text-left min-w-[120px] text-2xl font-semibold">
                    Categoría
                  </th>
                  <th className="p-6 text-left min-w-[100px] text-2xl font-semibold">
                    Precio
                  </th>
                  <th className="p-6 text-left text-2xl font-semibold">
                    Descuento
                  </th>
                  <th className="p-6 text-left text-2xl font-semibold">
                    Estado
                  </th>
                  <th className="p-6 text-left text-2xl font-semibold">
                    Precio por puntos
                  </th>
                  <th className="p-6 text-left text-2xl font-semibold">
                    Puntos por compra
                  </th>
                  <th className="p-6 text-left text-2xl font-semibold">Tax</th>
                  <th className="p-6 text-left text-2xl font-semibold">
                    Retorno de IVA
                  </th>
                  <th className="p-6 text-left text-2xl font-semibold">
                    Lenguaje
                  </th>
                  <th className="p-6 text-left text-2xl font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="bg-gray-800 rounded-lg hover:bg-gray-700 hover:shadow-lg transition duration-300"
                  >
                    <td className="p-6 rounded-l-lg">
                      <div className="flex items-center">
                        <img
                          className="rounded-full h-16 w-16 object-cover"
                          src={p.img_url || "https://via.placeholder.com/64"}
                          alt={p.name}
                        />
                        <div className="ml-4">
                          <div className="text-2xl">{p.name}</div>
                          <div className="text-gray-500 text-xl">
                            {p ? `ID: ${p.id}` : "Sin ID"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-2xl">{p.category}</td>
                    <td className="p-6 font-bold text-xl">${p.price}</td>
                    <td className="p-6 text-2xl">{p.discount}</td>
                    <td className="p-6 text-2xl">
                      {p.status ? (
                        <span className="text-green-500 font-semibold">
                          Activo
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-2xl">
                      {p.use_points ? (
                        <span className="text-green-500">✔️</span>
                      ) : (
                        <span className="text-red-500">❌</span>
                      )}
                    </td>
                    <td className="p-6 text-2xl">{p.points_amount}</td>
                    <td className="p-6 text-2xl">{p.tax}</td>
                    <td className="p-6 text-2xl">{p.return_tax}</td>
                    <td className="p-6 text-2xl">{p.language}</td>
                    <td className="p-6 rounded-r-lg flex space-x-3">
                      <button
                        onClick={() => alert(`Ver producto ${p.id}`)}
                        className="p-2 text-gray-400 hover:text-white text-2xl"
                        aria-label="Ver"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => alert(`Editar producto ${p.id}`)}
                        className="p-2 text-gray-400 hover:text-white text-2xl"
                        aria-label="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-gray-400 hover:text-white text-2xl"
                        aria-label="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDashboard;
