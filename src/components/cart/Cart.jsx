// import { Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./cart.css";
import bookImage from "./bookImage.png";
import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import AddIcon from "./add.svg";
import RemoveIcon from "./remove.svg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router";

const services = new UserServices();

export default function Cart() {
  const history = new useHistory();
  const [cartBooks, setCartBooks] = useState([]);
  const [loading, setLoader] = useState(true);
  const [displayCustdetails, setCustOpen] = useState("none");
  const [value, setValue] = React.useState("home");
  const [displayOrderSum, setOrderOpen] = useState("none");

  const count = cartBooks.length;
  console.log(count);
  var display;
  const handlePlaceOrderBtn = () => {
    setCustOpen("block");
  };

  const handleContinue = () => {
    setOrderOpen("block");
  };

  const handleCheckout = () => {
    history.push("/bookstore/order-placed");
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if (count > 0) {
    display = (
      <div className="cart-container">
        <div className="place-order-div">
          {cartBooks.map((book, index) => (
            <div>
              <div className="cart-book-div">
                <div className="book-image-div">
                  <img alt="bookImage" src={bookImage} />
                </div>
                <div className="book-details">
                  <h3 className="title">{book.product_id.bookName}</h3>
                  <p className="">by {book.product_id.author}</p>
                  <h3>Rs. {book.product_id.price}</h3>
                </div>
              </div>
              <div className="book-quantity">
                <img alt="minus" src={RemoveIcon} />
                <p className="quantity">1</p>
                <img alt="plus" src={AddIcon} />
                <p>Remove</p>
              </div>
            </div>
          ))}
          <div className="place-order-btn">
            <Button
              style={{
                backgroundColor: "#3371b5",
                color: "#fff",
                borderRadius: "3px",
                padding: "7px 30px",
              }}
              onClick={handlePlaceOrderBtn}
            >
              Place order
            </Button>
          </div>
        </div>
        <div className="Customer-details-div">
          <p className="cart-heading-text">Customer details</p>
          <div style={{ display: displayCustdetails }}>
            <div style={{ marginRight: "250px" }}>
              <div className="textarea-div">
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  className="text-input"
                />
                <TextField
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  className="text-input"
                />
              </div>
              <div className="textarea-div">
                <TextField
                  name="pincode"
                  label="Pincode"
                  variant="outlined"
                  className="text-input"
                />
                <TextField
                  name="locality"
                  label="locality"
                  variant="outlined"
                  className="text-input"
                />
              </div>
              <div className="textarea-div addr-ta">
                <TextareaAutosize
                  className="address-ta"
                  placeholder="Address"
                  style={{
                    width: "100%",
                    height: "60px",
                    resize: "none",
                    padding: "10px",
                    fontFamily: "sans-serif",
                  }}
                  variant="outlined"
                />
              </div>
              <div className="textarea-div">
                <TextField
                  name="city"
                  label="city/town"
                  variant="outlined"
                  className="text-input"
                />
                <TextField
                  name="landmark"
                  label="Landmark"
                  variant="outlined"
                  className="text-input"
                />
              </div>
              <div className="textarea-div">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={value}
                    onChange={handleChange}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <FormControlLabel
                      value="home"
                      control={<Radio />}
                      label="Home"
                    />
                    <FormControlLabel
                      value="work"
                      control={<Radio />}
                      label="Work"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="continue-btn">
              <Button
                style={{
                  backgroundColor: "#3371b5",
                  color: "#fff",
                  borderRadius: "3px",
                  padding: "7px 30px",
                }}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
        <div className="order-summary-div">
          <p className="cart-heading-text">Order Summary</p>
          <div style={{ display: displayOrderSum }}>
            <div>
              {cartBooks.map((book, index) => (
                <div>
                  <div className="cart-book-div-order">
                    <div className="book-image-div">
                      <img alt="bookImage" src={bookImage} />
                    </div>
                    <div className="book-details">
                      <h3 className="title">{book.product_id.bookName}</h3>
                      <p className="">by {book.product_id.author}</p>
                      <h3>Rs. {book.product_id.price}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout-btn">
              <Button
                style={{
                  backgroundColor: "#3371b5",
                  color: "#fff",
                  borderRadius: "3px",
                  padding: "7px 30px",
                }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    display = <h1>Your cart is empty</h1>;
  }
  const getCartItems = () => {
    services
      .getFromCart()
      .then((res) => {
        console.log(res);
        let data = res.data.result;
        setCartBooks(data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCartItems();
  }, [loading]);

  return (
    <div>
      <Header />
      {loading ? <h1>loading....</h1> : display}

      <Footer />
    </div>
  );
}
