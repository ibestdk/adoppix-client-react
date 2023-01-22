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
import ForgetPassword from "./routes/authentication/forget-password/forget-password.component";
import MailPasswordSended from "./components/auth/forget-password/mailsended";
import ResetPassword from "./routes/authentication/reset-password/reset-password.component";
import ResetPasswordCard from "./components/auth/reset-password/reset-password";
import { MarketIndex } from "./routes/market/market-index/market-index.component";
import { MarketItem } from "./routes/market/market-item/market-item.component";
import VerifyEmail from "./routes/authentication/verify/email/verify-email.component";

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
          <Route exact path="/" element={<WithNav />}>
            <Route exact index element={<Home />} />
            <Route exact path="auction/" element={<Auction />}>
              <Route exact index element={<AuctionIndex />} />
              <Route exact path=":auctionId"  element={<AuctionItem />} />
            </Route>
            <Route exact path="market/" element={<Market />} >
              <Route exact index element={<MarketIndex/>} />
              <Route exact path=":marketId" element={<MarketItem/>} />
            </Route>
            <Route exact path="feeds" element={<Feeds />} />
            <Route exact path="setting/" element={<Setting />}>
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
            <Route exact path="forgetpassword/mailsended" element={<MailPasswordSended />} />
            <Route exact path="password/reset/:token" element={<ResetPasswordCard />} />
            <Route exact path="verify/emailaddress/:token" element={<VerifyEmail />} />
          </Route>
        </Routes>
      </div>
    </DarkContext.Provider>
  );
}

export default App;
