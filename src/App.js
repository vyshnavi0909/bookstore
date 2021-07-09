import LoginSignUp from "./pages/login-signup/LoginSignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Cart from "./components/cart/Cart";
import OrderPlaced from "./pages/ordered/OrderPlaced";

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginSignUp}></Route>
      <Route exact path="/bookstore" component={Home}></Route>
      <Route exact path="/bookstore/cart" component={Cart}></Route>
      <Route
        exact
        path="/bookstore/order-placed"
        component={OrderPlaced}
      ></Route>
    </Router>
  );
}

export default App;
