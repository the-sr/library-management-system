import "../../assets/css/sidebar.css";
import { useState } from "react";
import UserProfile from "../common/user-profile.component";
import SettingsComponent from "../common/user-setting.component";
import BookList from "./book-list.component";
import BorrowedBookList from "./borrowed-book-list.component";

export const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('Profile');

    const renderContent = () => {
        switch (activeMenu) {
            case 'Profile':
                return <div className="content-animate"><UserProfile /></div>;
            case 'Books':
                return <div className="content-animate"><BookList/></div>;
            case 'BorrowedBooks':
                return <div className="content-animate"><BorrowedBookList/></div>;
            case 'Setting':
                return <div className="content-animate"><SettingsComponent /></div>;
            default:
                return <div className="content-animate"><UserProfile/></div>;
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
                        className={activeMenu === 'Books' ? 'active' : ''}
                        onClick={() => setActiveMenu('Books')}>
                        <i className="fa-solid fa-book me-2" />Books
                    </li>
                    <li
                        className={activeMenu === 'BorrowedBooks' ? 'active' : ''}
                        onClick={() => setActiveMenu('BorrowedBooks')}>
                        <i className="fa-solid fa-book-bookmark me-2" />Borrowed Books
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