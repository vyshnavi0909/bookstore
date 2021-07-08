import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DisplayBooks from "../../components/books/DisplayBooks";
import UserServices from "../../services/UserServices";
import "./Home.css";

const services = new UserServices();

export default function Home() {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  //   getting books from api
  var getBooks = () => {
    services
      .getBooks()
      .then((res) => {
        let books = res.data.result;
        setBooks(books);
        setLoading(false);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //similar to componentDidMount
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <Header />
      <div className="home-body">
        {loading ? null : <DisplayBooks books={books} />}
      </div>

      <Footer />
    </div>
  );
}