import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Product from './components/Product'
import NavBar from './components/NavBar'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<NavBar />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
