import "../../assets/css/sidebar.css";
import { useState } from "react";
import UserProfile from "../common/user-profile.component";

export const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('Profile');

    const renderContent = () => {
        switch (activeMenu) {
            case 'Profile':
                return <div className="content-animate"><UserProfile /></div>;
            // case 'Dashboard':
            //     return <div className="content-animate">Dashboard</div>;
            case 'Books':
                return <div className="content-animate">Users List</div>;
            // case 'Librarian':
            //     return <div className="content-animate">Add Librarian</div>;
            case 'Setting':
                return <div className="content-animate">Setting</div>;
            default:
                return <div className="content-animate">Profile</div>;
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
                    {/* <li
                        className={activeMenu === 'Dashboard' ? 'active' : ''}
                        onClick={() => setActiveMenu('Dashboard')}>
                        <i className="fa-solid fa-gauge me-2" />Dashboard
                    </li> */}
                    <li
                        className={activeMenu === 'Books' ? 'active' : ''}
                        onClick={() => setActiveMenu('Books')}>
                        <i className="fa-solid fa-book me-2" />Books
                    </li>
                    {/* <li
                        className={activeMenu === 'Librarian' ? 'active' : ''}
                        onClick={() => setActiveMenu('Librarian')}>
                        <i className="fa-solid fa-user-plus me-2" />Add Librarian
                    </li> */}
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