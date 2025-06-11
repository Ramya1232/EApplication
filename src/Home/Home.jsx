import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Home.css'
export default function Home() {
  const [books, setBooks] = useState([])
  const [editBook, setEditBook] = useState("")
  useEffect(() => {
    fetchBooks()
  }, [])
  async function fetchBooks() {
    axios.get("http://localhost:5000/api/book/books")
      .then((res) => {
        console.log(res)
        setBooks(res.data)
      })
  }
  async function deleteBook(id) {
    const userId = localStorage.getItem("userId")
    axios.delete(`http://localhost:5000/api/book/${id}`, { data: { userId } })
      .then((res) => {
        if (res.status === 200) {
          alert("Book deleted successfully")
          
        }
      })
      .catch((error) => {
        console.log(error)
      })
      fetchBooks()
  }
  function submitBook(e) {
    e.preventDefault()
    console.log(editBook)
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        alert("please login first")
        return
      }
      const updatedBook = { ...editBook, userId }
      axios.put(`http://localhost:5000/api/book/books/${editBook._id}`,updatedBook)
        .then((res) => {
          if (res.status === 200) {
            alert("Book updated successfully")
            setEditBook(null)
            fetchBooks()
          }
        })
    }
    catch (error) {
      console.log(error)
      if (error.status === 403) {
        alert("u r not authorized to update this book")
        setEditBook(null)
      }
    }
  }
  function handleBookEdit(e) {
    const { name, value } = e.target
    setEditBook((prev) => (
      { ...prev, [name]: value }))

  }
  return (
    <div>
      <h1 className='text-cener'>Books</h1>
      {
        books.length === 0 ? (
          <div>Currently we dont have any books </div>
        ) : (
          <div className='container'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {
                books.map((book) => {
                  return (
                    editBook && editBook._id === book._id ? (
                      <form className="row g-3" onSubmit={submitBook}>
                        <div className="col-12 text-center">
                          <h1>Add new Book</h1>
                        </div>
                        <div className="col-12">
                          <label htmlFor="inpuTitle" className="form-label">Title of the book</label>
                          <input name="title" type="text" value={editBook.title} className="form-control" id="inpuTitle" onChange={handleBookEdit} />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputAuthor" className="form-label">Author</label>
                          <input name="author" type="text" value={editBook.author} className="form-control" id="inputAuthor" onChange={handleBookEdit} />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputPrice" className="form-label">Price</label>
                          <input name="price" type="text" value={editBook.price} className="form-control" id="inputPrice" onChange={handleBookEdit} />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputDescription" className="form-label">Description</label>
                          <input name="description" type="text" value={editBook.description} className="form-control" id="inputDescription" onChange={handleBookEdit} />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputImageUrl" className="form-label">Image url</label>
                          <input name="imageUrl" type="text" value={editBook.imageUrl} className="form-control" id="inputImageUrl" onChange={handleBookEdit} />
                        </div>

                        <div className="col-12">
                          <button className="btn btn-success">Submit</button>
                          <button onClick={() => setEditBook(null)} type="submit" className="btn btn-danger">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className='col' key={book._id}>
                        <div className="card h-100">
                          <img className="card-img-top" src={book.imageUrl} alt={book.title} />
                          <div className="card-body">
                            <h1 className="card-title">{book.title}</h1>
                            <p className="card-text">{book.author}</p>
                            <p className="card-text">{book.price}</p>
                            <p className="card-text">{book.description}</p>

                          </div>
                          <div class="card-footer">

                            <button onClick={() => setEditBook(book)} className="btn btn-warning  fw-bold">Edit</button>
                            <button className='btn btn-danger fw-bold' onClick={() => deleteBook(book._id)}>Delete</button>
                          </div>
                        </div>

                      </div>
                    )
                  )
                })
              }
            </div>
          </div>
        )
      }
    </div >
  )
}