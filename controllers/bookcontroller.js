const Book = require("../models/book"); // Import your Book model

async function addNewBook(req, res) {
  try {
    console.log("Request body:", req.body); // Log the request body
    const book = new Book(req.body); // Create a new book instance
    await book.save(); // Save the book to the database
    // res.status(201).json(book);
    let books = await Book.find({});
    res.render("datatable", { books: books }); // Respond with the created book and a 201 status
  } catch (error) {
    console.error("Something went wrong in book Controller", error);
    res
      .status(500)
      .json({ message: "Failed to add book", error: error.message });
  }
}

async function getBooks(req, res) {
  try {
    let books = await Book.find({}); // Fetch users from database

    // Check if users were found
    if (!books) {
      return res.status(404).send("No books found");
     
    }
    
    // Render the 'UserTable' EJS view, passing in the users data
    res.render("datatable", { books: books });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    // Send a response to the client to indicate there was an error
    res.status(500).send("Internal Server Error");
  }
}
async function getUserbook(req,res) {
  try {
    const books = await Book.find();  // Fetch all books from the database
    res.render('bookforuser', { books: books || [] });  // Ensure books is an
    
  } catch (error) {
    console.log(error);
    
  }
  
}

module.exports = {
  // addBook,
  getBooks,
  addNewBook,
  getUserbook
};
