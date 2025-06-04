const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');
const Review = require('./review');

// Associations
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { sequelize, User, Book, Review };