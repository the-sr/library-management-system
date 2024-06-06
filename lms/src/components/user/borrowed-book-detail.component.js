
import { user_book_service } from "../../services/user-book-service";
import "./borrowed-book-detail.css";

const BorrowedBookDetails = ({ book, onBackClick }) => {
    const handleReturn = async () => {
        try {
            await user_book_service.returnBook(book._id);
            alert("Book returned successfully!");
            onBackClick();
        } catch (err) {
            alert(err.message || "Error returning book");
        }
    };

    return (
        <div className="book-details-container">
            <button onClick={onBackClick} className="back-button">Back</button>
            <div className="book-details-content">
                <img src={book.book.image ? `path/to/images/${book.book.image}` : "default-image-path"} alt="Book" className="book-photo" />
                <div className="book-details-info">
                    <p><strong>Title:</strong> {book.book.title}</p>
                    <p><strong>Authors:</strong> {book.book.author}</p>
                    <p><strong>Edition:</strong> {book.book.edition}</p>
                    <p><strong>Publisher:</strong> {book.book.publisher}</p>
                    <p><strong>Genre:</strong> {book.book.genre}</p>
                    <p><strong>Borrowed Date:</strong> {new Date(book.borrowedDate).toLocaleDateString()}</p>
                    <p><strong>Return Date:</strong> {new Date(book.returnDate).toLocaleDateString()}</p>
                    <button onClick={handleReturn} className="return-button">Return Book</button>
                </div>
            </div>
        </div>
    );
}

export default BorrowedBookDetails;

