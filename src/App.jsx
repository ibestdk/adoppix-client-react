import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import SignIn from "./routes/authentication/sign-in/sign-in.component";
import "./App.scss";
import WithNav from "./routes/nav-controller/with-nav/with-nav.component";
import WithOutNav from "./routes/nav-controller/without-nav/without-nav.component";
import SignUp from "./routes/authentication/sign-up/sign-up.component";
import { createContext, useState, useEffect } from "react";
import React from "react";
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
import ForgetPassword from "./routes/authentication/forget-password/forget-password.component";
import MailPasswordSended from "./components/auth/forget-password/mailsended";
import ResetPassword from "./routes/authentication/reset-password/reset-password.component";
import ResetPasswordCard from "./components/auth/reset-password/reset-password";
import { MarketIndex } from "./routes/market/market-index/market-index.component";
import { MarketItem } from "./routes/market/market-item/market-item.component";
import VerifyEmail from "./routes/authentication/verify/email/verify-email.component";
import { MarketCreate } from "./routes/market/market-create/market-create.component";
import { ProtectedRoute } from "./routes/denied/denied.component";
import { AuctionCreate } from "./routes/auction/auction-create/auction-create.component";
import { MarketWishList } from "./routes/market/market-wishlist/market-wishlist.component";
import { MarketCart } from "./routes/market/market-cart/market-cart.component";

export const DarkContext = createContext();

function App() {
  // const [darkToggle, setDarkToggle] = React.useState(false);
  const [darkToggle, setDarkToggle] = useState(false);

  useEffect(() => {
    const loadedTheme = async () => {
      if (!localStorage.getItem("theme") && localStorage.getItem("user")) {
        console.log("โหลดธีมใหม่จากผู้ใช้ เนื่องจากยังไม่มีธีมใน local");
        const userData = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("theme", userData.isDark);
        setDarkToggle(userData.isDark);
        console.log("theme is : " + userData.isDark);
        console.log("======================================");
        console.log(1);
      } else if (localStorage.getItem("theme")) {
        console.log("โหลดธีมจาก local");
        const theme = JSON.parse(localStorage.getItem("theme"));
        console.log(theme);
        setDarkToggle(theme);
        console.log(2);
      } else {
        console.log("หาไม่เจอ เซ็ตธีมใหม่แปป");
        setDarkToggle(false);
        console.log(3);
      }
    };
    loadedTheme();

    // // block right click
    // document.addEventListener("contextmenu", function (event) {
    //   event.preventDefault();
    // });

    // // block F12
    // document.addEventListener("keydown", function (event) {
    //   if (event.keyCode === 123) {
    //     event.preventDefault();
    //   }
    // });

    // // block Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + Shift + C
    // document.addEventListener("keydown", function (event) {
    //   if ((event.ctrlKey && event.shiftKey) && (event.key === "I" || event.key === "J" || event.key === "C")) {
    //     event.preventDefault();
    //   }
    // });

    // // block Ctrl + U
    // document.addEventListener("keydown", function (event) {
    //   if ((event.ctrlKey) && (event.key === "U")) {
    //     event.preventDefault();
    //   }
    // });
  }, []);

  return (
    <DarkContext.Provider value={{ darkToggle, setDarkToggle }}>
      <div className={`App ${darkToggle ? "dark" : ""}`}>
        <Routes>
          <Route exact path="/" element={<WithNav />}>
            <Route exact index element={<Home />} />
            <Route exact path="auction/" element={<Auction />}>
              <Route exact index element={<AuctionIndex />} />
              <Route exact path=":auctionId" element={<AuctionItem />} />
              <Route
                exact
                path="create"
                element={
                  <ProtectedRoute>
                    <AuctionCreate />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="market/" element={<Market />} >
              <Route path="wishlist" element={<MarketWishList/>}/>
              <Route path="cart" element={<MarketCart/>}/>
              <Route index element={<MarketIndex/>} />
              <Route path=":marketId" element={<MarketItem/>} />
              <Route path="create" element={<MarketCreate/>} />
            </Route>
            <Route exact path="feeds" element={<Feeds />} />

            <Route
              exact
              path="setting/"
              element={
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              }
            >
              <Route exact path="account" element={<Account />}></Route>
              <Route exact path="security" element={<Security />}></Route>
              <Route exact path="payment" element={<Payment />}></Route>
              <Route exact path="bank" element={<Bank />}></Route>
            </Route>

            <Route exact path=":userprofile" element={<UserProfile />} />
          </Route>
          <Route exact element={<WithOutNav />}>
            <Route exact path="login" element={<SignIn />} />
            <Route exact path="signup" element={<SignUp />} />
            <Route exact path="forgetpassword" element={<ForgetPassword />} />
            <Route
              exact
              path="forgetpassword/mailsended"
              element={<MailPasswordSended />}
            />
            <Route
              exact
              path="password/reset/:token"
              element={<ResetPasswordCard />}
            />
            <Route
              exact
              path="verify/emailaddress/:token"
              element={<VerifyEmail />}
            />
          </Route>
        </Routes>
      </div>
    </DarkContext.Provider>
  );
}

export default App;
