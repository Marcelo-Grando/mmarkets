import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  findProduct,
  sendProduct,
  getProducts,
  deleteProduct,
} from "../api/Products";
import { getCategories } from "../api/Categories";

import FindProductForm from "../components/FindProductForm";
import CreateProductForm from "../components/CreateProductForm";
import ProductsFoundContainer from "../components/ProductsFoundContainer";
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

  const { market_id } = JSON.parse(localStorage.getItem('userData'));

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
    setProductsFound(response.data);
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
    <>
      <div>
        <h3>Find Product</h3>
        <FindProductForm
          handleSubmit={findProductsByName}
          setProduct={setProduct}
          product={product}
        />
      </div>
      <ProductsFoundContainer productsFound={productsFound} />
      <div>
        <h3>Create Product</h3>
        <CreateProductForm
          handleSubmitCreateForm={handleSubmitCreateForm}
          handleInputsChange={handleInputsChange}
          values={values}
          categories={categories}
        />
      </div>
      <ProductsAcordeon removeProduct={removeProduct} products={products} />
    </>
  );
}
