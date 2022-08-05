import React from "react";
import "./style.css";

export default function Header({showHeader}) {
  return (
    <header className={showHeader ? 'black' : ''}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix"
          />
        </a>
      </div>
    </header>
  );
}
