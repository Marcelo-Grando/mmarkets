import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SellerPage from './pages/SellerPage'
import ProductsPage from './pages/ProductsPage'
import NotFound from './pages/NotFound'
import SalePage from './pages/SalePage'
import CategoriesPage from './pages/CategoriesPage'
import ReportsPage from './pages/ReportsPage'
import SigninSellerPage from './pages/SigninSellerPage'
import MarketHomePage from './pages/marketHomePage'



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/sellers-page/:market' element={<SellerPage/>}></Route>
      <Route path='/notfound-page' element={<NotFound/>}></Route>
      <Route path='/sale-page/:market/:seller_id' element={<SalePage/>}></Route>
      <Route path='/products-page/:market' element={<ProductsPage/>}></Route>
      <Route path='/categories-page/:market' element={<CategoriesPage/>}></Route>
      <Route path='/reports-page/:market' element={<ReportsPage/>}></Route>
      <Route path='/signin' element={<SigninSellerPage/>}></Route>
      <Route path='/market-home/:market' element={<MarketHomePage/>}></Route>
    </Routes>
  )
}

export default App
