import { useState, useEffect } from "react";
import { getProducts, sendSale, sendTicket } from "../api/Sales";
import SaleCard from "./SaleCard";
import Product from "./Product";
import FindProductForm from "./FindProductForm";
import { findProduct } from "../api/Products";

export default function Sale() {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [amount, setAmount] = useState("");

  const { market_id } = JSON.parse(localStorage.getItem("userData"));

  async function loadProducts() {
    const response = await getProducts(market_id);
    setProducts(response.data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function addProductsToSale(article) {
    if (saleProducts.length === 0) {
      setAmount([...amount, article.price]);
      setIndexs([...indexs, article.product_id]);
      setSaleProducts([...saleProducts, article]);
    }
    saleProducts.forEach((e) => {
      if (e.product_id === article.product_id) {
        e.quantify++;
        setAmount([...amount, e.price]);
        setSaleProducts([...saleProducts]);
      }
    });
    if (!indexs.includes(article.product_id)) {
      setAmount([...amount, article.price]);
      setIndexs([...indexs, article.product_id]);
      setSaleProducts([...saleProducts, article]);
    }
  }

  const makeSale = async (saleProducts, market_id, seller) => {
    const response = await sendSale(saleProducts, market_id, seller);
    response && (await sendTicket(response.data));
    setAmount("");
    setSaleProducts([]);
    setIndexs([]);
  };

  const saleAmount = amount
    ? amount.reduce((acumulador, valorActual) => acumulador + valorActual)
    : "00";

  const findProductsByName = async (e) => {
    e.preventDefault();
    if (!product) return;
    const response = await findProduct(product, market_id);
    setProducts(response.data);
    setProduct("");
  };

  return (
    <div className="container-fluid">
      <div className="row py-2">
        <div className="container w-25">
          <div className="col">
            <FindProductForm
              findProductsByName={findProductsByName}
              setProduct={setProduct}
              product={product}
            />
          </div>
        </div>
        <div className="container w-75 my-2">
          <div className="row">
            <div className="col-md-5 border mx-0 p-0">
              {products.map((product, index) => (
                <Product
                  key={index}
                  product={product}
                  addProductsToSale={addProductsToSale}
                />
              ))}
            </div>

            <div className="col">
              <SaleCard
                addProductsToSale={addProductsToSale}
                saleProducts={saleProducts}
                setSaleProducts={setSaleProducts}
                setAmount={setAmount}
                makeSale={makeSale}
                amount={amount}
                saleAmount={saleAmount}
                indexs={indexs}
                setIndexs={setIndexs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
