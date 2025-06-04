# Book Review System

A RESTful API built with **Node.js** **Express.js**, **JWT for authentication**, and **SQLite** for managing users, books, and book reviews.

## Project Setup Instructions

## Prerequisites

Ensure you have the following installed:

- **Node.js**
- **Postman** (for testing API endpoints)

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/slavidsa/Book-review-system.git
cd bookreview
```

### 2. Install dependencies
To install the main packages use,
```bash
npm install
```
Pakages:
- express
- sequelize
- sqlite3
- dotenv
- bcryptjs
- jsonwebtoken

### 3. Setup environment variables
Create a .env file in root folder

```env
PORT=3000
JWT_SECRET=<secret_key> #This is generally a random long unpredictable string
```

### 4. Run the server
```bash
node server.js
```
The server will start on:
http://localhost:```<PORT>``` in this case http://localhost:3000 

## Example API Usage(Using Postman)

### 1. Signup
```bash
POST /api/auth/signup
```
Body:
```bash
{
  "username": "username",
  "password": "password"
}
```

### 2. Login
```bash
POST /api/auth/login
```
Body:
```bash
{
  "username": "username",
  "password": "password"
}
```
This will return a JWT token. Save this token as it will be used for protected routes.

### 3. Add a new book
```bash
POST /api/books
```
Headers: Paste the JWT token in the token section. It should appear in the key-value section as: ```Authorization: Bearer <token>```

Body:
```bash
{
  "title": "Love Unwritten",
  "author": "Lauren Asher",
  "genre": "Romance"
}
```

### 4. Get all books
```bash
GET /api/books
```
It supports optional query parameters:
e.g. 
```bash
GET /api/books?author=Lauren Asher&genre=Romance&page=1&limit=10
```

### 5. Get book details by ID
```bash
GET /api/books/:bookId
```

### 6. Submit a review
```bash
POST /api/books/:bookId/reviews
```
Headers: Paste the JWT token in the token section. It should appear like in the key-value section as: ```Authorization: Bearer <token>```

Body:
```bash
{
  "content": "A heartfelt story!",
  "rating": 5
}
```
### 7. Update a review
```bash
PUT /api/reviews/:reviewId
```
Headers: Paste the JWT token in the token section. It should appear like in the key-value section as: ```Authorization: Bearer <token>```

Body:
```
{
  "content": "Changed my mind. Still great.",
  "rating": 4
}
```
### 8. Delete a review
Headers: Paste the JWT token in the token section. It should appear like in the key-value section as: ```Authorization: Bearer <token>```
```bash
DELETE /api/reviews/:reviewId
```

### 9. Search a book
```bash
GET /api/books/search?query=unwritten
```

## Design Decisions and Assumptions
- JWT-based authentication is used to protect certain routes.
- Sequelize ORM is chosen to interact with the SQLite database It provides an easier and organized way to handle database operations.
- Each user is allowed to write only one review per book, but a book can have multiple reviews from different users.
- Only authenticated users can create, update, or delete books and reviews.
- The project follows a modular structure by separating routes, controllers, and models for better maintainability.
- Pagination is implemented on the book listing endpoint to limit the number of books returned per request and improve performance.
- Error handling includes meaningful messages and appropriate HTTP status codes to help debugging.

## Schema design
User
```
id (Primary Key)

username

password
```

Book
```
id (Primary Key)

title

author

genre
```
Review
```
id (Primary Key)

content

rating (Integer)

userId (Foreign Key -> User.id)

bookId (Foreign Key -> Book.id)
```