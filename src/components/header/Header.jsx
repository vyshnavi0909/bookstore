import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./Header.css";
import book from "./education.svg";

export default function Header() {
  return (
    <div>
      <header className="home-header">
        <div className="header-text">
          <img src={book} alt="book" className="header-book-icon" />
          <p>Bookstore</p>
        </div>
        <div className="header-search-div">
          <SearchIcon fontSize="small" />
          <input
            type="search"
            className="search-input"
            placeholder="Search"
          ></input>
        </div>
        <div className="header-cart-icon">
          <p className="cart-tag">Cart</p>
          <CartIcon />
        </div>
      </header>
    </div>
  );
}
