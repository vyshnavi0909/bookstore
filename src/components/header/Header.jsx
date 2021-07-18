import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCartOutlined";
import ProfileIcon from "@material-ui/icons/PersonOutline";
import BagIcon from "@material-ui/icons/LocalMallOutlined";
import WishListIcon from "@material-ui/icons/FavoriteBorderOutlined";
import "./Header.css";
import book from "./education.svg";
import {
  Badge,
  Divider,
  Fade,
  // List,
  // MenuItem,
  // MenuList,
  Paper,
  Popper,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { useState } from "react";
import { useContext } from "react";
import BookstoreContext from "../context-files/Context";

export default function Header(props) {
  const { cartCount } = useContext(BookstoreContext);
  const history = useHistory();
  const [popper, setPopper] = useState({ openPopper: false, anchorEl: null });
  const [profile, setProfile] = useState({
    openProfile: false,
    anchorEl: null,
  });
  // const arrayOfBooks = props.books;
  const [input, setInput] = useState("");

  const openCart = () => {
    history.push("/bookstore/cart");
  };

  const openProfile = (e) => {
    let prev = profile.openProfile;
    setProfile({
      openProfile: !prev,
      anchorEl: e.currentTarget,
    });
  };

  const openWishlist = () => {
    history.push("/bookstore/wishlist");
  };

  const handleHomePage = () => {
    history.push("/bookstore");
  };

  const handleSearch = (e) => {
    setInput(e.target.value);
    setPopper({
      openPopper: true,
      anchorEl: e.currentTarget,
    });
  };

  const handleOnBlur = () => {
    setPopper({ openPopper: false, anchorEl: null });
  };

  // const searchArray = () => {
  //   var list = arrayOfBooks.map((val, index) => (
  //     <List key={index}>{val.bookName}</List>
  //   ));
  //   return list;
  // };

  return (
    <div>
      <header className="home-header">
        <div className="header-text" onClick={handleHomePage}>
          <img src={book} alt="book" className="header-book-icon" />
          <p className="header-book-tag">Bookstore</p>
        </div>
        <div className="header-search-div">
          <SearchIcon fontSize="small" />
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            // value={input}
            onChange={handleSearch}
            onMouseLeave={handleOnBlur}
          />
          <Popper
            style={{ width: "50%" }}
            open={popper.openPopper}
            anchorEl={popper.anchorEl}
            placement="bottom"
            transition
          >
            {/* <Paper>{searchArray()}</Paper> */}
          </Popper>
        </div>

        <div className="header-icons">
          <Divider orientation="vertical" flexItem />
          <div className="header-profile-icon" onClick={openProfile}>
            <ProfileIcon />
            <p className="profile-header-tag">Profile</p>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="header-cart-icon">
            <Badge badgeContent={cartCount} color="secondary">
              <CartIcon onClick={openCart} className="cart-icon" />
            </Badge>
            <p className="cart-header-tag">Cart</p>
          </div>
          <Divider orientation="vertical" flexItem />
        </div>
      </header>

      <Popper
        open={profile.openProfile}
        anchorEl={profile.anchorEl}
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
