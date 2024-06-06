
// import React, { useState } from 'react';
// import '../../assets/css/add-book.css';
// import { book_service } from '../../services/book-service';

// const AddBookComponent = () => {
//     const [bookData, setBookData] = useState({
//         isbn: '',
//         title: '',
//         author: '',
//         edition: '',
//         publisher: '',
//         genre: '',
//         image: null,
//         bookCount: '',
//     });

//     const [errors, setErrors] = useState({});

//     const validate = () => {
//         const errors = {};
//         if (!bookData.isbn) errors.isbn = 'ISBN is required';
//         if (!bookData.title) errors.title = 'Title is required';
//         if (!bookData.author) errors.author = 'Author is required';
//         if (!bookData.edition) errors.edition = 'Edition is required';
//         if (!bookData.publisher) errors.publisher = 'Publisher is required';
//         if (!bookData.genre) errors.genre = 'Genre is required';
//         if (!bookData.image) errors.image = 'Image is required';
//         if (!bookData.bookCount) {
//             errors.bookCount = 'Book count is required';
//         } else if (isNaN(bookData.bookCount)) {
//             errors.bookCount = 'Book count must be a number';
//         }

//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleChange = (e) => {
//         const { name, value, type, files } = e.target;
//         if (type === 'file') {
//             let file = files[0];
//             let ext = file.name.split(".").pop().toLowerCase();
//             if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext)) {
//                 if (file.size <= 10000000) { // 10MB
//                     setBookData({
//                         ...bookData,
//                         image: file
//                     });
//                     setErrors({
//                         ...errors,
//                         image: null
//                     });
//                 } else {
//                     setErrors({
//                         ...errors,
//                         image: "File size must be less than 10MB"
//                     });
//                 }
//             } else {
//                 setErrors({
//                     ...errors,
//                     image: "File format not supported"
//                 });
//             }
//         } else {
//             setBookData({
//                 ...bookData,
//                 [name]: value,
//             });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validate()) {
//             const formData = new FormData();
//             for (const key in bookData) {
//                 formData.append(key, bookData[key]);
//             }
            
//             try {
//                 await book_service.addBook(formData);
//                 alert('Book added successfully!');
//                 setBookData({
//                     isbn: '',
//                     title: '',
//                     author: '',
//                     edition: '',
//                     publisher: '',
//                     genre: '',
//                     image: null,
//                     bookCount: '',
//                 });
//             } catch (error) {
//                 alert('Error adding book: ' + error.message);
//             }
//         }
//     };

//     return (
//         <div className="add-book-container">
//             <h1>Add New Book</h1>
//             <form onSubmit={handleSubmit} className="add-book-form">
//                 <div className="form-group">
//                     <label>ISBN</label>
//                     <input
//                         type="text"
//                         name="isbn"
//                         value={bookData.isbn}
//                         onChange={handleChange}
//                         className={errors.isbn ? 'error' : ''}
//                     />
//                     {errors.isbn && <span className="error-message">{errors.isbn}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label>Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={bookData.title}
//                         onChange={handleChange}
//                         className={errors.title ? 'error' : ''}
//                     />
//                     {errors.title && <span className="error-message">{errors.title}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label>Author</label>
//                     <input
//                         type="text"
//                         name="author"
//                         value={bookData.author}
//                         onChange={handleChange}
//                         className={errors.author ? 'error' : ''}
//                     />
//                     {errors.author && <span className="error-message">{errors.author}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label>Edition</label>
//                     <input
//                         type="text"
//                         name="edition"
//                         value={bookData.edition}
//                         onChange={handleChange}
//                         className={errors.edition ? 'error' : ''}
//                     />
//                     {errors.edition && <span className="error-message">{errors.edition}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label>Publisher</label>
//                     <input
//                         type="text"
//                         name="publisher"
//                         value={bookData.publisher}
//                         onChange={handleChange}
//                         className={errors.publisher ? 'error' : ''}
//                     />
//                     {errors.publisher && <span className="error-message">{errors.publisher}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label>Genre</label>
//                     <input
//                         type="text"
//                         name="genre"
//                         value={bookData.genre}
//                         onChange={handleChange}
//                         className={errors.genre ? 'error' : ''}
//                     />
//                     {errors.genre && <span className="error-message">{errors.genre}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label>Image</label>
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleChange}
//                         className={errors.image ? 'error' : ''}
//                     />
//                     {errors.image && <span className="error-message">{errors.image}</span>}
//                 </div>
//                 <div className="form-group">
//                     <label>Book Count</label>
//                     <input
//                         type="text"
//                         name="bookCount"
//                         value={bookData.bookCount}
//                         onChange={handleChange}
//                         className={errors.bookCount ? 'error' : ''}
//                     />
//                     {errors.bookCount && <span className="error-message">{errors.bookCount}</span>}
//                 </div>
//                 <button type="submit" className="submit-btn">Add Book</button>
//             </form>
//         </div>
//     );
// };

