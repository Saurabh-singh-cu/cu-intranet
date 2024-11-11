import React from "react";
import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineCreditScore } from "react-icons/md";
import noti from "../assets/images/diwali.png";
import { GrAnnounce } from "react-icons/gr";
import tech1 from "../assets/images/tech1.png";
import dil from "../assets/images/dil.png";
import MyCarousel from "./MyCarousel";
import { MdNotificationsActive } from "react-icons/md";
import { MoreVertical } from "lucide-react";
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
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const ForumPost = ({ avatar, title, username, time, replies, views, likes }) => {
  return (
    <div className="forum-post">
      <div className="post-left">
        <img src={avatar} alt={username} className="post-avatar" />
        <div className="post-content">
          <h3 className="post-title">{title}</h3>
          <div className="post-meta">
            <span className="username">{username}</span>
            <span className="time">{time}</span>
          </div>
        </div>
      </div>
      <div className="post-right">
        <div className="post-stats">
          <div className="stat">
            <span className="stat-number-dash">{replies}</span>
            <span className="stat-label">Replies</span>
          </div>
          <div className="stat">
            <span className="stat-number-dash">{views}</span>
            <span className="stat-label">Views</span>
          </div>
          <div className="stat">
            <span className="stat-number-dash">{likes}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>
        <button className="more-button">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate()
  const cards = [
    {
      id: 1,
      title: "CLUB70",
      content: "How can I join this club?",
      user: c1,
    },
    {
      id: 2,
      title: "Professional Society",
      content: "Content for card 2",
      user: c2,
    },
    {
      id: 3,
      title: "Community",
      content: "Appreciation for Club Efforts",
      user: c3,
    },
    {
      id: 4,
      title: "Do we need any prior experience to join?",
      content: "Can we do a collab event with the tech club?",
      user: c4,
    },
    {
      id: 5,
      title: "Is there a fee to participate in the event?",
      content: "Will there be another recruitment drive soon?",
      user: c1,
    },
  ];

  const cards2 = [
    {
      id: 1,
      title: "New Club Formation",
      content: "Announcing the approval and formation of new clubs",
      user: s1,
    },
    {
      id: 2,
      title: "Club Meetings & Events",
      content:
        "Information about upcoming club meetings, including time, location, and agenda or special activities.",
      user: s2,
    },
    {
      id: 3,
      title: "Workshops & Trainings ",
      content:
        "Announcing any skill-building sessions or workshops organized by clubs for members or open to all students",
      user: s3,
    },
    {
      id: 4,
      title: "Recruitment Drives",
      content:
        "Announcements for clubs looking to expand, inviting students to join or participate in open house events.",
      user: s4,
    },
    {
      id: 5,
      title: "Elections & Leadership Positions",
      content:
        "Notifications for club leadership elections or applications for club committee positions.",
      user: s1,
    },
  ];

  const forumPosts = [
    {
      id: 1,
      avatar: s1,
      title:
        "Information about upcoming club meetings, including time, location, and agenda or special activities.",
      username: "SampleName",
      time: "1 day ago",
      replies: 32,
      views: 352,
      likes: 20,
    },
    {
      id: 2,
      avatar: s2,
      title:
        "Notifications for club leadership elections or applications for club committee positions.",
      username: "SampleName",
      time: "1 day ago",
      replies: 32,
      views: 352,
      likes: 20,
    },
    {
      id: 3,
      avatar: s3,
      title:
        "nformation about upcoming club meetings, including time, location, and agenda or special activities.",
      username: "SampleName",
      time: "1 day ago",
      replies: 32,
      views: 352,
      likes: 20,
    },
    {
      id: 4,
      avatar: s4,
      title:
        "Notifications for club leadership elections or applications for club committee positions.",
      username: "SampleName",
      time: "1 day ago",
      replies: 32,
      views: 352,
      likes: 20,
    },
  ];

  const redirectClubs = () => {
    navigate("/clubs")
  }

  

  return (
    <div className="dashboard">
      <div className="stats-cards">
        <div onClick={redirectClubs} className="stat-card">
          <div className="stat-count">
            09
          </div>
          <div className="stat-desc">Club</div>
        </div>
        <div className="stat-card">
          <div className="stat-count">
            99
          </div>
          <div className="stat-desc">Department of Society</div>
        </div>
        <div className="stat-card">
          <div className="stat-count">
            <LuBadgeCheck />
          </div>
          <div className="stat-desc">Community</div>
        </div>
        <div className="stat-card">
          <div className="stat-count">
            <MdOutlineCreditScore />
          </div>
          <div className="stat-desc">Professional Society</div>
        </div>
      </div>

      <div className="notification-section">
        <div className="notification-card">
          <div className="card-header">
            <MdNotificationsActive />
            NOTIFICATION
          </div>
          <img className="notification-image" src={dil} alt="notification" />
        </div>
        <div className="announcement-card">
          <div className="card-header announcement">
            <GrAnnounce />
            Announcement
          </div>
          <div className="scrollable-content">
            {cards2.map((card) => (
              <div key={card.id} className="info-item">
                <img src={card.user} alt="user" className="user-avatar" />
                <div className="info-content">
                  <h5>{card.title}</h5>
                  <p>{card.content}</p>
                </div>
                <ThumbsUp size={24} className="thumbs-up" />
              </div>
            ))}
          </div>
          <div className="card-footer">View All</div>
        </div>
      </div>

      <div className="info-section">
        <div className="forum-card">
          <div className="card-header forum">
            <h2>Discussion Form</h2>
          </div>
          <div className="forum-content">
            {forumPosts.map((post) => (
              <ForumPost key={post.id} {...post} />
            ))}
            <button className="view-more-button">View More</button>
          </div>
        </div>
        <div className="entity-card">
          <div className="card-header entity">
            <GrAnnounce />
            Entity
          </div>
          <div className="scrollable-content">
            {cards.map((card) => (
              <div key={card.id} className="info-item entity-item">
                <img src={card.user} alt="user" className="entity-avatar" />
                <div className="info-content">
                  <h5>{card.title}</h5>
                  <p>{card.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer">View All</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
