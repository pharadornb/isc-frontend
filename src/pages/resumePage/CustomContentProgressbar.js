import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { render } from "react-dom";

export default function CustomContentProgressbar(props) {

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ position: "absolute" }}>
      <CircularProgressbar value={props.percentage} />
      </div>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
