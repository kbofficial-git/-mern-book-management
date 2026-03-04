import express from 'express';
import { body, validationResult } from 'express-validator';
import Book from '../models/Book.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all books
router.get('/', authenticateToken, async (req, res) => {
  try {
    const books = await Book.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single book
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'name email');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create book
router.post(
  '/',
  authenticateToken,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('author').trim().notEmpty().withMessage('Author is required'),
    body('isbn').trim().notEmpty().withMessage('ISBN is required'),
    body('publishedYear').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Valid year required'),
    body('genre').trim().notEmpty().withMessage('Genre is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const book = new Book({
        ...req.body,
        createdBy: req.user.id,
      });
      await book.save();
      res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'ISBN already exists' });
      }
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// Update book
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete book
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
