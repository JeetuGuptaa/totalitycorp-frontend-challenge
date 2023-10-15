import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Product from './components/Product'
import Cart from './Pages/Cart'
import './App.css'
import ProductPage from "./Pages/ProductPage";
import NavBar from "./components/NavBar";
import Checkout from "./Pages/checkout";
import { ProductContextProvider } from "./context/ProductContext";
import {CartContextProvider} from "./context/CartContext"
function App() {

  return (

    <BrowserRouter>
      <ProductContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/" element = {<NavBar />}>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="product/:id" element={<ProductPage />} />
            </Route>
          </Routes>
        </CartContextProvider>
      </ProductContextProvider>
    </BrowserRouter>
  )
}

export default App
