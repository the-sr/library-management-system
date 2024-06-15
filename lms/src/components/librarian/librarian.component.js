import "../../assets/css/sidebar.css";
import { useState } from "react";
import UserProfile from "../common/user-profile.component";
import AddBookComponent from "./add-book.component";
import BookList from "./book-list.component";
import Settings from "../common/user-setting.component";
import UserList from "./user-list.component";
import Dashboard from "./dashboard.component";

export const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('Profile');

    const renderContent = () => {
        switch (activeMenu) {
            case 'Profile':
                return <div className="content-animate"><UserProfile /></div>;
            case 'Dashboard':
                return <div className="content-animate"><Dashboard /></div>;
            case 'Users':
                return <div className="content-animate"><UserList/></div>
            case 'Books':
                return <div className="content-animate"><BookList /></div>;
            case 'AddBook':
                return <div className="content-animate"><AddBookComponent /></div>;
            case 'Setting':
                return <div className="content-animate"><Settings/></div>;
            default:
                return <div className="content-animate"><UserProfile /></div>;
        }
    };

    return (
        <div className="App">
            <div className="sidebar">
                <ul>
                    <li
                        className={activeMenu === 'Profile' ? 'active' : ''}
                        onClick={() => setActiveMenu('Profile')}>
                        <i className="fa-regular fa-user me-2" />Profile
                    </li>
                    <li
            className={activeMenu === "Dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("Dashboard")}
          >
            <i className="fa-solid fa-gauge me-2" />
            Dashboard
          </li>
                    <li
                        className={activeMenu === 'Users' ? 'active' : ''}
                        onClick={() => setActiveMenu('Users')}>
                        <i className="fa-solid fa-users me-2" />Users
                    </li>
                    <li
                        className={activeMenu === 'Books' ? 'active' : ''}
                        onClick={() => setActiveMenu('Books')}>
                        <i className="fa-solid fa-book me-2" />Books
                    </li>
                    <li
                        className={activeMenu === 'AddBook' ? 'active' : ''}
                        onClick={() => setActiveMenu('AddBook')}>
                        <i className="fa-solid fa-square-plus me-2" />Add Book
                    </li>
                    <li
                        className={activeMenu === 'Setting' ? 'active' : ''}
                        onClick={() => setActiveMenu('Setting')}>
                        <i className="fa-solid fa-gear me-2" />Setting
                    </li>
                </ul>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
}