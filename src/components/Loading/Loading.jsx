import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="wrap-loading">
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default React.memo(Loading);
