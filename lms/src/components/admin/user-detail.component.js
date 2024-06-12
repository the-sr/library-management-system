// import React, { useState } from "react";
// import { auth_service } from "../../services/auth.service";
// import "./user-detail.css";

// const UserDetails = ({ user, onBackClick }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedUser, setEditedUser] = useState({ ...user });

//     const handleEdit = async () => {
//         try {
//             await auth_service.updateUser(editedUser._id, editedUser);
//             alert("User details updated successfully!");
//             onBackClick();
//         } catch (err) {
//             alert(err.message || "Error updating user details");
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             await auth_service.deleteUserById(user._id);
//             alert("User deleted successfully!");
//             onBackClick();
//         } catch (err) {
//             alert(err.message || "Error deleting user");
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditedUser(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     return (
//         <div className="user-details-container">
//             <button onClick={onBackClick} className="back-button">Back</button>
//             <div className="user-details-card">
//                 <img src={user.image ? `path/to/images/${user.image}` : "default-image-path"} alt="User" className="user-details-photo" />
//                 <div className="user-details-info">
//                     {isEditing ? (
//                         <>
//                             <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
//                             <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
//                             <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} />
//                             <input type="text" name="role" value={editedUser.role} onChange={handleChange} />
//                             <button onClick={handleEdit} className="save-button">Save</button>
//                         </>
//                     ) : (
//                         <>
//                             <p><strong style={{ color: 'green' }}>Name:</strong> {user.name}</p>
//                             <p><strong style={{ color: 'green' }}>Email:</strong> {user.email}</p>
//                             <p><strong style={{ color: 'green' }}>Phone:</strong> {user.phone}</p>
//                             <p><strong style={{ color: 'green' }}>Role:</strong> {user.role}</p>
//                                 <button onClick={() => setIsEditing(true)} className="edit-button me-2">
//                                     <i className="fa-solid fa-pen-to-square me-2" />Edit Details
//                                 </button>
//                                 <button onClick={handleDelete} className="delete-button">
//                                     <i className="fa-solid fa-trash me-2" />Delete User
//                                 </button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDetails;

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
