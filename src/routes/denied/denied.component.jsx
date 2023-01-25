import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function first() {
    return new Promise((resolve) => {
      // console.log("1st");
      resolve();
    });
  }

  function second() {
    return new Promise((resolve) => {
      // console.log("2nd");
      // console.log(token);
      setTimeout(() => {
        // console.log(token);
        if (token === null) {
          // console.log("pass condition");
          // console.log("redirect");
          navigate("/login");
        }
        resolve();
      }, 3000);
    });
  }

  function third() {
    // console.log("3rd");
  }

  useEffect(() => {
    first().then(second().then(third()));
  }, []);

  return children;
};
