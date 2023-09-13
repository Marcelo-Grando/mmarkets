import { useState, useEffect } from "react";
import { getProducts, getProduct, sendSale } from "../api/Sales";
import SaleTable from "./SaleTable";
import SaleCard from "./SaleCard";
import Product from "./Product";

export default function Sale() {
  const [product, setProduct] = useState([]);
  const [foundProducts, setFoundProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [elements, setElements] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [amount, setAmount] = useState("");
  const [ej, setEj] = useState(false);

  const { market_id } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function loadProducts() {
      const response = await getProducts(market_id);
      setProducts(response.data);
    }
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.length) return console.log("Insert product");
    const response = await getProduct(product, market_id);
    if (!response.data.length) {
      setEj(true);
      setProduct([]);
      return;
    }
    setEj(false);
    setFoundProducts(response.data);

    setProduct([]);
  };

  function addElements(article) {
    if (elements.length === 0) {
      setAmount([...amount, article.price]);
      setIndexs([...indexs, article.product_id]);
      setElements([...elements, article]);
    }
    elements.forEach((e) => {
      if (e.product_id === article.product_id) {
        e.quantify++;
        setAmount([...amount, e.price]);
        setElements([...elements]);
      }
    });
    if (!indexs.includes(article.product_id)) {
      setAmount([...amount, article.price]);
      setIndexs([...indexs, article.product_id]);
      setElements([...elements, article]);
    }
  }

  const makeSale = async (elements, market_id, seller) => {
    const response = await sendSale(elements, market_id, seller);
    setAmount("");
    setElements([]);
    setIndexs([]);
    console.log(response.data);
  };

  const saleAmount = amount
    ? amount.reduce((acumulador, valorActual) => acumulador + valorActual)
    : "00";

  return (
    <div>
      <h3>Find Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="find product"
          onChange={(e) => setProduct(e.target.value)}
          value={product}
        />
        <button>find</button>
      </form>
      <hr />
      {ej ? (
        <div>
          <span>Product not Found</span>
        </div>
      ) : (
        foundProducts.map((p) => (
          <Product key={p.product_id} product={p} addElements={addElements} />
        ))
      )}
      <h3>Products</h3>
      <div className="sale">
        <table>
          <tbody></tbody>
        </table>
        <SaleTable products={products} addElements={addElements} />
        {elements.length ? (
          <SaleCard
            addElements={addElements}
            elements={elements}
            setElements={setElements}
            setAmount={setAmount}
            makeSale={makeSale}
            amount={amount}
            saleAmount={saleAmount}
            indexs={indexs}
            setIndexs={setIndexs}
            setFoundProducts={setFoundProducts}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
