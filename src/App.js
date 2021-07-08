import LoginSignUp from "./pages/login-signup/LoginSignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginSignUp}></Route>
      <Route exact path="/bookstore/home" component={Home}></Route>
    </Router>
  );
}

export default App;
