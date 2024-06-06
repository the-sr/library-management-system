import { useState, useEffect } from "react";
import { book_service } from "../../services/book-service";
import "../../assets/css/book-list.css";
import BookDetails from "./book-detail.component";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortCriteria, setSortCriteria] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const result = await book_service.getAllBooks();
                setBooks(result);
            } catch (err) {
                setError(err.message || "Error fetching book list");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, []);

    const handleSort = (e) => {
        const criteria = e.target.value;
        const order = sortOrder === "asc" ? "desc" : "asc";
        setSortCriteria(criteria);
        setSortOrder(order);

        const sortedBooks = [...books].sort((a, b) => {
            if (a[criteria] < b[criteria]) return order === "asc" ? -1 : 1;
            if (a[criteria] > b[criteria]) return order === "asc" ? 1 : -1;
            return 0;
        });

        setBooks(sortedBooks);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    const handleBackClick = () => {
        setSelectedBook(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="book-list-container">
            {selectedBook ? (
                <BookDetails book={selectedBook} onBackClick={handleBackClick} />
            ) : (
                <>
                    <div className="search-sort-container">
                        <input
                            type="text"
                            placeholder="Search by title"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-box"
                        />
                        <select onChange={handleSort} className="sort-select">
                            <option value="title">Sort by Title</option>
                            <option value="edition">Sort by Edition</option>
                            <option value="bookCount">Sort by Book Count</option>
                            <option value="genre">Sort by Genre</option>
                        </select>
                    </div>
                    <div className="book-list">
                        {filteredBooks.map(book => (
                            <div key={book._id} className="book-card" onClick={() => handleBookClick(book)}>
                                <img src={book.image ? `path/to/images/${book.image}` : "default-image-path"} alt="Book" className="book-photo" />
                                <div className="book-details">
                                    <p><strong style={{ color: 'green' }}>Title:</strong> {book.title}</p>
                                    <p><strong style={{ color: 'green' }}>Authors:</strong> {book.author}</p>
                                    <p><strong style={{ color: 'green' }}>Edition:</strong> {book.edition}</p>
                                    <p><strong style={{ color: 'green' }}>Publisher:</strong> {book.publisher}</p>
                                    <p><strong style={{ color: 'green' }}>Genre:</strong> {book.genre}</p>
                                    <p><strong style={{ color: 'green' }}>Book Count:</strong> {book.bookCount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default BookList;
