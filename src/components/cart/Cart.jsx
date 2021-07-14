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
  const [displayOrderSum, setOrderOpen] = useState("none");
  const [displayPlaceOrderBtn, setBtn] = useState("");

  const [custDetails, setDetails] = useState({
    name: "",
    phoneNum: "",
    landmark: "",
    address: "",
    city: "",
    locality: "",
    pincode: "",
    addressType: "Home",
  });
  const count = cartBooks.length;
  var display;

  const getCartItems = () => {
    services
      .getFromCart()
      .then((res) => {
        setCartBooks(res.data.result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePlaceOrderBtn = () => {
    setBtn("none");
    setCustOpen("block");
  };

  const handleContinue = () => {
    let isFilled =
      custDetails.name !== "" &&
      custDetails.phoneNum !== "" &&
      custDetails.pincode !== "" &&
      custDetails.locality !== "" &&
      custDetails.address !== "" &&
      custDetails.city !== "" &&
      custDetails.landmark !== "";
    if (isFilled) {
      let data = {
        addressType: custDetails.addressType,
        fullAddress: custDetails.address,
        city: custDetails.city,
        state: custDetails.locality,
      };
      services
        .editCustomerDetails(data)
        .then((res) => {
          console.log("edit", res);
          setOrderOpen("block");
          setCustOpen("none");
        })
        .catch((err) => {
          console.log("edit", err);
        });
    }
  };

  const handleCheckout = () => {
    let orders = [];
    for (let i = 0; i < cartBooks.length; i++) {
      let add = {
        product_id: cartBooks[i]._id,
        product_name: cartBooks[i].product_id.bookName,
        product_quantity: cartBooks[i].quantityToBuy,
        product_price: cartBooks[i].product_id.price,
      };
      orders.push(add);
    }
    let data = {
      orders,
    };
    console.log(data);
    services
      .placeOrder(data)
      .then((res) => {
        history.push("/bookstore/order-placed");
      })
      .catch((err) => {
        console.log("order", err);
      });
  };

  const handleTypeChange = (event) => {
    setDetails({
      ...custDetails,
      addressType: event.target.value,
    });
  };

  const onDecrement = (book) => {
    var bookCount = book.quantityToBuy;
    if (bookCount > 1) {
      bookCount = bookCount - 1;
      let data = {
        quantityToBuy: bookCount,
      };
      services
        .cartItemQuantity(book._id, data)
        .then((res) => {
          console.log("dec", res);
          getCartItems();
        })
        .catch((err) => {
          console.log("dec", err);
        });
    }
  };

  const onIncrement = (book) => {
    let bookCount = book.quantityToBuy + 1;
    let data = {
      quantityToBuy: bookCount,
    };
    let id = book._id;
    console.log(data);
    services
      .cartItemQuantity(id, data)
      .then((res) => {
        console.log("inc", res);
        getCartItems();
      })
      .catch((err) => {
        console.log("inc", err);
      });
  };

  const handleChange = (e) => {
    setDetails({
      ...custDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    services.removeFromCart(id).then((res) => {
      getCartItems();
    });
  };

  const handleHomePage = () => {
    history.push("/bookstore");
  };

  if (count > 0) {
    display = (
      <div className="cart-container">
        <div className="place-order-div">
          <h2>My cart ({count})</h2>
          {cartBooks.map((book, index) => (
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
                  <div className="book-quantity">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img
                        className="decrement"
                        alt="minus"
                        src={RemoveIcon}
                        onClick={() => onDecrement(book)}
                      />
                      <p className="quantity">{book.quantityToBuy}</p>
                      <img
                        className="increment"
                        alt="plus"
                        src={AddIcon}
                        onClick={() => {
                          onIncrement(book);
                        }}
                      />
                    </div>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(book._id)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="place-order-btn" style={{ width: "100%" }}>
            <Button
              style={{
                backgroundColor: "#3371b5",
                color: "#fff",
                borderRadius: "3px",
                padding: "7px 30px",
                display: displayPlaceOrderBtn,
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
            <div className="cust-det-div">
              <div className="textarea-div">
                <div className="inner-div">
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    className="text-input"
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
                <div className="inner-div">
                  <TextField
                    name="phoneNum"
                    label="Phone Number"
                    variant="outlined"
                    className="text-input"
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="textarea-div">
                <div className="inner-div">
                  <TextField
                    name="pincode"
                    label="Pincode"
                    variant="outlined"
                    className="text-input"
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
                <div className="inner-div">
                  <TextField
                    name="locality"
                    label="locality"
                    variant="outlined"
                    className="text-input"
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="textarea-div addr-ta">
                <TextareaAutosize
                  name="address"
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
                  onChange={handleChange}
                />
              </div>
              <div className="textarea-div">
                <div className="inner-div">
                  <TextField
                    name="city"
                    label="city/town"
                    variant="outlined"
                    className="text-input"
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
                <div className="inner-div">
                  <TextField
                    name="landmark"
                    label="Landmark"
                    variant="outlined"
                    className="text-input"
                    fullWidth
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="textarea-div">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={custDetails.addressType}
                    onChange={handleTypeChange}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <FormControlLabel
                      value="Home"
                      control={<Radio />}
                      label="Home"
                    />
                    <FormControlLabel
                      value="Office"
                      control={<Radio />}
                      label="Work"
                    />
                    <FormControlLabel
                      value="Other"
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
                <div key={index}>
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

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div>
      <Header />
      <p className="cart-mini-header">
        <span
          onClick={handleHomePage}
          style={{ cursor: "pointer", color: "#8a8a8a" }}
        >
          Home /
        </span>
        <b> My Cart</b>
      </p>
      {loading ? <h1>loading....</h1> : display}

      <Footer />
    </div>
  );
}
