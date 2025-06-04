const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');  // <-- add this line
const { createReview } = require('../controllers/reviewController');

router.post('/', auth, bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/search', bookController.searchBooks);  // search route before /:id
router.get('/:id', bookController.getBookById);
router.post('/:id/reviews', auth, createReview);

module.exports = router;
