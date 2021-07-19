import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./OrderPlaced.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import UserServices from "../../services/UserServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const services = new UserServices();
export default function OrderPlaced() {
  const [userDetails, setDetails] = useState();
  const history = useHistory();
  const location = new useLocation();
  const [loading, setLoader] = useState(true);

  const getDetails = () => {
    services
      .getFromCart()
      .then((res) => {
        let details = res.data.result[0].user_id;
        setDetails(details);

        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const settingAddress = () => {
    var address =
      userDetails.address[0].fullAddress +
      ", " +
      userDetails.address[0].city +
      ", " +
      userDetails.address[0].state;
    return address;
  };

  const handleContinueShopping = () => {
    history.push("/bookstore");
  };

  useEffect(() => {
    getDetails();
    console.log("useEffct");
    console.log(location.pathname);
    console.log(location.state.detail);
  }, []);

  return (
    <div>
      <Header />
      <div className="order-placed-page">
        {loading ? (
          ""
        ) : (
          <div>
            <h1 className="order-placed-heading">Order Placed Successfully</h1>
            <p className="para-order">
              hurray!!! your order is confirmed the order id is #123456 save the
              order id for further communication..
            </p>
            <table className="details-table">
              <thead style={{ backgroundColor: "#eeeeee" }}>
                <th>Email us</th>
                <th>Contact us</th>
                <th>Address</th>
              </thead>
              <tbody>
                <td className="email-td">{userDetails.email}</td>
                <td>{userDetails.phone}</td>
                <td className="address-td">{settingAddress()}</td>
              </tbody>
            </table>
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
        )}
      </div>

      <Footer />
    </div>
  );
}
