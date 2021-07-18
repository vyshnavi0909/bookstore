import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Fade,
  Paper,
  Popper,
} from "@material-ui/core";
import bookImage from "./bookImage.png";
import "./DisplayBooks.css";
import UserService from "../../services/UserServices";
import prevLogo from "./prev.svg";
import nextLogo from "./next.svg";
import { useContext } from "react";
import BookstoreContext from "../context-files/Context";

const services = new UserService();
export default function DisplayBooks(props) {
  const { getCartItems, cartBooks } = useContext(BookstoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [wishlist, setWishlist] = useState();
  const [booksList, setBooks] = useState(props.books);
  const [pager, setPager] = useState({
    books: booksList,
    currentPage: 1,
    booksPerPage: 8,
    active: 1,
  });

  const { books, currentPage, booksPerPage, active } = pager;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const pageNum = [];
  const maxPage = Math.ceil(books.length / booksPerPage);
  for (let i = 1; i <= maxPage; i++) {
    var page = i;
    if (i === currentPage) {
      page = <span className="active-page"> {i}</span>;
    }
    pageNum.push(page);
  }

  const handleClick = useCallback((e) => {
    setPager({
      ...pager,
      currentPage: Number(e.target.id),
    });
  }, []);

  const renderPageNums = pageNum.map((num) => {
    return (
      <li key={num} id={num} className="each-page-num" onClick={handleClick}>
        {num}
      </li>
    );
  });

  const next = () => {
    setPager({ ...pager, currentPage: Math.min(currentPage + 1, maxPage) });
  };

  const prev = () => {
    setPager({ ...pager, currentPage: Math.max(currentPage - 1, 1) });
  };

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

  // const getCartItems = () => {
  //   services
  //     .getFromCart()
  //     .then((res) => {
  //       setCartBooks(res.data.result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleDescOnHover = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleOnLeave = (e) => {
    setOpen(false);
  };

  const addToWishlist = (book) => {
    services.addToWishList(book._id).then((res) => {
      console.log(res);
      getWishList();
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

  const isInWishlist = (wishlist, id) => {
    if (wishlist !== undefined) {
      for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].product_id._id === id) {
          return true;
        }
      }
    }
    return false;
  };

  const handleButton = (book) => {
    var present = isPresent(cartBooks, book._id);
    var inWishlist = isInWishlist(wishlist, book._id);
    var btn;

    if (present) {
      btn = (
        <div className="btn-after-clicked">
          <Button
            style={{
              backgroundColor: "#1976df",
              color: "#ffffff",
              width: "100%",
              fontSize: "small",
            }}
          >
            Added to bag
          </Button>
        </div>
      );
    } else if (inWishlist) {
      btn = (
        <div className="btn-after-clicked">
          <Button
            style={{
              width: "100%",
              backgroundColor: "#cf4141",
              color: "#fff",
              fontSize: "small",
            }}
          >
            Added to Wishlist
          </Button>
        </div>
      );
    } else if (book.quantity <= 1) {
      btn = (
        <div>
          <Button
            style={{
              border: "1px solid #000000",
              padding: "5px",
              width: "100%",
              fontSize: "small",
            }}
            className="wishlist-btn"
            onClick={() => addToWishlist(book)}
          >
            WishList
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
              fontSize: "x-small",
            }}
            className="add-to-bag-btn"
            onClick={() => addBookToCart(book._id)}
          >
            Add To Bag
          </Button>
          <Button
            style={{
              border: "1px solid #000000",
              padding: "5px",
              width: "49%",
              fontSize: "x-small",
            }}
            className="wishlist-btn"
            onClick={() => addToWishlist(book)}
          >
            WishList
          </Button>
        </div>
      );
    }
    return btn;
  };

  const handleOutOfStock = (book) => {
    let bookQuantity = book.quantity;
    if (bookQuantity <= 1) {
      return <div className="out-of-stock">OUT OF STOCK</div>;
    }
  };

  const ifOutOfStock = (book) => {
    if (book.quantity <= 1) {
      return <div className="if-out-of-stock"></div>;
    }
  };

  const handleSelector = (e) => {
    let val = e.target.value;
    switch (val) {
      case "ztoa":
        handleZToA();
        break;
      case "atoz":
        handleAToZ();
        break;
      case "ltoh":
        lowToHigh();
        break;
      case "htol":
        highToLow();
        break;
      default:
        console.log("invalid");
    }
  };

  const lowToHigh = () => {
    var ltoh = booksList.sort((a, b) => a.price - b.price);
    setBooks(ltoh);
  };

  const highToLow = () => {
    var htol = booksList.sort((a, b) => a.price - b.price).reverse();
    setBooks(htol);
  };

  const handleZToA = () => {
    var atoz = booksList.sort((a, b) => a.bookName.localeCompare(b.bookName));
    var ztoa = atoz.reverse();
    setBooks(ztoa);
  };

  const handleAToZ = () => {
    var atoz = booksList.sort((a, b) => a.bookName.localeCompare(b.bookName));
    setBooks(atoz);
  };

  const getWishList = () => {
    services
      .getFromWishList()
      .then((res) => {
        console.log(res);
        setWishlist(res.data.result);
      })
      .catch((err) => {
        console.log("get wl", err);
      });
  };

  useEffect(() => {
    getCartItems();
    getWishList();
  }, []);

  return (
    <div className="whole-div">
      <div className="display-books-header">
        <div className="header-text-div">
          <h2 className="header-text">Books</h2>
          <p className="header-tag">(128 items)</p>
        </div>
        <select
          className="sort-by-rel"
          name="sortBy"
          id="sortBy"
          placeholder="Sort by relevance"
          onChange={handleSelector}
        >
          <option>Sort By Relevance</option>
          <option value="atoz">Alphabetical: A to Z</option>
          <option value="ztoa">Alphabetical: Z to A</option>
          <option value="ltoh">Price: Low to High</option>
          <option value="htol">Price: High to Low</option>
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
              <CardContent style={{ padding: "0", position: "relative" }}>
                {ifOutOfStock(book)}
                <div
                  className="book-image"
                  onMouseOver={handleDescOnHover}
                  onMouseOut={handleOnLeave}
                >
                  <img className="image" src={bookImage} alt="book" />
                </div>
                {handleOutOfStock(book)}
                <div className="book-div">
                  <h3 className="book-name">{book.bookName}</h3>
                  <p className="book-author">by {book.author}</p>
                  <h3 className="book-price">Rs. {book.price}</h3>
                  <div
                  // onClick={() => addBookToCart(book._id)}
                  >
                    {handleButton(book)}
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
        placement="right-start"
        transition
        className="popper-div"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <p className="typography-div">
                <h3 style={{ margin: 0 }}>Book Detail</h3>
                <p className="typography">
                  Lorem Ipsum is simply dummy text of the printing and
                  type-setting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It survived not only five centuries, but also
                  the leap into electronic typesetting, remaining essentially
                  unchanged.It's just a dummy text of the printing and
                  typesetting industry.
                </p>
                <p className="typography">
                  Lorem Ipsum is simply dummy text of printing and type-setting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since 1500s, when an unknown printer took galley of
                  type and scrambled it to make a type specimen book. It
                  survived not only five centuries, but also leap into
                  electronic typesetting, remaining are essentially unchanged.
                  It's just a dummy text of printing and typesetting industry.
                </p>
              </p>
            </Paper>
          </Fade>
        )}
      </Popper>
      <ul className="page-number">
        <span onClick={prev}>
          <img src={prevLogo} alt="prev" />
        </span>
        {renderPageNums}
        <span onClick={next}>
          <img src={nextLogo} alt="next" />
        </span>
      </ul>
    </div>
  );
}
