import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./styles/App.css";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Album from "./components/Album";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="ui container">
          <nav className="ui fixed borderless inverted menu">
            <Link className="item" to="/">
              <img
                id="logo"
                className="logo"
                src={require("./styles/img/bloc_jams_logo.png")}
                alt="Bloc Jams logo"
              />
            </Link>
            <Link className="item" to="/library">
              Library
            </Link>
            <Link className="item" to="/album">
              Album
            </Link>
            <div className="right menu">
            <Link className="item" to="/log-in">
              Log In
            </Link>
            <Link className="item" to="/sign-up">
              Sign Up
            </Link>

             
            </div>
          </nav>
        </header>

        <header>Bloc Jams</header>

        <nav />

        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
