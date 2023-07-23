import { useState, useEffect } from "react";
import { findProduct, sendProduct, getProducts } from "../api/Products";
import { getCategories } from "../api/Categories";
import FindProductForm from "../components/FindProductForm";
import CreateProductForm from "../components/CreateProductForm";
import ProductsFoundContainer from "../components/ProductsFoundContainer";
import ProductsAcordeon from "../components/ProductsAcordeon";
import { useParams } from "react-router-dom";

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

  const { market } = useParams();

  async function loadProducts() {
    const response = await getProducts(market);
    setProducts(response.data);
  }

  async function loadCategories() {
    const response = await getCategories(market);
    setCategories(response.data);
  }

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    const response = await findProduct(product, market);
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

  const productsValidation = (products, values, categories) => {
    if (Object.values(values).includes("")) return console.log("faltan datos");
    if (!categories.map(c => c.category).includes(values.category)) return console.log('la categoria no existe')

    const productCount = products
      .map((p) => p.product)
      .filter((f) => f === values.product).length;
    const descriptionCount = products
      .map((p) => p.description)
      .filter((f) => f === values.description).length;

    if (productCount && descriptionCount) {
      setProduct("");
      return console.log(
        `The product ${values.product} ${values.description} already exist`
      );
    }
  };

  const handleSubmitCreateForm = async (e) => {
    e.preventDefault();

    productsValidation(products, values, categories);

    const response = await sendProduct(values, market);
    console.log(response)

    setValues({
      product: "",
      description: "",
      category: "",
      price: "",
    });
    loadProducts();
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
