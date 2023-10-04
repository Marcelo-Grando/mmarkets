import { Outlet } from "react-router-dom";
import SellersNav from "../components/SellersNav";

export default function SellerPage() {
  return (
    <>
      <main>
        <SellersNav />
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
}
