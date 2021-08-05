import React, { Profiler, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DisplayBooks from "../../components/books/DisplayBooks";
import "./Home.css";
import UserServices from "../../services/UserServices";
const services = new UserServices();

export default function Home() {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState();

  //   getting books from api
  var getBooks = () => {
    services
      .getBooks()
      .then((res) => {
        let books = res.data.result;
        setBooks(books);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //similar to componentDidMount
  useEffect(() => {
    getBooks();
  }, [input]);

  const logTimes = (id, phase, actualTime, baseTime, startTime, commitTime) => {
    console.log(`${id}'s ${phase} phase:`);
    console.log(`Actual time: ${actualTime}`);
    console.log(`Base time: ${baseTime}`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
  };

  return (
    <div>
      <Profiler id="home-header-comp" onRender={logTimes}>
        <Header books={books} setInput={setInput} />
      </Profiler>
      <Profiler id="home-body-comp" onRender={logTimes}>
        <div className="home-body">
          {loading ? null : (
            <DisplayBooks books={books} getBooks={getBooks} input={input} />
          )}
        </div>
      </Profiler>
      <Profiler id="home-footer-comp" onRender={logTimes}>
        <Footer />
      </Profiler>
    </div>
  );
}
