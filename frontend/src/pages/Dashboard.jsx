import { useState, useEffect } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      alert('Failed to delete book');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Book Collection</h1>
        {loading && <div className="loading">Loading books...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && books.length === 0 && (
          <p className="no-books">No books found. Add your first book!</p>
        )}
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
