import {useContext} from 'react' 
import { Outlet, Link } from "react-router-dom";
import cartIcon from '../assets/cart-icon.svg'
import "../assets/styles/NavBar.css";
import { CartContext } from "../context/CartContext";

export default function NavBar(){
  const cart = useContext(CartContext).cart
  console.log(cart)
  return (
    <>
      <nav className="main-nav">
        <h1 className="logo">
          <Link to="/" className="nav-link">
            T-Corp
          </Link>
        </h1>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/product" className="nav-link">
              Product
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="cart-link">
          <img src={cartIcon} alt="cart image" className="cart-icon" />
          Cart({cart.length})
        </Link>
      </nav>

      <Outlet />
    </>
  );
};
