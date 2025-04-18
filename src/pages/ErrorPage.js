import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ErrorPage.module.css"; // importing CSS module

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <h1 className={classes.code}>404</h1>
        <p className={classes.title}>Oops! Page not found.</p>
        <p className={classes.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button className={classes.button} onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
}
