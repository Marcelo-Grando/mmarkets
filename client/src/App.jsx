import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SellerPage from './pages/SellerPage'
import ProductsPage from './pages/ProductsPage'
import NotFound from './pages/NotFound'
import SalePage from './pages/SalePage'
import CategoriesPage from './pages/CategoriesPage'
import ReportsPage from './pages/ReportsPage'
import MarketHomePage from './pages/marketHomePage'



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/sellers-page/:market' element={<SellerPage/>}/>
      <Route path='/notfound-page' element={<NotFound/>}/>
      <Route path='/sale-page/:market/:seller_id' element={<SalePage/>}/>
      <Route path='/products-page/:market' element={<ProductsPage/>}/>
      <Route path='/categories-page/:market' element={<CategoriesPage/>}/>
      <Route path='/reports-page/:market' element={<ReportsPage/>}/>
      <Route path='/market-home/:market' element={<MarketHomePage/>}/>
    </Routes>
  )
}

export default App
