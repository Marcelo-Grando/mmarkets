import { useState, useEffect } from "react";
import { useAccount } from "../hooks/useAccount";

import { getTickets } from "../api/Reports";

export default function Sales() {
  const [tickets, setTickets] = useState([]);

  const { market_id } = JSON.parse(localStorage.getItem("user"));

  async function loadTickets() {
    const response = await getTickets(market_id);
    setTickets(response.data);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div>
      <div className="container-fluid border">
        <div className="row">
          {tickets.map((ticket, index) => (
            <div className="container w-50 my-2 text-center" key={index}>
              <div className="col h-100 card p-1 border">
                <h5 className="bg-success">#{ticket.ticket_id}</h5>
                {ticket.products.map((product, index) => (
                  <div className="row mx-2" key={index}>
                    <div className="col p-0 border">{product.product}</div>
                    <div className="col p-0 border">{product.description}</div>
                    <div className="col p-0 border">
                      <b>{product.category}</b>
                    </div>
                    <div className="col p-0 border">x{product.quantify}</div>
                    <div className="col p-0 border">${product.price}</div>{" "}
                  </div>
                ))}
                <div className="row my-2">
                  <div className="col">Date: {ticket.date}</div>
                  <div className="col">Time: {ticket.time}</div>
                </div>
                <h5>Amount: $ {ticket.amount}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
