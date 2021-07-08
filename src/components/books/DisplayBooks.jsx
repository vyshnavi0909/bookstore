import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import bookImage from "./bookImage.png";
import "./DisplayBooks.css";
import UserService from "../../services/UserServices";

const services = new UserService();
export default function DisplayBooks(props) {
  const booksList = props.books;
  const [cartBooks, setCartBooks] = useState();
  const [pager, setPager] = useState({
    books: booksList,
    currentPage: 1,
    booksPerPage: 6,
  });

  const { books, currentPage, booksPerPage } = pager;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNum.push(i);
  }

  const handleClick = useCallback((e) => {
    setPager({ ...pager, currentPage: Number(e.target.id) });
  }, []);

  const renderPageNums = pageNum.map((num) => {
    return (
      <li key={num} id={num} className="each-page-num" onClick={handleClick}>
        {num}
      </li>
    );
  });

  const addBookToCart = (productid) => {
    services
      .addToCart(productid)
      .then((res) => {
        getCartItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCartItems = () => {
    services
      .getFromCart()
      .then((res) => {
        setCartBooks(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isPresent = (cartbook, id) => {
    if (cartbook !== undefined) {
      var count = cartbook.length;
      for (var i = 0; i < count; i++) {
        if (cartbook[i].product_id._id === id) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleButton = (item_id) => {
    var present = isPresent(cartBooks, item_id);
    var btn;
    if (present) {
      btn = (
        <div className="btn-after-clicked">
          <Button
            style={{
              backgroundColor: "#1976df",
              color: "#ffffff",
              width: "100%",
            }}
          >
            Added to bag
          </Button>
        </div>
      );
    } else {
      btn = (
        <div className="book-btns">
          <Button
            style={{
              backgroundColor: "#A03037",
              color: "#ffffff",
              padding: "5px",
              width: "49%",
            }}
            className="add-to-bag-btn"
          >
            Add To Bag
          </Button>
          <Button
            style={{
              border: "1px solid #000000",
              padding: "5px",
              width: "49%",
            }}
            className="wishlist-btn"
          >
            WishList
          </Button>
        </div>
      );
    }
    return btn;
  };

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
        {currentBooks.map((book, index) => (
          <div className="single-book-container" key={index}>
            <Card
              style={{
                border: "1px solid #E2E2E2",
                boxShadow: "none",
                borderRadius: "6px",
              }}
            >
              <CardContent style={{ padding: "0" }}>
                <div className="book-image">
                  <img className="image" src={bookImage} alt="book" />
                </div>
                <div className="book-div">
                  <h3 className="book-name">{book.bookName}</h3>
                  <p className="book-author">by {book.author}</p>
                  <h3 className="book-price">Rs. {book.price}</h3>
                  <div onClick={() => addBookToCart(book._id)}>
                    {handleButton(book._id)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <ul className="page-number">{renderPageNums}</ul>
    </div>
  );
}
