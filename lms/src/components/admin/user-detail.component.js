import React from "react";
import { auth_service } from "../../services/auth.service";
import "./user-detail.css";

const UserDetails = ({ user, onBackClick }) => {
  const handleDelete = async () => {
    try {
      await auth_service.deleteUserById(user._id);
      alert("User deleted successfully!");
      onBackClick();
    } catch (err) {
      alert(err.message || "Error deleting user");
    }
  };

  return (
    <div className="user-details-container">
      <button onClick={onBackClick} className="back-button">
        Back
      </button>
      <div className="user-details-card">
        {/* <img src={user.image ? `path/to/images/${user.image}` : "default-image-path"} alt="User" className="user-details-photo" /> */}
        <img
          src={process.env.PUBLIC_URL + "/profile.png"}
          alt="User"
          className="profile-photo"
        />
        <div className="user-details-info">
          <p>
            <strong style={{ color: "green" }}>Name:</strong> {user.name}
          </p>
          <p>
            <strong style={{ color: "green" }}>Email:</strong> {user.email}
          </p>
          <p>
            <strong style={{ color: "green" }}>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong style={{ color: "green" }}>Role:</strong> {user.role === "user" ? "Student" : user.role}
          </p>
          <button onClick={handleDelete} className="delete-button">
            <i className="fa-solid fa-trash me-2" />
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
