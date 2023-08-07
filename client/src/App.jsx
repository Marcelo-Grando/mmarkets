import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SellerPage from './pages/SellerPage'
import ProductsPage from './pages/ProductsPage'
import NotFound from './pages/NotFound'
import CategoriesPage from './pages/CategoriesPage'
import ReportsPage from './pages/ReportsPage'
import MarketHomePage from './pages/marketHomePage'
import SellerHomePage from './pages/SellerHomePage'
import AdministratorHomePage from './pages/AdministratorHomePage'



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/sellers-page/:market' element={<SellerPage/>}/>
      <Route path='/notfound-page' element={<NotFound/>}/>
      <Route path='/products-page/:market' element={<ProductsPage/>}/>
      <Route path='/categories-page/:market' element={<CategoriesPage/>}/>
      <Route path='/reports-page/:market' element={<ReportsPage/>}/>
      <Route path='/:market_name/:market' element={<MarketHomePage/>}/>
      <Route path='/:market_name/:market/:seller_id' element={<SellerHomePage/>}/>
      <Route path='/administrator/:market' element={<AdministratorHomePage/>}/>
    </Routes>
  )
}

export default App
