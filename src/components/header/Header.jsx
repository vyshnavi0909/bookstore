import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCartOutlined";
import ProfileIcon from "@material-ui/icons/PersonOutline";
import BagIcon from "@material-ui/icons/LocalMallOutlined";
import WishListIcon from "@material-ui/icons/FavoriteBorderOutlined";
import "./Header.css";
import book from "./education.svg";
import { Badge, Divider, Fade, Paper, Popper } from "@material-ui/core";
import { useHistory } from "react-router";
import { useState } from "react";

export default function Header(props) {
  const history = new useHistory();
  const [openPopper, setPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openCart = () => {
    history.push("/bookstore/cart");
  };

  const openProfile = (e) => {
    setAnchorEl(e.currentTarget);
    setPopper(!openPopper);
  };

  const openWishlist = () => {
    history.push("/bookstore/wishlist");
  };

  const handleHomePage = () => {
    history.push("/bookstore");
  };

  const handleSearch = (e) => {};
  return (
    <div>
      <header className="home-header">
        <div className="header-text" onClick={handleHomePage}>
          <img src={book} alt="book" className="header-book-icon" />
          <p>Bookstore</p>
        </div>
        <div className="header-search-div">
          <SearchIcon fontSize="small" />
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={handleSearch}
          ></input>
        </div>
        <div className="header-icons">
          <Divider orientation="vertical" flexItem />
          <div className="header-profile-icon" onClick={openProfile}>
            <ProfileIcon />
            <p className="profile-header-tag">Profile</p>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="header-cart-icon">
            <Badge badgeContent={props.count} color="secondary">
              <CartIcon onClick={openCart} />
            </Badge>
            <p className="cart-header-tag">Cart</p>
          </div>
          <Divider orientation="vertical" flexItem />
        </div>
      </header>
      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        style={{ margin: "15px" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              style={{
                padding: "10px",
                width: "150px",
                boxShadow: "1px 1px 5px #736d6c",
              }}
            >
              <ul className="profile-list">
                <li className="list-item">
                  <BagIcon />
                  My Orders
                </li>
                <li className="list-item" onClick={openWishlist}>
                  <WishListIcon />
                  Wishlist
                </li>
              </ul>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
