import React from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import bookImage from "./bookImage.png";
import "./DisplayBooks.css";
// import Pagination from "@material-ui/lab/Pagination/";

export default function DisplayBooks(props) {
  const booksList = props.books;
  return (
    <div>
      <div className="display-books-header">
        <div className="header-text-div">
          <h2 className="header-text">Books</h2>
          <p className="header-tag">(128 items)</p>
        </div>
        <select name="sortBy" id="sortBy">
          <option>Sort by relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest Arrivals</option>
        </select>
      </div>
      <div className="books-container">
        {booksList.map((book, index) => (
          <div className="single-book-container" key={index}>
            <Card style={{ border: "1px solid #E2E2E2", boxShadow: "none" }}>
              <CardContent style={{ padding: "0" }}>
                <div className="book-image">
                  <img src={bookImage} alt="book" />
                </div>
                <div className="book-div">
                  <h3 className="book-name">{book.bookName}</h3>
                  <p className="book-author">by {book.author}</p>
                  <h3 className="book-price">Rs. {book.price}</h3>
                  <div className="book-btns">
                    <Button
                      style={{
                        backgroundColor: "#A03037",
                        color: "#ffffff",
                        padding: "5px 10px",
                        width: "45%",
                      }}
                      className="add-to-bag-btn"
                    >
                      Add To Bag
                    </Button>
                    <Button
                      style={{
                        border: "1px solid #000000",
                        padding: "5px 15px",
                        width: "45%",
                      }}
                      className="wishlist-btn"
                    >
                      WishList
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* <div className="books-pagination">
        <Pagination count={10} color="#A03037" />
      </div> */}
    </div>
  );
}
