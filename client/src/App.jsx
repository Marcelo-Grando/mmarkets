import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SellerPage from "./pages/SellerPage";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./pages/NotFound";
import CategoriesPage from "./pages/CategoriesPage";
import ReportsPage from "./pages/ReportsPage";
import MarketHomePage from "./pages/MarketHomePage";
import SellerHomePage from "./pages/SellerHomePage";
import AdministratorHomePage from "./pages/AdministratorHomePage";
import AdministratorPage from "./pages/AdministratorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:market_name/:market" element={<MarketHomePage />} />
      <Route
        path="/:market_name/:market/:seller_id"
        element={<SellerHomePage />}
      />
      <Route
        path="admin/:administrator/:market"
        element={<AdministratorHomePage />}
      />
      <Route path="/sellers-page/:market" element={<SellerPage />} />
      <Route
        path="/administrators-page/:market"
        element={<AdministratorPage />}
      />
      <Route path="/products-page/:market" element={<ProductsPage />} />
      <Route path="/categories-page/:market" element={<CategoriesPage />} />
      <Route path="/reports-page/:market" element={<ReportsPage />} />
      <Route path="/notfound-page" element={<NotFound />} />
    </Routes>
  );
}

export default App;
