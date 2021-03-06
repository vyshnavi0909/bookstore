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
  const history = useHistory();
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

  const addToCartBtn = (product) => {
    console.log(product.quantity);
    if (product.quantity > 1) {
      return (
        <Button
          style={{
            backgroundColor: "#3371b5",
            color: "#fff",
            borderRadius: "3px",
            padding: "2px",
            height: "35px",
            width: "110px",
          }}
          onClick={() => handleAddToCart(product._id)}
        >
          Add to cart
        </Button>
      );
    } else {
      return <div></div>;
    }
  };

  if (count > 0) {
    display = (
      <div className="list-container">
        <h2 className="wishlist-heading">My WishList({count})</h2>
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
                <Button style={{ padding: 0 }}>
                  <DeleteIcon
                    color="disabled"
                    style={{ padding: 0 }}
                    onClick={() => handleDelete(book.product_id._id)}
                  />
                </Button>
                <span>{addToCartBtn(book.product_id)}</span>
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
      <div className="container-div">{loading ? null : display}</div>

      <Footer />
    </div>
  );
}
