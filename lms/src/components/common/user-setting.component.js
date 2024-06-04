import React, { useState, useEffect } from "react";
import { auth_service } from "../../services/auth.service";
import "../../assets/css/user-setting.css";

const Settings = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: ""
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const result = await auth_service.getLoggedInUser();
                setUser(result.user_details);
            } catch (err) {
                setError(err.message || "Error fetching user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setIsChangingPassword(false);
    };

    const handleChangePasswordClick = () => {
        setIsChangingPassword(true);
        setIsEditing(false);
    };

    const handleDeleteClick = async () => {
        try {
            await auth_service.deleteUser(user.id);
            alert("User deleted successfully");
            // Handle user deletion (e.g., redirect, show a message, etc.)
        } catch (err) {
            alert("Error deleting user");
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth_service.updateUser(user);
            alert("User updated successfully");
            setIsEditing(false);
        } catch (err) {
            alert("Error updating user");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth_service.changePassword(passwordData);
            alert("Password changed successfully");
            setIsChangingPassword(false);
        } catch (err) {
            alert("Error changing password");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="settings-container">
            <div className="settings-options">
                <button onClick={handleEditClick}>Edit Details</button>
                <button onClick={handleChangePasswordClick}>Change Password</button>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
            {isEditing && (
                <form onSubmit={handleUpdateSubmit} className="edit-form">
                    <p>Edit User Details</p>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={user.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input type="tel" name="phone" value={user.phone} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <input type="text" name="role" value={user.role} onChange={handleInputChange} />
                    </div>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}
            {isChangingPassword && (
                <form onSubmit={handleChangePasswordSubmit} className="change-password-form">
                    <p>Change Password</p>
                    <div className="form-group">
                        <label>Old Password:</label>
                        <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
                    </div>
                    <button type="submit">Change Password</button>
                    <button type="button" onClick={() => setIsChangingPassword(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Settings;
