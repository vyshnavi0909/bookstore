// import { Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./WishList.css";
import bookImage from "./bookImage.png";
import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router";

const services = new UserServices();

export default function WishList() {
  const history = new useHistory();
  const [wishListBooks, setListBooks] = useState([]);
  const [loading, setLoader] = useState(true);
  //   const [displayCustdetails, setCustOpen] = useState("none");
  //   const [displayOrderSum, setOrderOpen] = useState("none");
  //   const [displayPlaceOrderBtn, setBtn] = useState("");

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

  if (count > 0) {
    display = (
      <div className="cart-container">
        <h2>My cart ({count})</h2>
        {wishListBooks.map((book, index) => (
          <div key={index}>
            <div className="cart-book-div">
              <div>
                <img
                  className="cart-book-image"
                  alt="bookImage"
                  src={bookImage}
                />
              </div>
              <div className="book-details">
                <p className="cart-head">{book.product_id.bookName}</p>
                <p className="cart-tag">by {book.product_id.author}</p>
                <p className="cart-head">Rs. {book.product_id.price}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="place-order-btn" style={{ width: "100%" }}>
          <Button>
            <DeleteIcon />
          </Button>
          <Button
            style={{
              backgroundColor: "#3371b5",
              color: "#fff",
              borderRadius: "3px",
              padding: "7px 30px",
              // display: displayPlaceOrderBtn,
            }}
            //   onClick={handlePlaceOrderBtn}
          >
            Add to cart
          </Button>
        </div>
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
      <p>
        <span onClick={handleHomePage} style={{ cursor: "pointer" }}>
          Home
        </span>{" "}
        / My Wishlist
      </p>
      {loading ? <h1>loading....</h1> : display}

      <Footer />
    </div>
  );
}
