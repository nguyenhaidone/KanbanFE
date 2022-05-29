import React from "react";
import "./Homepage.scss";
import AppBar from "components/AppBar/AppBar";
import ListBoardItems from "components/ListBoardItems/ListBoardItems";
import ListTemplate from "components/ListTemplate/ListTemplate";
import ListBoardJoined from "components/ListBoardJoined/ListBoardJoined";

const HomepageContainer = () => {
  return (
    <div>
      <AppBar />
      <div className="wrap-homepage-container">
        <ListBoardItems />
        <ListTemplate />
        <ListBoardJoined />
      </div>
    </div>
  );
};

export default React.memo(HomepageContainer);
