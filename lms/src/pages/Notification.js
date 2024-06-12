import { useEffect, useState } from "react";
import { user_book_service } from "../services/user-book-service";

const Notification = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const result = await user_book_service.getUserBook();
        setBooks(result);
      } catch (err) {
        setError(err.message || "Error fetching borrowed book list");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, []);

  const getOverdueBooks = (books) => {
    const today = new Date();
    return books
      .filter((book) => {
        const returnDate = new Date(book.returnDate);
        return returnDate < today;
      })
      .map((book) => {
        const returnDate = new Date(book.returnDate);
        const diffTime = Math.abs(today - returnDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...book, overdueDays: diffDays };
      });
  };

  const overdueBooks = getOverdueBooks(books);

  return (
    <div
      style={{
        zIndex: 999,
        position: "absolute",
        top: "50px",
        right: "20px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        width: "300px",
      }}
    >
      {overdueBooks?.map((data, index) => {
        return (
          <div key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ padding: "15px", backgroundColor: "#f9f9f9" }}>
              <p style={{ margin: 0, fontWeight: "bold", color: "#d9534f" }}>
                Please Return Your Book
              </p>
              <p style={{ margin: "5px 0 0 0" }}>
                Your <strong>{data?.book?.title}</strong> book is overdue by{" "}
                <strong>{data?.overdueDays} days</strong>.
              </p>
            </div>
          </div>
        );
      })}
      {overdueBooks.length === 0 && (
        <div style={{ padding: "15px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#999" }}>No new Notification</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
