import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>Bloc Jams</header>
        <nav>
          <Link to="/">Landing</Link>
          <Link to="/library">Library</Link>
        </nav>
        <main>
          <Route exact path='/' component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="album" component={Album}></Route>

        </main>
      </div>
    );
  }
}

export default App;
