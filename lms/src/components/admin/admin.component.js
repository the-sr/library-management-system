import "../../assets/css/sidebar.css";
import { useState } from "react";

import UserProfile from "../common/user-profile.component";
import AddLibrarian from "./add-librarian.component";
import Settings from "../common/user-setting.component";
import UserList from "./user-list.component";

export const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Profile");

  const renderContent = () => {
    switch (activeMenu) {
      case "Profile":
        return (
          <div className="content-animate">
            <UserProfile />
          </div>
        );
      //   case "Dashboard":
      //     return (
      //       <div className="content-animate">
      //         <Dashboard />
      //       </div>
      //     );
      case "Users":
        return (
          <div className="content-animate">
            <UserList />
          </div>
        );
      case "Librarian":
        return (
          <div className="content-animate">
            <AddLibrarian />
          </div>
        );
      case "Setting":
        return (
          <div className="content-animate">
            <Settings />
          </div>
        );
      default:
        return (
          <div className="content-animate">
            <UserProfile />
          </div>
        );
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <ul>
          <li
            className={activeMenu === "Profile" ? "active" : ""}
            onClick={() => setActiveMenu("Profile")}
          >
            <i className="fa-regular fa-user me-2" />
            Profile
          </li>
          {/* <li
            className={activeMenu === "Dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("Dashboard")}
          >
            <i className="fa-solid fa-gauge me-2" />
            Dashboard
          </li> */}
          <li
            className={activeMenu === "Users" ? "active" : ""}
            onClick={() => setActiveMenu("Users")}
          >
            <i class="fa-solid fa-users me-2" />
            Users
          </li>
          <li
            className={activeMenu === "Librarian" ? "active" : ""}
            onClick={() => setActiveMenu("Librarian")}
          >
            <i className="fa-solid fa-user-plus me-2" />
            Add Librarian
          </li>
          <li
            className={activeMenu === "Setting" ? "active" : ""}
            onClick={() => setActiveMenu("Setting")}
          >
            <i className="fa-solid fa-gear me-2" />
            Setting
          </li>
        </ul>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};
