import React, { useState } from 'react';
import '../../assets/css/add-book.css';

const AddBookComponent = () => {
    const [bookData, setBookData] = useState({
        isbn: '',
        title: '',
        author: '',
        edition: '',
        publisher: '',
        genre: '',
        image: '',
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
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Submit the data
            console.log('Book data:', bookData);
            alert('Book added successfully!');
            setBookData({
                isbn: '',
                title: '',
                author: '',
                edition: '',
                publisher: '',
                genre: '',
                image: '',
                bookCount: '',
            });
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
                        value={bookData.image}
                        onChange={handleChange}
                        className={errors.image ? 'error' : ''}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                </div>
                <div className="form-group">
                    <label>Book Count</label>
                    <input
                        type="text"
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
