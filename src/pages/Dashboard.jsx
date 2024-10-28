import React from "react";
import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineCreditScore } from "react-icons/md";
import noti from "../assets/images/diwali.png";
import { GrAnnounce } from "react-icons/gr";
import tech1 from "../assets/images/tech1.png";
import dil from "../assets/images/dil.png";
import MyCarousel from "./MyCarousel";
import { MdNotificationsActive } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { ThumbsUp } from "lucide-react";
import users from "../assets/images/users.png";
import s1 from "../assets/images/s1.png";
import s2 from "../assets/images/s2.png";
import s3 from "../assets/images/s3.png";
import s4 from "../assets/images/s4.png";
import c1 from "../assets/images/c1.png";
import c2 from "../assets/images/c2.png";
import c3 from "../assets/images/c3.png";
import c4 from "../assets/images/c4.png";

const Dashboard = () => {
  const cards = [
    {
      id: 1,
      title: "CLUB70",
      content: "How can I join this club?",
      user: `${c1}`,
    },
    {
      id: 2,
      title: "Professional Society",
      content: "Content for card 2",
      user: `${c2}`,
    },
    {
      id: 3,
      title: "Community",
      content: "Appreciation for Club Efforts",
      user: `${c3}`,
    },
    {
      id: 4,
      title: "Do we need any prior experience to join?",
      content: "Can we do a collab event with the tech club?",
      user: `${c4}`,
    },
    {
      id: 5,
      title: "Is there a fee to participate in the event?",
      content: "Will there be another recruitment drive soon?",
      user: `${c1}`,
    },
  ];
  const cards2 = [
    {
      id: 1,
      title: "New Club Formation",
      content: "Announcing the approval and formation of new clubs",
      user: `${s1}`,
    },
    {
      id: 2,
      title: "Club Meetings & Events",
      content:
        "Information about upcoming club meetings, including time, location, and agenda or special activities.",
      user: `${s2}`,
    },
    {
      id: 3,
      title: "Workshops & Trainings ",
      content:
        "Announcing any skill-building sessions or workshops organized by clubs for members or open to all students",
      user: `${s3}`,
    },
    {
      id: 4,
      title: "Recruitment Drives",
      content:
        "Announcements for clubs looking to expand, inviting students to join or participate in open house events.",
      user: `${s4}`,
    },
    {
      id: 5,
      title: "Elections & Leadership Positions",
      content:
        "Notifications for club leadership elections or applications for club committee positions.",
      user: `${s1}`,
    },
  ];

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
        <div className="dive-container">
          <div className="left-section">
            <div style={{ background: "#c78989" }} className="bignoti-heading">
              <p
                style={{ padding: "1px", fontSize: "18px", marginRight: "7px" }}
              >
                <GrAnnounce />
              </p>
              Announcement
            </div>
            <div className="card">
              <div className="scrollable-cards">
                {cards2.map((card) => (
                  <div key={card.id} className="scroll-card">
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "14px" }}>
                        <img style={{ width: "44px" }} src={card?.user} />
                      </div>
                      <div>
                        <h5>{card.title}</h5>
                        <p style={{ fontSize: "12px" }}>{card.content}</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        {" "}
                        <ThumbsUp size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ cursor: "pointer" }} className="card-footer">
                View All
              </div>
            </div>
          </div>
          <div className="right-section">
            <div style={{ background: "#376aa7" }} className="bignoti-heading">
              <p
                style={{ padding: "1px", fontSize: "18px", marginRight: "7px" }}
              >
                <GrAnnounce />
              </p>
              Entity
            </div>
            <div className="card">
              <div className="scrollable-cards">
                {cards.map((card) => (
                  <div key={card.id} className="scroll-card-1">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginRight: "14px" }}>
                        <img style={{ width: "100px" }} src={card?.user} />
                      </div>
                      <div>
                        <h5>{card.title}</h5>
                        <p style={{ fontSize: "12px" }}>{card.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ cursor: "pointer" }} className="card-footer">
                View All
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
