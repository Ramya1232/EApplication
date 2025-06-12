const express = require("express")
const router = express.Router()
const Book = require("../models/Book")
router.get("/books", async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    }
    catch (error) {
        res.status(500).json({ "message": "error while fectching books data" })
    }
})
router.post("/add", async (req, res) => {
    const { userId, title, author, description, price, imageUrl } = req.body
    if (!userId) {
        return res.status(400).json({ "message": "user id is required.Login first..." })
    }
    try {
        const newBook = new Book({
            userId, title, description, author, price, imageUrl
        })
        await newBook.save()
        res.status(201).json({ "message": "book added successfully" })

    }
    catch (error) {
        res.status(500).json({ "message": "internal server error" })

    }
}
)
router.put("/books/:id", async (req, res) => {
    const { id } = req.params
    const { userId, title, author, description, price, imageUrl } = req.body
    if (!userId)
        return res.status(400).json({ "message": "user need to login first" })
    try {
        const book = await Book.findById(id)
        if (!book)
            return res.status(404).json({ "message": "Book not found" })
        if (book.userId !== userId)
            return res.status(403).json({ "message": "u r not authorized to update this book" })
        book.title = title
        book.author = author
        book.description = description
        book.price = price
        book.imageUrl = imageUrl
        await book.save()
        res.status(200).json({ "message": "book updated successfully" })
    }
    catch (error) {
        return res.status(500).json({ "message": "unable to update book" })
    }

})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const { userId } = req.body
    console.log("sdekete action",userId,id)
    try {
        const book = await Book.findById(id)
        if (!book)
           return  res.status(404).json({ "message": "Book not found" })

        if (book.userId != userId)
            return res.status(403).json({ "message": "u r not owner of the book" })

        await Book.findByIdAndDelete(id)
        return res.status(200).json({ "message": "deleted successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "Internal server error while deleting a book" })
    }
})
module.exports = router