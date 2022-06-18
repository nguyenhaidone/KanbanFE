import React from "react";
import "./LoadingCircle.scss";

const LoadingCircle = () => {
  return (
    <div className="wrap-loading">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default React.memo(LoadingCircle);
