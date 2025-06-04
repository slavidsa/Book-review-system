const { Book, Review, User } = require('../models');
const { Op } = require('sequelize');

//add a new book
exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ message: 'Book created', bookId: book.id });
};

//get all books
exports.getAllBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const where = {};
  if (author) where.author = author;
  if (genre) where.genre = genre;

  const books = await Book.findAll({
    where,
    offset: (page - 1) * limit,
    limit: +limit
  });

  res.json(books);
};

//get all books by ID
exports.getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    include: {
      model: Review,
      include: [User]
    }
  });

  if (!book) return res.status(404).json({ error: 'Book not found' });

  const reviews = book.Reviews;
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  res.json({
    bookId: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    averageRating: avgRating.toFixed(2),
    reviews
  });
};

//search a book
exports.searchBooks = async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const where = {
    [Op.or]: [
      { title: { [Op.like]: `%${query}%` } },
      { author: { [Op.like]: `%${query}%` } }
    ]
  };
  const books = await Book.findAll({
    where,
    offset: (page - 1) * limit,
    limit: +limit
  });

  res.json(books);
};