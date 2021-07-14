import React, { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./WishList.css";
import bookImage from "./bookImage.png";
import { Button, Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { useHistory } from "react-router";

const services = new UserServices();

export default function WishList() {
  const history = new useHistory();
  const [wishListBooks, setListBooks] = useState([]);
  const [loading, setLoader] = useState(true);

  const count = wishListBooks.length;
  var display;

  const getWishListItems = () => {
    services
      .getFromWishList()
      .then((res) => {
        setListBooks(res.data.result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHomePage = () => {
    history.push("/bookstore");
  };

  const handleDelete = (id) => {
    services
      .removeFromWishlist(id)
      .then((res) => {
        getWishListItems();
      })
      .catch((err) => {
        console.log("remove", err);
      });
  };

  const handleAddToCart = (id) => {
    services
      .addToCart(id)
      .then((res) => {
        handleDelete(id);
      })
      .catch((err) => {
        console.log("adding ", err);
      });
  };

  if (count > 0) {
    display = (
      <div className="list-container">
        <h2 className="wishlist-header">My WishList({count})</h2>
        {wishListBooks.map((book, index) => (
          <div key={index}>
            <div className="list-book-div">
              <div>
                <img
                  className="list-book-image"
                  alt="bookImage"
                  src={bookImage}
                />
              </div>
              <div className="book-details">
                <p className="cart-head">{book.product_id.bookName}</p>
                <p className="cart-tag">by {book.product_id.author}</p>
                <p className="cart-head">Rs. {book.product_id.price}</p>
              </div>
              <div className="wishlist-btns">
                <Button>
                  <DeleteIcon
                    color="disabled"
                    onClick={() => handleDelete(book.product_id._id)}
                  />
                </Button>
                <Button
                  style={{
                    backgroundColor: "#3371b5",
                    color: "#fff",
                    borderRadius: "3px",
                    padding: "7px 30px",
                    height: "50px",
                  }}
                  onClick={() => handleAddToCart(book.product_id._id)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    );
  } else {
    display = <h1>Your Wishlist is empty</h1>;
  }

  useEffect(() => {
    getWishListItems();
  }, []);

  return (
    <div>
      <Header />
      <p className="mini-header">
        <span
          onClick={handleHomePage}
          style={{ cursor: "pointer", color: "#8a8a8a" }}
        >
          Home /
        </span>
        <b> My Wishlist</b>
      </p>
      {loading ? <h1>loading....</h1> : display}

      <Footer />
    </div>
  );
}
