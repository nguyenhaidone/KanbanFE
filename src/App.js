import "./App.scss";
import React from "react";
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";
import Login from "components/Login/Login";
import PopupCardDetail from "components/PopupCardDetail/PopupCardDetail";
import Register from "components/Register/Register";
import BoardItems from "components/BoardItems/BoardItems";
import ListBoardItems from "components/ListBoardItems/ListBoardItems";
import PopupBoardItems from "components/PopupCreateNew/PopupCreateNew";
import CardPayment from "components/CardPayment/CardPayment";
import HomepageContainer from "containers/HomepageContainer/HomepageContainer";
import LoginContainer from "containers/LoginContainer/LoginContainer";
import RegisterContainer from "containers/RegisterContainer/RegisterContainer";
import BoardContainer from "containers/BoardContainer/BoardContainer";
import PaymentContainer from "containers/PaymentContainer/PaymentContainer";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<HomepageContainer />}></Route>
          <Route path="/login" element={<LoginContainer />}></Route>
          <Route path="/register" element={<RegisterContainer />}></Route>
          <Route path="/board" element={<BoardContainer />}></Route>
          <Route path="/payment-plan" element={<PaymentContainer />}></Route>
          <Route path="/card-detail" element={<PopupCardDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default React.memo(App);
