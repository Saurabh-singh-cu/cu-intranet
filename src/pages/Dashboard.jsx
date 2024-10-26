import React from "react";
import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineCreditScore } from "react-icons/md";
import noti from "../assets/images/diwali.png";
import ad from "../assets/images/hack.png";
import tech1 from "../assets/images/tech1.png";
import dil from "../assets/images/dil.png";
import MyCarousel from "./MyCarousel";
import { MdNotificationsActive } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";

const Dashboard = () => {
  return (
    <>
      <div className="main-scroller">
        <div className="main">
          <ul className="cards">
            <li className="cards_item">
              <div className="card-body">
                <div className="card-count">
                  <p className="count-">
                    1000<span className="plus-sign">+</span>{" "}
                  </p>
                </div>
                <div className="card-desc">
                  <p>Active Members</p>
                </div>
              </div>
            </li>
            <li className="cards_item">
              <div className="card-body">
                <div className="card-count">
                  <p className="count-">
                    99 <span className="plus-sign">+</span>
                  </p>
                </div>
                <div className="card-desc">
                  <p>University Bodies</p>
                </div>
              </div>
            </li>
            <li className="cards_item">
              <div className="card-body">
                <div className="card-count">
                  <p className="count-">
                    <LuBadgeCheck />{" "}
                  </p>
                </div>
                <div className="card-desc">
                  <p>Event Approval</p>
                </div>
              </div>
            </li>
            <li className="cards_item">
              <div className="card-body">
                <div className="card-count">
                  <p className="count-">
                    <MdOutlineCreditScore />
                  </p>
                </div>
                <div className="card-desc">
                  <p>Credits and GP</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="notification-ad">
          <div className="big-noti">
            <div className="bignoti-heading">
              <p
                style={{ padding: "2px", fontSize: "20px", marginRight: "7px" }}
              >
                <MdNotificationsActive />
              </p>
              NOTIFICATION
            </div>
            <img className="noti" src={dil} alt="noto" />
          </div>
          <div className="big-noti-1">
            <div className="noti-1">
              <div className="bignoti-heading">
                <p
                  style={{
                    padding: "2px",
                    fontSize: "20px",
                    marginRight: "7px",
                  }}
                >
                <RiMessage2Fill />
                </p>
                IMPORTANT MESSAGE
              </div>
              <MyCarousel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
