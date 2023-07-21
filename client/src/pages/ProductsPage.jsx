import { useState, useEffect } from "react";
import { findProduct, sendProduct, getProducts } from "../api/Products";
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

  async function loadProducts() {
    const response = await getProducts();
    setProducts(response.data);
  }

  async function loadCategories() {
    const response = await getCategories()
    setCategories(response.data)
  }

  useEffect(() => {
    loadProducts();
    loadCategories()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    const response = await findProduct(product);
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
    if (Object.values(values).includes("")) return console.log("faltan datos");
    const response = await sendProduct(values);
    console.log(response)
    setValues({
      product: "",
      description: "",
      category: "",
      price: "",
    });
    loadProducts()
  };

  return (
    <>
      <div>
        <h3>Find Product</h3>
        <FindProductForm
          handleSubmit={handleSubmit}
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
      <ProductsAcordeon products={products} />
    </>
  );
}
