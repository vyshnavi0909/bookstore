// import { Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const services = new UserServices();
export default function Cart() {
  const [cartBooks, setCartBooks] = useState();
  const [count, setCount] = useState();
  const getCartItems = () => {
    services
      .getFromCart()
      .then((res) => {
        console.log(res);
        let cartcount = res.data.result.length;
        setCount(cartcount);
        setCartBooks(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div>
      <Header count={count} />
      <div className="cart-container">
        {cartBooks.map((book, index) => (
          <h5>{book.product_id.bookName}</h5>
        ))}
      </div>

      <Footer />
    </div>
  );
}
