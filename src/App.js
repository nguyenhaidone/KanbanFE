import "./App.scss";
import React from "react";
// import AppBar from "components/AppBar/AppBar";
// import BoardBar from "components/BoardBar/BoardBar";
// import BoardContent from "components/BoardContent/BoardContent";
// import Login from "components/Login/Login";
import PageLoading from "components/PageLoading/PageLoading";
import PopupCardDetail from "components/PopupCardDetail/PopupCardDetail";
// import Register from "components/Register/Register";
import VerifyCode from "components/VerifyCode/VerifyCode";
// import BoardItems from "components/BoardItems/BoardItems";
// import ListBoardItems from "components/ListBoardItems/ListBoardItems";
// import PopupBoardItems from "components/PopupCreateNew/PopupCreateNew";
// import CardPayment from "components/CardPayment/CardPayment";
import CheckoutConfirmation from "components/CheckoutConfirmation/CheckoutConfirmation";
// import HomepageContainer from "containers/HomepageContainer/HomepageContainer";
import LoginContainer from "containers/LoginContainer/LoginContainer";
import RegisterContainer from "containers/RegisterContainer/RegisterContainer";
import BoardContainer from "containers/BoardContainer/BoardContainer";
import BoardDetailContainer from "containers/BoardDetailContainer/BoardDetailContainer";
import PaymentContainer from "containers/PaymentContainer/PaymentContainer";
import AuthContainer from "containers/AuthContainer/AuthContainer";
import ProfileContainer from "containers/ProfileContainer/ProfileContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const LazyHomepage = React.lazy(() =>
  import("containers/HomepageContainer/HomepageContainer")
);

const App = () => {
  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <React.Suspense fallback={<PageLoading />}>
                  <AuthContainer>
                    <LazyHomepage />
                  </AuthContainer>
                </React.Suspense>
              </>
            }
          ></Route>
          <Route
            path="/homepage"
            element={
              <>
                <React.Suspense fallback={<PageLoading />}>
                  <AuthContainer>
                    <LazyHomepage />
                  </AuthContainer>
                </React.Suspense>
              </>
            }
          ></Route>
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route path="/register" element={<RegisterContainer />}></Route>
          <Route
            path="/board/:id"
            element={
              <React.Suspense fallback={<PageLoading />}>
                <AuthContainer>
                  <BoardContainer />
                </AuthContainer>
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/board/details/:id"
            element={
              <React.Suspense fallback={<PageLoading />}>
                <AuthContainer>
                  <BoardDetailContainer />
                </AuthContainer>
              </React.Suspense>
            }
          ></Route>
          <Route path="/payment-plan" element={<PaymentContainer />}></Route>
          <Route
            path="/checkout-confirmation"
            element={
              <AuthContainer>
                <CheckoutConfirmation />
              </AuthContainer>
            }
          ></Route>
          <Route
            path="/card-detail"
            element={
              <AuthContainer>
                <PopupCardDetail />
              </AuthContainer>
            }
          ></Route>
          <Route path="/verify" element={<VerifyCode />}></Route>
          <Route path="/profile" element={<ProfileContainer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default React.memo(App);
