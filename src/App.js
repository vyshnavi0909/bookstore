import LoginSignUp from "./pages/login-signup/LoginSignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" component={LoginSignUp}></Route>
    </Router>
  );
}

export default App;
