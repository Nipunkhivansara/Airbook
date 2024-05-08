import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Prompt from "./components/Prompt/Prompt";
import Login from "./components/Authentication/Login";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./components/Authentication/Logout";
import UserProfile from "./components/Authentication/userprofile";
import { useState } from "react";

const App = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();

  return isLoading ? (
    <h1>Loading....</h1>
  ) : (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <AuthenticatedHome /> : <Navigate to="login" />
            }
          />
          <Route
            path="/login"
            element={isAuthenticated ? <AuthenticatedHome /> : <Login />}
          />
        </Routes>
      </Router>
    </div>
  );
};

const AuthenticatedHome =()=> {
  const [prompt, setPrompt] = useState([<Prompt />])

  const addPrompt = () => {
    setPrompt([...prompt, <Prompt />]);
  }

  console.log(prompt); 

  return (
    <>
      <Navbar />
      <UserProfile />

      {prompt.map(el => (
        el
      ))}

      <button onClick={addPrompt}>Add</button>

      <Home />
    </>
  );
}

export default App;