// export default AddBookComponent;

import React, { useState } from 'react';
import '../../assets/css/add-book.css';
import { book_service } from '../../services/book-service';

const AddBookComponent = () => {
    const [bookData, setBookData] = useState({
        isbn: '',
        title: '',
        author: '',
        edition: '',
        publisher: '',
        genre: '',
        image: null,
        bookCount: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!bookData.isbn) errors.isbn = 'ISBN is required';
        if (!bookData.title) errors.title = 'Title is required';
        if (!bookData.author) errors.author = 'Author is required';
        if (!bookData.edition) errors.edition = 'Edition is required';
        if (!bookData.publisher) errors.publisher = 'Publisher is required';
        if (!bookData.genre) errors.genre = 'Genre is required';
        if (!bookData.image) errors.image = 'Image is required';
        if (!bookData.bookCount) {
            errors.bookCount = 'Book count is required';
        } else if (isNaN(bookData.bookCount)) {
            errors.bookCount = 'Book count must be a number';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            let file = files[0];
            let ext = file.name.split(".").pop().toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext)) {
                if (file.size <= 10000000) { // 10MB
                    setBookData({
                        ...bookData,
                        image: file
                    });
                    setErrors({
                        ...errors,
                        image: null
                    });
                } else {
                    setErrors({
                        ...errors,
                        image: "File size must be less than 10MB"
                    });
                }
            } else {
                setErrors({
                    ...errors,
                    image: "File format not supported"
                });
            }
        } else {
            setBookData({
                ...bookData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            for (const key in bookData) {
                if (key === 'image' && bookData[key]) {
                    formData.append(key, bookData[key], bookData[key].name);
                } else {
                    formData.append(key, bookData[key]);
                }
            }

            try {
                await book_service.addBook(formData);
                alert('Book added successfully!');
                setBookData({
                    isbn: '',
                    title: '',
                    author: '',
                    edition: '',
                    publisher: '',
                    genre: '',
                    image: null,
                    bookCount: '',
                });
            } catch (error) {
                alert('Error adding book: ' + error.message);
            }
        }
    };

    return (
        <div className="add-book-container">
            <h1>Add New Book</h1>
            <form onSubmit={handleSubmit} className="add-book-form">
                <div className="form-group">
                    <label>ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={bookData.isbn}
                        onChange={handleChange}
                        className={errors.isbn ? 'error' : ''}
                    />
                    {errors.isbn && <span className="error-message">{errors.isbn}</span>}
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        className={errors.author ? 'error' : ''}
                    />
                    {errors.author && <span className="error-message">{errors.author}</span>}
                </div>
                <div className="form-group">
                    <label>Edition</label>
                    <input
                        type="text"
                        name="edition"
                        value={bookData.edition}
                        onChange={handleChange}
                        className={errors.edition ? 'error' : ''}
                    />
                    {errors.edition && <span className="error-message">{errors.edition}</span>}
                </div>
                <div className="form-group">
                    <label>Publisher</label>
                    <input
                        type="text"
                        name="publisher"
                        value={bookData.publisher}
                        onChange={handleChange}
                        className={errors.publisher ? 'error' : ''}
                    />
                    {errors.publisher && <span className="error-message">{errors.publisher}</span>}
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={bookData.genre}
                        onChange={handleChange}
                        className={errors.genre ? 'error' : ''}
                    />
                    {errors.genre && <span className="error-message">{errors.genre}</span>}
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className={errors.image ? 'error' : ''}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                </div>
                <div className="form-group">
                    <label>Book Count</label>
                    <input
                        type="number"
                        name="bookCount"
                        value={bookData.bookCount}
                        onChange={handleChange}
                        className={errors.bookCount ? 'error' : ''}
                    />
                    {errors.bookCount && <span className="error-message">{errors.bookCount}</span>}
                </div>
                <button type="submit" className="submit-btn">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookComponent;

