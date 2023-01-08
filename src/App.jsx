import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import SignIn from "./routes/authentication/sign-in/sign-in.component";
import "./App.scss";
import WithNav from "./routes/nav-controller/with-nav/with-nav.component";
import WithOutNav from "./routes/nav-controller/without-nav/without-nav.component";
import SignUp from "./routes/authentication/sign-up/sign-up.component";
import { createContext, useState, useEffect } from "react";
import Auction from "./routes/auction/auction.component";
import Market from "./routes/market/market.component";
import { Feeds } from "./routes/feeds/feeds.component";


export const DarkContext = createContext();

function App() {
  // const [darkToggle, setDarkToggle] = React.useState(false);
  const [darkToggle, setDarkToggle] = useState();

  useEffect(() => {
    const loadedTheme = async () => {
      if (sessionStorage.getItem("theme")) {
        console.log("loaded theme");
        setDarkToggle(sessionStorage.getItem("theme"));
        console.log("theme is : " + sessionStorage.getItem("theme"));
      } else {
        console.log("set new theme");
        setDarkToggle(false);
        sessionStorage.setItem("theme", false);
      }
    };


    loadedTheme();
  }, []);

  return (
    <DarkContext.Provider value={{ darkToggle, setDarkToggle }}>
      <div className={`App ${darkToggle && "dark"}`}>
        <Routes>
          <Route path="/" element={<WithNav />}>
            <Route index element={<Home />} />
            <Route path="auction" element={<Auction />} />
            <Route path="market" element={<Market />} />
            <Route path="feeds" element={<Feeds />} />
          </Route>
          <Route element={<WithOutNav />}>
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </DarkContext.Provider>
  );
}

export default App;
