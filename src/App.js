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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      const fetchedMovieList = await getHomeList();
      return setMovieList(fetchedMovieList);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const findFeatured = async () => {
      console.log(movieList);
      const originals = movieList.find((i) => i.slug === "originals");
      const randomChoice = Math.floor(Math.random() * 19);
      const chosen = originals.items.results[randomChoice];
      const chosenInfo = await getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    
    if (movieList.length > 0) {
      findFeatured();
      setLoading(false);
    }
  }, [movieList]);


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
      {loading ? (
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
