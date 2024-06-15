import React, { useState, useEffect } from "react";
import { auth_service } from "../../services/auth.service";
import { book_service } from "../../services/book-service";
import { user_book_service } from "../../services/user-book-service"; 
import "../../assets/css/dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResult = await auth_service.getAllUsers();
        const booksResult = await book_service.getAllBooks();
        const borrowedBooksResult = await user_book_service.getAllUserBook();

        setUsers(usersResult);
        setBooks(booksResult);
        setBorrowedBooks(borrowedBooksResult);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="stats-container">
        <div className="stat-card" style={{ backgroundColor: 'rgba(0, 255, 0, 0.5)' }}>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card" style={{ backgroundColor: 'rgba(0, 0, 255, 0.5)' }}>
          <h3>Total Books</h3>
          <p>{books.length}</p>
        </div>
        <div className="stat-card" style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }}>
          <h3>Total Borrowed Books</h3>
          <p>{borrowedBooks.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

