import React from "react";
import "./ProfileContainer.scss";
import AppBar from "components/AppBar/AppBar";
import Profile from "components/Profile/Profile";

const PaymentContainer = () => {
  return (
    <>
      <AppBar />
      <Profile />
    </>
  );
};

export default React.memo(PaymentContainer);
