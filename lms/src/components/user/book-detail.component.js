import React from "react";
import { book_service } from "../../services/book-service";
import "./book-detail.css";

const BookDetails = ({ book, onBackClick }) => {
    const handleBorrow = async () => {
        try {
            await book_service.borrowBook(book._id);
            alert("Book borrowed successfully!");
            onBackClick(); // Go back to the book list after borrowing
        } catch (err) {
            alert(err.message || "Error borrowing book");
        }
    };

    return (
        <div className="book-details-container">
            <button onClick={onBackClick} className="back-button">Back</button>
            <div className="book-details-card">
                <img src={book.image ? `path/to/images/${book.image}` : "default-image-path"} alt="Book" className="book-details-photo" />
                <div className="book-details-info">
                    <p><strong style={{ color: 'green' }}>Title:</strong> {book.title}</p>
                    <p><strong style={{ color: 'green' }}>Authors:</strong> {book.authors}</p>
                    <p><strong style={{ color: 'green' }}>Edition:</strong> {book.edition}</p>
                    <p><strong style={{ color: 'green' }}>Publisher:</strong> {book.publisher}</p>
                    <p><strong style={{ color: 'green' }}>Genre:</strong> {book.genre}</p>
                    <p><strong style={{ color: 'green' }}>Book Count:</strong> {book.bookCount}</p>
                    <button onClick={handleBorrow} className="borrow-button">Borrow</button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
