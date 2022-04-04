import React from "react";
import "./Homepage.scss";
import AppBar from "components/AppBar/AppBar";
import ListBoardItems from "components/ListBoardItems/ListBoardItems";

const HomepageContainer = () => {
  return (
    <div>
      <AppBar />
      <div className="wrap-container">
        <ListBoardItems />
      </div>
    </div>
  );
};

export default React.memo(HomepageContainer);
