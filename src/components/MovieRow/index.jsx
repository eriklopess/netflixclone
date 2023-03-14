import React, { useState } from "react";
import "./style.css";

export default function MovieRow({ movie }) {
  const { title } = movie;
  const items = movie.items.results
  const [scrollX, setScrollX] = useState(-400);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerHeight / 2);
    if (x > 0) {
      x = 0;
    }

    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerHeight / 2);
    const listWidth = items.length * 157;
    if (window.innerWidth - listWidth > x) {
      x = window.innerWidth - listWidth + 157;
    }
    setScrollX(x);
  };
  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow--left" onClick={handleLeftArrow}>
        {"<"}
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        {">"}
      </div>
      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.length * 150,
          }}
        >
          {items.length > 0 &&
            items.map((item, key) => (
              <div className="movieRow--item" key={key}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={`item.name`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
