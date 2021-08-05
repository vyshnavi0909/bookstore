import LoginSignUp from "./pages/login-signup/LoginSignUp";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Cart from "./components/cart/Cart";
import OrderPlaced from "./pages/ordered/OrderPlaced";
import WishList from "./components/wishlist/WishList";
import { useEffect, useState } from "react";
import UserServices from "./services/UserServices";
import BookstoreContext from "./components/context-files/Context";
import ProtectedRouter from "./components/routes/ProtectedRouter";
import AuthRouter from "./components/routes/AuthRouter";

const services = new UserServices();

function App() {
  const [cartCount, setCount] = useState();
  const [cartBooks, setCartBooks] = useState();

  const getCartItems = () => {
    services
      .getFromCart()
      .then((res) => {
        setCount(res.data.result.length);
        setCartBooks(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCartItems();
  }, [cartCount]);

  return (
    <BookstoreContext.Provider value={{ cartCount, getCartItems, cartBooks }}>
      <Router>
        <AuthRouter exact path="/" component={LoginSignUp}></AuthRouter>
        <ProtectedRouter
          exact
          path="/bookstore"
          component={Home}
        ></ProtectedRouter>
        <ProtectedRouter
          exact
          path="/bookstore/cart"
          component={Cart}
        ></ProtectedRouter>
        <ProtectedRouter
          exact
          path="/bookstore/order-placed"
          component={OrderPlaced}
        ></ProtectedRouter>
        <ProtectedRouter
          exact
          path="/bookstore/wishlist"
          component={WishList}
        ></ProtectedRouter>
      </Router>
    </BookstoreContext.Provider>
  );
}

export default App;
