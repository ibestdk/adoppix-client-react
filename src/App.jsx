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
import { FeedsIndex } from "./routes/feeds/feeds-index/feeds-index";
import { FeedsPost } from "./routes/feeds/feeds-post/feeds-post";
import { MarketMyShop } from "./routes/market/market-myShop/market-myShop.component";
import { MarketMyShopItem } from "./routes/market/market-myShop-item/market-myShop-item.component";
import { TopUp } from "./routes/top-up/topup";
import { TopUpIndex } from "./routes/top-up/topup-index/topup-index";
import { AuctionTags } from "./routes/auction/auction-tags/auction-tags.component";
import Storage from "./routes/storage/storage";
import { StorageIndex } from "./routes/storage/storage-index";
import { getUser, getUserDataApi } from "./services/authorize";
import { SummaryPage } from "./routes/market/market-index/buySummary/summary";
import { BuySuccess } from "./routes/market/market-index/buySummary/success/success";
import { QuestionAndAnswer } from "./routes/QnA/qna";
import { Bank } from "./routes/setting/bank/bank.component";
import { WithDrawn } from "./routes/bank/withdraw";
import { AuctionHistory } from "./routes/auction/auction-history/auction-history";
import { AuctionRemoved } from "./routes/auction/auction-item/auction-removed";

export const DarkContext = createContext();

function App() {
  // const [darkToggle, setDarkToggle] = React.useState(false);
  const [darkToggle, setDarkToggle] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const loadedTheme = async () => {
    const user = getUser();
    //console.log(user.isDark)
    setDarkToggle(user.isDark);
  };
  useEffect(() => {
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

  // useEffect(() => {
  //   const newToken = localStorage.getItem("token");
  //   if (newToken !== token) {
  //     setToken(newToken);
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (token !== null) {
  //     // Token exists, call getUserDataApi
  //     getUserDataApi(token);
  //   }
  // }, [token]);

  return (
    <DarkContext.Provider value={{ darkToggle, setDarkToggle }}>
      <div className={`App ${darkToggle ? "dark" : ""}`}>
        <div className="bg-adoplight dark:bg-adopdark">
          <Routes>
            <Route exact path="/" element={<WithNav />}>
              <Route exact index element={<Home />} />
              <Route exact path="auction/" element={<Auction />}>
                <Route exact index element={<AuctionIndex />} />
                <Route exact path="history" element={<AuctionHistory />} />
                <Route exact path="auction404" element={<AuctionRemoved />} />
                <Route exact path="tags/:tagId" element={<AuctionTags />} />
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
              <Route exact path="topup/" element={<TopUp />}>
                <Route
                  exact
                  index
                  element={
                    <ProtectedRoute>
                      <TopUpIndex />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="market/" element={<Market />}>
                <Route
                  path="wishlist"
                  element={
                    <ProtectedRoute>
                      <MarketWishList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <ProtectedRoute>
                      <MarketCart />
                    </ProtectedRoute>
                  }
                />
                <Route index element={<MarketIndex />} />
                <Route path=":productId" element={<MarketItem />} />
                <Route
                  path="my-shop/:id"
                  element={
                    <ProtectedRoute>
                      <MarketMyShopItem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create"
                  element={
                    <ProtectedRoute>
                      <MarketCreate />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="my-shop"
                  element={
                    <ProtectedRoute>
                      <MarketMyShop />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Summary/:data"
                  element={
                    <ProtectedRoute>
                      <SummaryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="transaction-sccess"
                  element={
                    <ProtectedRoute>
                      <BuySuccess />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                exact
                path="feeds"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Feeds />
                  </ProtectedRoute>
                }
              >
                <Route index element={<FeedsIndex />} />
                <Route path=":postId" element={<FeedsPost />} />
              </Route>

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
              <Route
                exact
                path="inventories/"
                element={
                  <ProtectedRoute>
                    <Storage />
                  </ProtectedRoute>
                }
              >
                <Route exact index element={<StorageIndex />}></Route>
                <Route exact path="security" element={<Security />}></Route>
                <Route exact path="payment" element={<Payment />}></Route>
                <Route exact path="bank" element={<Bank />}></Route>
              </Route>

              <Route exact path="withdraw" element={<WithDrawn />} />
              <Route exact path="Q&A" element={<QuestionAndAnswer />} />
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
      </div>
    </DarkContext.Provider>
  );
}

export default App;
