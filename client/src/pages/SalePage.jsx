import { useState, useEffect } from "react";
import { getProducts, getProduct, sendSale } from "../api/Sales";
import SaleTable from "../components/SaleTable";
import SaleCard from "../components/SaleCard";
import Product from "../components/Product";

export default function SalePage() {
  const [product, setProduct] = useState([]);
  const [foundProducts, setFoundProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [elements, setElements] = useState([]);
  const [indexs, setIndexs] = useState([]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const response = await getProducts();
      setProducts(response.data);
    }
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!product.length) return console.log('Insert product')
    const response = await getProduct(product);
    if(!response.data.length) return console.log('Product not Found')
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


  const makeSale = async (elements, market, seller) => {
    const response = await sendSale(elements, market, seller);
    setAmount("");
    setElements([]);
    setIndexs([]);
    console.log(response)
  };

  const saleAmount = amount
    ? amount.reduce((acumulador, valorActual) => acumulador + valorActual)
    : "00";

    console.log('saleAmount',saleAmount)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="find product"
          onChange={(e) => setProduct(e.target.value)}
          value={product}
        />
        <button>find</button>
      </form>
      <table>
        <tbody>
          {foundProducts.map((p) => (
            <Product key={p.product_id} product={p} addElements={addElements} />
          ))}
        </tbody>
      </table>
      <SaleTable products={products} addElements={addElements} />
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
    </>
  );
}
