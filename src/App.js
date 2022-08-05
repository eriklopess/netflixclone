import React, { useEffect, useState } from "react";
import getHomeList, { getMovieInfo } from "./api";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import Loading from "./loading.svg";
import "./App.css";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [showHeader, setShowHeader] = useState(false);
  useEffect(() => {
    const loadAll = async () => {
      const list = await getHomeList();
      setMovieList(list);

      const originals = list.filter((i) => i.slug === "originals");
      const randomChoice = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      const chosen = originals[0].items.results[randomChoice];
      const chosenInfo = await getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  return (
    <div className="page">
      {movieList.length === 0 ? (
        <div className="loading">
          <img src={Loading} alt="loading" />
        </div>
      ) : (
        <>
          <Header showHeader={showHeader} />
          {featuredData && <FeaturedMovie item={featuredData} />}

          <section className="lists">
            {movieList.map((item, key) => (
              <MovieRow key={key} movie={item} />
            ))}
          </section>

          <footer>
            <span>
              Feito por <a href="https://github.com/eriklopess">Erik Lopes</a>
            </span>
          </footer>
        </>
      )}
    </div>
  );
}
