import React from "react";
import { Spinner } from "react-bootstrap";
import "./PageLoading.scss";

const PageLoading = () => {
  return (
    <div className="wrap-loading-page">
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  );
};

export default React.memo(PageLoading);
