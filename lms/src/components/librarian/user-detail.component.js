import React from "react";
import "./user-detail.css";

const UserDetails = ({ user, onBackClick }) => {
  console.log(user);
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
            <strong style={{ color: "green" }}>Role:</strong>{" "}
            {user.role === "user" ? "Student" : user.role}
          </p>
          <p>
            <strong style={{ color: "green" }}>Borrowed Books:</strong>
          </p>
          <ul>
            {user.borrowed_book.length > 0 ? (
              user.borrowed_book.map((borrowedBook) => (
                <li key={borrowedBook._id}>
                  <strong>Title:</strong> {borrowedBook.book.title}
                  <br />
                  <strong>Author(s):</strong> {borrowedBook.book.author}
                  <br />
                  <strong>Borrowed Date:</strong>{" "}
                  {new Date(borrowedBook.borrowedDate).toLocaleDateString()}
                  <br />
                  <strong>Return Date:</strong>{" "}
                  {new Date(borrowedBook.returnDate).toLocaleDateString()}
                  <br />
                </li>
              ))
            ) : (
              <li>No books borrowed</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
