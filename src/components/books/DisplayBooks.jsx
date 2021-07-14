import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Fade,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import bookImage from "./bookImage.png";
import "./DisplayBooks.css";
import UserService from "../../services/UserServices";

const services = new UserService();
export default function DisplayBooks(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [bookDescription, setDesc] = useState("");
  const booksList = props.books;
  const [cartBooks, setCartBooks] = useState();
  const [pager, setPager] = useState({
    books: booksList,
    currentPage: 1,
    booksPerPage: 8,
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
        if (cartbook[i].product_id._id == id) {
          return true;
        }
      }
    }
    return false;
  };

  const handleDescOnHover = (e, book) => {
    if (book.description !== undefined) {
      setDesc(book.description);
    }
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleOnLeave = (e) => {
    setOpen(false);
  };

  useEffect(() => {
    getCartItems();
    console.log("useEffct");
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
          <div
            className="single-book-container"
            key={index}
            onMouseOver={(e) => handleDescOnHover(e, book)}
            onMouseOut={handleOnLeave}
          >
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
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="right"
        transition
        style={{
          boxShadow: "1px 1px 5px #888",
          width: "500px",
          height: "396.8px",
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography
                style={{
                  padding: "2px 20px",
                  textAlign: "justify",
                  boxShadow: "none",
                  height: "396.8px",
                }}
              >
                <b style={{ margin: "10px 0" }}>Book Detail</b>
                <br />
                {bookDescription}. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged.It's just a dummy text of the printing and typesetting
                industry.
                <br />
                Lorem Ipsum is simply dummy text of printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since 1500s, when an unknown printer took galley of
                type and scrambled it to make a type specimen book. It survived
                not only five centuries, but also leap into electronic
                typesetting, remaining essentially unchanged.It's just a dummy
                text of printing and typesetting industry.
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <ul className="page-number">{renderPageNums}</ul>
    </div>
  );
}
