import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import SignIn from "./routes/authentication/sign-in/sign-in.component";
import "./App.scss";
import WithNav from "./routes/nav-controller/with-nav/with-nav.component";
import WithOutNav from "./routes/nav-controller/without-nav/without-nav.component";
import SignUp from "./routes/authentication/sign-up/sign-up.component";
import { createContext, useState, useEffect } from "react";
import { Auction } from "./routes/auction/auction.component";
import { Market } from "./routes/market/market.component";
import { Feeds } from "./routes/feeds/feeds.component";
import UserProfile from "./routes/profile/user-profile.component";
import Setting from "./routes/setting/setting.component";
import Account from "./routes/setting/account/account.component";
import Security from "./routes/setting/security/security.component";
import Payment from "./routes/setting/payment/payment.component";
import Bank from "./routes/setting/bank/bank.component";
import { AuctionItem } from "./routes/auction/auction-item/auction-item.component";
import { AuctionIndex } from "./routes/auction/auction-index/auction-index.component";
import { MarketIndex } from "./routes/market/market-index/market-index.component";
import { MarketItem } from "./routes/market/market-item/market-item.component";

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
            <Route path="auction/" element={<Auction />}>
              <Route index element={<AuctionIndex />} />
              <Route path=":auctionId" element={<AuctionItem />} />
            </Route>
            <Route path="market/" element={<Market />} >
              <Route index element={<MarketIndex/>} />
              <Route path=":marketId" element={<MarketItem/>} />
            </Route>
            <Route path="feeds" element={<Feeds />} />
            <Route path="setting/" element={<Setting />}>
              <Route path="account" element={<Account />}></Route>
              <Route path="security" element={<Security />}></Route>
              <Route path="payment" element={<Payment />}></Route>
              <Route path="bank" element={<Bank />}></Route>
            </Route>
            <Route path=":userprofile" element={<UserProfile />} />
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
