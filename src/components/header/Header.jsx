import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./Header.css";
import book from "./education.svg";
import { Badge } from "@material-ui/core";

export default function Header(props) {
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
        <div
          className="header-cart-icon"
          // onClick={openCart}
        >
          <p className="cart-tag">Cart</p>
          <Badge badgeContent={props.count} color="secondary">
            <CartIcon />
          </Badge>
        </div>
      </header>
    </div>
  );
}
