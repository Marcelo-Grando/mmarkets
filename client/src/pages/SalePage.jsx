import { useState, useEffect } from "react";
import { getProducts, sendSale } from "../api/Sales";
import SaleTable from "../components/SaleTable";
import SaleCard from "../components/SaleCard";

export default function SalePage() {
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

  const makeSale = async (elements) => {
    const response = await sendSale(elements);
    setAmount("");
    setElements([]);
    setIndexs([]);
    console.log(response.data);
  };

  const saleAmount = amount
    ? amount.reduce((acumulador, valorActual) => acumulador + valorActual)
    : "00";

  return (
    <>
      <SaleTable products={products} addElements={addElements} />
      <SaleCard
        elements={elements}
        setElements={setElements}
        setAmount={setAmount}
        makeSale={makeSale}
        saleAmount={saleAmount}
      />
    </>
  );
}
