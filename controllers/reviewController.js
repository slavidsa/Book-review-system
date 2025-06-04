const { Review } = require('../models');

//submit a review
exports.createReview = async (req, res) => {
  const exists = await Review.findOne({
    where: { userId: req.user.id, bookId: req.params.id }
  });

  if (exists) return res.status(400).json({ error: 'Review already exists' });

  const review = await Review.create({
    ...req.body,
    userId: req.user.id,
    bookId: req.params.id
  });

  res.status(201).json({
    message: 'Review created',
    reviewId: review.id,
    bookId: review.bookId,
    userId: review.userId
  });
};

//update an existing review(authorized users only)
exports.updateReview = async (req, res) => {
  const review = await Review.findOne({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!review) return res.status(404).json({ error: 'Review not found' });

  await review.update(req.body);
  res.json({
    message: 'Review updated',
    reviewId: review.id,
    bookId: review.bookId,
    userId: review.userId,
    content: review.content,
    rating: review.rating
  });
};

//delete a review (only authorized users)
exports.deleteReview = async (req, res) => {
  const review = await Review.findOne({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!review) return res.status(404).json({ error: 'Review not found' });

  await review.destroy();
  res.json({ message: 'Review deleted', reviewId: review.id });
};