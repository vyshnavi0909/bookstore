// import { Card } from "@material-ui/core";
import React, { useState } from "react";
import UserServices from "../../services/UserServices";

const services = new UserServices();
export default function Cart() {
  const [cartBooks, setCartBooks] = useState("");
  const getCartItems = () => {
    services
      .getFromCart()
      .then((res) => {
        console.log(res);
        setCartBooks(res.result.product_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {cartBooks.map((book, index) => (
        <h5>{book.bookName}</h5>
      ))}
    </div>
  );
}
