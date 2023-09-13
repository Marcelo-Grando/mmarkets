import "./App.css";
import { Route, Routes } from "react-router-dom";

import { UserProvider } from "./context/UserContext";

import HomePage from "./pages/HomePage";
import SellerPage from "./pages/SellerPage";
import ProductsPage from "./pages/ProductsPage";
import SessionNotFound from "./pages/SessionNotFound";
import CategoriesPage from "./pages/CategoriesPage";
import ReportsPage from "./pages/ReportsPage";
import MarketHomePage from "./pages/MarketHomePage";
import SellerHomePage from "./pages/SellerHomePage";
import AdministratorHomePage from "./pages/AdministratorHomePage";
import AdministratorPage from "./pages/AdministratorPage";

function App() {

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/market" element={<MarketHomePage />}>
          <Route path="sellers" element={<SellerPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route
            path="administrators"
            element={<AdministratorPage />}
          />
        </Route>
        <Route
          exact
          path="/seller"
          element={<SellerHomePage />}
        />
        <Route
          path="/administrator"
          element={<AdministratorHomePage />}
        >
          <Route path="reports" element={<ReportsPage />} />
        </Route>
        <Route path="/notfound-page" element={<SessionNotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
