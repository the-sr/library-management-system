import { useEffect, useState } from "react";
import { user_book_service } from "../../services/user-book-service";
import "./book-detail.css";
import { toast } from "react-toastify";

const BookDetails = ({ book, onBackClick }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const result = await user_book_service.getUserBook();
        console.log(result);
        setBooks(result);
      } catch (err) {
        setError(err.message || "Error fetching borrowed book list");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, []);
  const handleBorrow = async () => {
    if (books.length < 8) {
      try {
        await user_book_service.borrowBook(book._id);
        alert("Book borrowed successfully!");
        toast.success("Book borrowed successfully");
        onBackClick();
      } catch (err) {
        alert(err.message || "Error borrowing book");
      }
    } else {
      toast.warning(
        "You have already borrowed 8 books. Please return a book to borrow new book."
      );
    }
  };
  {
    console.log(book, "books");
  }
  return (
    <div className="book-details-container">
      <button onClick={onBackClick} className="back-button">
        Back
      </button>
      <div className="book-details-card">
        {/* <img src={book.image ? `/path/to/images/${book.image}` : "/default-image-path"} alt="Book" className="book-details-photo" /> */}
        <img
          src={process.env.PUBLIC_URL + "/book.png"}
          alt="User"
          className="profile-photo"
        />
        <div className="book-details-info">
          <p>
            <strong style={{ color: "green" }}>Title:</strong> {book.title}
          </p>
          <p>
            <strong style={{ color: "green" }}>Authors:</strong> {book.author}
          </p>
          <p>
            <strong style={{ color: "green" }}>Edition:</strong> {book.edition}
          </p>
          <p>
            <strong style={{ color: "green" }}>Publisher:</strong>{" "}
            {book.publisher}
          </p>
          <p>
            <strong style={{ color: "green" }}>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong style={{ color: "green" }}>Book Count:</strong>{" "}
            {book.bookCount}
          </p>
          <button onClick={handleBorrow} className="borrow-button">
            Borrow Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
