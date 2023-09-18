import { useState, useEffect } from "react";
import {
  findProduct,
  sendProduct,
  getProducts,
  deleteProduct,
} from "../api/Products";
import { getCategories } from "../api/Categories";

import FindProductForm from "../components/FindProductForm";
import CreateProductForm from "../components/CreateProductForm";
import ProductsAcordeon from "../components/ProductsAcordeon";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [values, setValues] = useState({
    product: "",
    description: "",
    category: "",
    price: "",
  });
  const [productsFound, setProductsFound] = useState([]);
  const [categories, setCategories] = useState([]);

  const { market_id } = JSON.parse(localStorage.getItem("userData"));

  async function loadProducts() {
    const response = await getProducts(market_id);
    setProducts(response.data);
  }

  async function loadCategories() {
    const response = await getCategories(market_id);
    setCategories(response.data);
  }

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const findProductsByName = async (e) => {
    e.preventDefault();
    if (!product) return;
    const response = await findProduct(product, market_id);
    setProducts(response.data);
    setProduct("");
  };

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitCreateForm = async (e) => {
    e.preventDefault();

    const response = await sendProduct(values, market_id);
    console.log(response);

    setValues({
      product: "",
      description: "",
      category: "",
      price: "",
    });
    loadProducts();
  };

  const removeProduct = async (product_id, market_id) => {
    const response = await deleteProduct(product_id, market_id);
    if (response.status === 204) console.log("Deleted Product");
    loadProducts();
  };

  return (
    <div className="px-3">
      <div className="row">
        <div className="w-25">
          <div className="col m-2">
            <FindProductForm
              findProductsByName={findProductsByName}
              setProduct={setProduct}
              product={product}
            />
            <CreateProductForm
              handleSubmitCreateForm={handleSubmitCreateForm}
              handleInputsChange={handleInputsChange}
              values={values}
              categories={categories}
            />
          </div>
        </div>
        <div className="col my-0 p-0">
          <div className="ventana con desplazamiento">
          <ProductsAcordeon removeProduct={removeProduct} products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
