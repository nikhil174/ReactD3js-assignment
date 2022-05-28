import React from "react";
import img from "../../images/img.png";
import "./sideImg.scss";

function SideImg() {
  return (
    <div className="sideimg">
      <div className="sideimg__img">
        <img src={img} alt="" />
      </div>
      <div className="sideimg__text">
        <h2>Choose a date range</h2>
        <span>
          Lorem ipsum dolor sit amet consectetur <br />
          adipisicing elit. Saepe explicabo eius
        </span>
      </div>
    </div>
  );
}

export default SideImg;
