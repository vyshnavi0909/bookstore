import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./OrderPlaced.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

export default function OrderPlaced() {
  const history = new useHistory();

  const handleContinueShopping = () => {
    history.push("/bookstore");
  };
  return (
    <div>
      <Header />
      <div className="order-placed-page">
        <div>
          <h1>Order Placed Successfully</h1>
          <p>
            hurray!!! your order is confirmed the order id is #123456 save the
            order id for further communication..
          </p>
          <div className="continue-shopping-btn">
            <Button
              style={{
                backgroundColor: "#3371b5",
                color: "#fff",
                borderRadius: "3px",
                padding: "7px 30px",
              }}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
