import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
import CreateAccountPage from "./pages/CreateAccountPage";
import MarketHome from "./components/MarketHome";
import ManegeSellers from "./components/manegeSellers";
import SellersReports from "./components/SellersReports";
import SalesReports from "./components/SalesReports";
import Sales from "./components/Sales";
import Statistics from "./components/Statistics";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/market" element={<MarketHomePage />}>
          <Route path="/market" element={<MarketHome />} />
          <Route path="sellers" element={<SellerPage />}>
            <Route path="manege-sellers" element={<ManegeSellers />} />
            <Route path="*" element={<NotFoundPage/>}/>
          </Route>
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="reports" element={<ReportsPage />}>
            <Route path="sellers" element={<SellersReports />} />
            <Route path="sales" element={<SalesReports />} />
            <Route path="tickets" element={<Sales/>}/>
            <Route path="statistics" element={<Statistics/>}/>
          </Route>
          <Route path="administrators" element={<AdministratorPage />} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
        <Route exact path="/seller" element={<SellerHomePage />} />
        <Route path="/administrator" element={<AdministratorHomePage />}>
          <Route path="reports" element={<ReportsPage />}>
            <Route path="sellers" element={<SellersReports />} />
            <Route path="sales" element={<SalesReports />} />
            <Route path="tickets" element={<Sales/>}/>
            <Route path="statistics" element={<Statistics/>}/>
          </Route>
        </Route>
        <Route path="/notfound-page" element={<SessionNotFound />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;