// import { useState } from "react";
// import { book_service } from "../../services/book-service";
// import "./book-detail.css";

// const BookDetails = ({ book, onBackClick, onDeleteBook }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedBook, setEditedBook] = useState({ ...book });

//   const handleEdit = async () => {
//     try {
//       await book_service.updateBook(editedBook._id, editedBook);
//       alert("Book details updated successfully!");
//       onBackClick();
//     } catch (err) {
//       alert(err.message || "Error updating book details");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedBook((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleDeleteBook = async () => {
//     if (window.confirm("Are you sure you want to delete this book?")) {
//       try {
//         await book_service.deleteBook(book._id);
//         alert("Book deleted successfully!");
//         onDeleteBook(book._id);  // Optionally, refresh the book list
//         onBackClick();  // Go back after deletion
//       } catch (err) {
//         alert(err.message || "Error deleting book");
//       }
//     }
//   };

//   return (
//     <div className="book-details-container">
//       <button onClick={onBackClick} className="back-button">
//         Back
//       </button>
//       <div className="book-details-card">
//         <img
//           src={book.image ? `path/to/images/${book.image}` : "default-image-path"}
//           alt="Book"
//           className="book-details-photo"
//         />
//         <div className="book-details-info">
//           {isEditing ? (
//             <>
//               <input type="text" name="title" value={editedBook.title} onChange={handleChange} />
//               <input type="text" name="author" value={editedBook.author} onChange={handleChange} />
//               <input type="text" name="edition" value={editedBook.edition} onChange={handleChange} />
//               <input type="text" name="publisher" value={editedBook.publisher} onChange={handleChange} />
//               <input type="text" name="genre" value={editedBook.genre} onChange={handleChange} />
//               <input type="number" name="bookCount" value={editedBook.bookCount} onChange={handleChange} />
//               <button onClick={handleEdit} className="save-button">
//                 Save
//               </button>
//             </>
//           ) : (
//             <>
//               <p>
//                 <strong style={{ color: "green" }}>Title:</strong> {book.title}
//               </p>
//               <p>
//                 <strong style={{ color: "green" }}>Authors:</strong> {book.author}
//               </p>
//               <p>
//                 <strong style={{ color: "green" }}>Edition:</strong> {book.edition}
//               </p>
//               <p>
//                 <strong style={{ color: "green" }}>Publisher:</strong> {book.publisher}
//               </p>
//               <p>
//                 <strong style={{ color: "green" }}>Genre:</strong> {book.genre}
//               </p>
//               <p>
//                 <strong style={{ color: "green" }}>Book Count:</strong> {book.bookCount}
//               </p>
//               <div className="book-actions">
//                 <button onClick={() => setIsEditing(true)} className="edit-button me-2">
//                   <i className="fa-solid fa-pen-to-square me-2" /> Edit Details
//                 </button>
//                 <button onClick={handleDeleteBook} className="delete-button">
//                   <i className="fa-solid fa-trash me-2" /> Delete Book
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;

import { useState } from "react";
import { book_service } from "../../services/book-service";
import "./book-detail.css";

const BookDetails = ({ book, onBackClick, onDeleteBook }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({ ...book });

  // Handles updates to the edited book's state as the user modifies input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles the save button click to update book details
  const handleEdit = async () => {
    if (!editedBook._id) {
      alert("Invalid book ID.");
      return;
    }

    try {
      await book_service.updateBook(editedBook._id, editedBook);
      alert("Book details updated successfully!");
      onBackClick();
    } catch (err) {
      alert(err.message || "Error updating book details");
    }
  };

  // Handles the delete button click to remove a book
  const handleDeleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await book_service.deleteBook(book._id);
        alert("Book deleted successfully!");
        onDeleteBook(book._id);
        onBackClick();
      } catch (err) {
        alert(err.message || "Error deleting book");
      }
    }
  };

  return (
    <div className="book-details-container">
      <button onClick={onBackClick} className="back-button">
        Back
      </button>
      <div className="book-details-card">
        {/* <img
          src={book.image ? `path/to/images/${book.image}` : "default-image-path"}
          alt="Book"
          className="book-details-photo"
        /> */}
        <img
          src={process.env.PUBLIC_URL + "/book.png"}
          alt="User"
          className="profile-photo"
        />
        <div className="book-details-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="title"
                value={editedBook.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="author"
                value={editedBook.author}
                onChange={handleChange}
              />
              <input
                type="text"
                name="edition"
                value={editedBook.edition}
                onChange={handleChange}
              />
              <input
                type="text"
                name="publisher"
                value={editedBook.publisher}
                onChange={handleChange}
              />
              <input
                type="text"
                name="genre"
                value={editedBook.genre}
                onChange={handleChange}
              />
              <input
                type="number"
                name="bookCount"
                value={editedBook.bookCount}
                onChange={handleChange}
              />
              <button onClick={handleEdit} className="save-button">
                Save
              </button>
            </>
          ) : (
            <>
              <p>
                <strong style={{ color: "green" }}>Title:</strong> {book.title}
              </p>
              <p>
                <strong style={{ color: "green" }}>Authors:</strong>{" "}
                {book.author}
              </p>
              <p>
                <strong style={{ color: "green" }}>Edition:</strong>{" "}
                {book.edition}
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
              <div className="book-actions">
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button me-2"
                >
                  <i className="fa-solid fa-pen-to-square" /> Edit Details
                </button>
                <button onClick={handleDeleteBook} className="delete-button">
                  <i className="fa-solid fa-trash" /> Delete Book
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
