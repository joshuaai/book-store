import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Home from './components/common/Home';
import About from './components/common/About';
import Book from './components/book/Book';
import App from './components/App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/books" component={Book} />
  </Route>
);