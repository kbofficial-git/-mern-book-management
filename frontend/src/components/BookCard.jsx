import { Link } from 'react-router-dom';

const BookCard = ({ book, onDelete }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      <div className="book-details">
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Year:</strong> {book.publishedYear}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        {book.description && <p className="book-description">{book.description}</p>}
      </div>
      <div className="book-actions">
        <Link to={`/edit-book/${book._id}`} className="btn btn-edit">
          Edit
        </Link>
        <button onClick={() => onDelete(book._id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
