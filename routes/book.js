const express = require("express");
const router = express.Router();
const bookcontroller = require('../controllers/bookcontroller');// Asuming this is your controller

// POST route to add a new book
router.post("/add/book", (req, res) => {
  bookcontroller.addNewBook(req, res);
});

// GET route to render the add book page
router.get("/addbooks", (req, res) => {
  res.render("addBooks"); // Use addBook or addBooks based on the actual file name
});

// GET route to retrieve all books
router.get("/books", (req, res) => {
  bookcontroller.getBooks(req, res);
});

router.get('/viewbook',(req,res)=>{
  bookcontroller.getUserbook(req,res);
})
// Export the router
module.exports = router;
