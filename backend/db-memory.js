// In-memory database for testing when MongoDB Atlas is blocked
let users = [];
let books = [];
let userIdCounter = 1;
let bookIdCounter = 1;

export const memoryDB = {
  // User operations
  users: {
    create: (userData) => {
      const user = { _id: String(userIdCounter++), ...userData, createdAt: new Date(), updatedAt: new Date() };
      users.push(user);
      return user;
    },
    findOne: (query) => {
      if (query.email) return users.find(u => u.email === query.email);
      if (query._id) return users.find(u => u._id === query._id);
      return null;
    },
    findById: (id) => users.find(u => u._id === id),
  },
  
  // Book operations
  books: {
    create: (bookData) => {
      const book = { _id: String(bookIdCounter++), ...bookData, createdAt: new Date(), updatedAt: new Date() };
      books.push(book);
      return book;
    },
    find: () => books,
    findById: (id) => books.find(b => b._id === id),
    findByIdAndUpdate: (id, data) => {
      const index = books.findIndex(b => b._id === id);
      if (index !== -1) {
        books[index] = { ...books[index], ...data, updatedAt: new Date() };
        return books[index];
      }
      return null;
    },
    findByIdAndDelete: (id) => {
      const index = books.findIndex(b => b._id === id);
      if (index !== -1) {
        const deleted = books[index];
        books.splice(index, 1);
        return deleted;
      }
      return null;
    },
  },
  
  // Clear all data
  clear: () => {
    users = [];
    books = [];
    userIdCounter = 1;
    bookIdCounter = 1;
  }
};
