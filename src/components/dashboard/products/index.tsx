import { allCategories, createCategory } from "@/api/productCategory";
import { createProduct, getAllProducts } from "@/api/products";
import { ProductCategoriesResponse } from "@/dto/response/ProductCategoriesResponse";
import { ProductsDetailsDto } from "@/model/ProductsDetails";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: number;
  disclaimer: string;
  discount: string;
  imageUrl: string;
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
  realmId: number;
}
const ProductDashboard: React.FC<ProductsProps> = ({ token, realmId }) => {
  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: "",
    category: 0,
    disclaimer: "",
    discount: "",
    imageUrl: "",
    language: "",
    tax: "",
    returnTax: "",
    creditPointsValue: "",
    creditPointsEnabled: false,
    packages: [],
    details: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategoriesResponse[]>([]);
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [categoryDescriptionId, setCategoryDescriptionId] = useState(0);

  const [newCategoryDisclaimer, setNewCategoryDisclaimer] = useState("");
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

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = async () => {
    const trimmed = newCategory.trim();

    if (trimmed === "") return;

    try {
      await createCategory(
        token,
        newCategory,
        newCategoryDescription,
        newCategoryDisclaimer
      );

      const updatedCategories = await allCategories(token);
      setCategories(updatedCategories);
      // Buscar la nueva categoría por nombre
      const createdCategory = updatedCategories.find(
        (cat) => cat.name === newCategory
      );

      if (createdCategory) {
        setProduct((prev) => ({
          ...prev,
          category: createdCategory.id,
        }));
      }
    } catch (error: any) {
      console.error("Error al crear categoría:", error);
      alert(`❌ Error al crear categoría: ${error.message}`);
    }

    setShowNewCategoryInput(false);
    setNewCategory("");
  };

  const paginatedProducts = productsDb.products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [apiProducts, categoryResponse] = await Promise.all([
          getAllProducts(token),
          allCategories(token),
        ]);

        setProductsDb(apiProducts);
        setCategories(categoryResponse);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, [token, realmId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        name: product.name,
        product_category_id: product.category,
        disclaimer: product.disclaimer,
        price: parseFloat(product.price),
        discount: parseInt(product.discount),
        description: product.description,
        image_url: product.imageUrl,
        realm_id: realmId,
        language: product.language,
        tax: product.tax,
        return_tax: product.returnTax,
        credit_points_value: parseInt(product.creditPointsValue),
        credit_points_enabled: product.creditPointsEnabled,
        packages: product.packages,
      };

      await createProduct(token, payload);

      alert("Producto creado con éxito ✅");

      // Resetear formulario si deseas
      setProduct({
        name: "",
        description: "",
        price: "",
        category: 0,
        disclaimer: "",
        discount: "",
        imageUrl: "",
        language: "",
        tax: "",
        returnTax: "",
        creditPointsValue: "",
        creditPointsEnabled: false,
        packages: [],
        details: "",
      });
      setNextId(nextId + 1);
      setShowForm(false);
      setShowNewCategoryInput(false);
      setNewCategory("");
      setCurrentPage(1);

      // Refrescar productos desde API
      const refreshed = await getAllProducts(token);
      setProductsDb(refreshed);
    } catch (error: any) {
      console.error("Error al crear producto:", error);
      alert(`❌ Error al crear producto: ${error.message}`);
    }
  };

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
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
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
                <div className="mt-2 grid grid-cols-1 gap-3">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                    placeholder="Nombre de categoría"
                  />
                  <input
                    type="text"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                    placeholder="Descripción"
                  />
                  <input
                    type="text"
                    value={newCategoryDisclaimer}
                    onChange={(e) => setNewCategoryDisclaimer(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
                    placeholder="Disclaimer"
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
