import { 
  FiHome, 
  FiUser, 
  FiBarChart, 
  FiSettings, 
  FiMessageCircle, 
  FiFolder, 
  FiCalendar, 
  FiStar 
} from "react-icons/fi";
import React from "react";

// You can define the components here
const Dashboard = () => <div>📊 Dashboard Component</div>;
const Analytics = () => <div>📈 Analytics Component</div>;
const UserInfo = () => <div>👤 User Info Component</div>;
const ProfileSettings = () => <div>⚙️ Profile Settings Component</div>;
const Monthly = () => <div>📅 Monthly Reports</div>;
const Yearly = () => <div>📅 Yearly Reports</div>;
const Preferences = () => <div>⚙️ Preferences Component</div>;
const Account = () => <div>⚙️ Account Component</div>;
const Inbox = () => <div>✉️ Inbox</div>;
const Sent = () => <div>📤 Sent Messages</div>;
const ActiveProjects = () => <div>📂 Active Projects</div>;
const ArchivedProjects = () => <div>📦 Archived Projects</div>;
const Events = () => <div>📅 Events</div>;
const Reminders = () => <div>⏰ Reminders</div>;
const Saved = () => <div>⭐ Saved Favorites</div>;
const Recent = () => <div>⭐ Recent Favorites</div>;

const menuItems = [
  {
    icon: <FiHome size={24} />,
    label: "Home",
    subItems: [
      { label: "Dashboard", component: <Dashboard /> },
      { label: "Analytics", component: <Analytics /> },
    ],
  },
  {
    icon: <FiUser size={24} />,
    label: "Profile",
    subItems: [
      { label: "User Info", component: <UserInfo /> },
      { label: "Settings", component: <ProfileSettings /> },
    ],
  },
  {
    icon: <FiBarChart size={24} />,
    label: "Reports",
    subItems: [
      { label: "Monthly", component: <Monthly /> },
      { label: "Yearly", component: <Yearly /> },
    ],
  },
  {
    icon: <FiSettings size={24} />,
    label: "Settings",
    subItems: [
      { label: "Preferences", component: <Preferences /> },
      { label: "Account", component: <Account /> },
    ],
  },
  {
    icon: <FiMessageCircle size={24} />,
    label: "Messages",
    subItems: [
      { label: "Inbox", component: <Inbox /> },
      { label: "Sent", component: <Sent /> },
    ],
  },
  {
    icon: <FiFolder size={24} />,
    label: "Projects",
    subItems: [
      { label: "Active", component: <ActiveProjects /> },
      { label: "Archived", component: <ArchivedProjects /> },
    ],
  },
  {
    icon: <FiCalendar size={24} />,
    label: "Calendar",
    subItems: [
      { label: "Events", component: <Events /> },
      { label: "Reminders", component: <Reminders /> },
    ],
  },
  {
    icon: <FiStar size={24} />,
    label: "Favorites",
    subItems: [
      { label: "Saved", component: <Saved /> },
      { label: "Recent", component: <Recent /> },
    ],
  },
];

export default menuItems;
