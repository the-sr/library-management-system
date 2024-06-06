// import { useState, useEffect } from "react";
// import "../../assets/css/borrowed-book-list.css";
// import BorrowedBookDetails from "./borrowed-book-detail.component";
// import { user_book_service } from "../../services/user-book-service";

// const BorrowedBookList = () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [sortCriteria, setSortCriteria] = useState("title");
//     const [sortOrder, setSortOrder] = useState("asc");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedBook, setSelectedBook] = useState(null);

//     useEffect(() => {
//         const fetchBookDetails = async () => {
//             try {
//                 const result = await user_book_service.getUserBook();
//                 setBooks(result);
//             } catch (err) {
//                 setError(err.message || "Error fetching borrowed book list");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookDetails();
//     }, []);

//     const handleSort = (e) => {
//         const criteria = e.target.value;
//         const order = sortOrder === "asc" ? "desc" : "asc";
//         setSortCriteria(criteria);
//         setSortOrder(order);

//         const sortedBooks = [...books].sort((a, b) => {
//             if (a.book[criteria] < b.book[criteria]) return order === "asc" ? -1 : 1;
//             if (a.book[criteria] > b.book[criteria]) return order === "asc" ? 1 : -1;
//             return 0;
//         });

//         setBooks(sortedBooks);
//     };

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const filteredBooks = books.filter(book =>
//         book.book.title && book.book.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleBookClick = (book) => {
//         setSelectedBook(book);
//     };

//     const handleBackClick = () => {
//         setSelectedBook(null);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className="book-list-container">
//             {selectedBook ? (
//                 <BorrowedBookDetails book={selectedBook} onBackClick={handleBackClick} />
//             ) : (
//                 <>
//                     <div className="search-sort-container">
//                         <input
//                             type="text"
//                             placeholder="Search by title"
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             className="search-box"
//                         />
//                         <select onChange={handleSort} className="sort-select">
//                             <option value="title">Sort by Title</option>
//                             <option value="edition">Sort by Edition</option>
//                             <option value="genre">Sort by Genre</option>
//                         </select>
//                     </div>
//                     <div className="book-list">
//                         {filteredBooks.map(item => (
//                             <div key={item._id} className="book-card" onClick={() => handleBookClick(item)}>
//                                 <img src={item.book.image ? `path/to/images/${item.book.image}` : "default-image-path"} alt="Book" className="book-photo" />
//                                 <div className="book-details">
//                                     <p><strong style={{ color: 'green' }}>Title:</strong> {item.book.title}</p>
//                                     <p><strong style={{ color: 'green' }}>Authors:</strong> {item.book.author}</p>
//                                     <p><strong style={{ color: 'green' }}>Edition:</strong> {item.book.edition}</p>
//                                     <p><strong style={{ color: 'green' }}>Publisher:</strong> {item.book.publisher}</p>
//                                     <p><strong style={{ color: 'green' }}>Genre:</strong> {item.book.genre}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default BorrowedBookList;


import { useState, useEffect } from "react";
import "../../assets/css/borrowed-book-list.css";
import BorrowedBookDetails from "./borrowed-book-detail.component";
import { user_book_service } from "../../services/user-book-service";

const BorrowedBookList = () => {
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

    const handleSort = (e) => {
        const criteria = e.target.value;
        const order = sortOrder === "asc" ? "desc" : "asc";
        setSortCriteria(criteria);
        setSortOrder(order);

        const sortedBooks = [...books].sort((a, b) => {
            if (a.book[criteria] < b.book[criteria]) return order === "asc" ? -1 : 1;
            if (a.book[criteria] > b.book[criteria]) return order === "asc" ? 1 : -1;
            return 0;
        });

        setBooks(sortedBooks);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.book.title && book.book.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                <BorrowedBookDetails book={selectedBook} onBackClick={handleBackClick} />
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
                            <option value="genre">Sort by Genre</option>
                        </select>
                    </div>
                    <div className="book-list">
                        {filteredBooks.map(item => (
                            <div key={item._id} className="book-card" onClick={() => handleBookClick(item)}>
                                <img src={item.book.image ? `path/to/images/${item.book.image}` : "default-image-path"} alt="Book" className="book-photo" />
                                <div className="book-details">
                                    <p><strong style={{ color: 'green' }}>Title:</strong> {item.book.title}</p>
                                    <p><strong style={{ color: 'green' }}>Authors:</strong> {item.book.author}</p>
                                    <p><strong style={{ color: 'green' }}>Edition:</strong> {item.book.edition}</p>
                                    <p><strong style={{ color: 'green' }}>Publisher:</strong> {item.book.publisher}</p>
                                    <p><strong style={{ color: 'green' }}>Genre:</strong> {item.book.genre}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default BorrowedBookList;
