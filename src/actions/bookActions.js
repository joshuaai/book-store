import Axios from 'axios';
import * as actionTypes from './actionTypes';

// API URL
const apiUrl = 'http://59453bfccf46400011a81298.mockapi.io/api/book';

// Sync Actions
export const fetchBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    books
  };
};

export const createBookSuccess = (book) => {
  return {
    type: actionTypes.CREATE_BOOK_SUCCESS,
    book
  };
};

export const fetchBookByIdSuccess = (book) => {
  return {
    type: actionTypes.FETCH_BOOK_BY_ID_SUCCESS,
    book
  };
};

export const addToCartSuccess = (item) => {
  return {
    type: 'ADD_TO_CART_SUCCESS',
    item
  };
};

export const fetchCartSuccess = (items) => {
  return {
    type: 'FETCH_CART_SUCCESS',
    items
  };
};

// Async Actions
export const fetchBooks = () => {
  return (dispatch) => {
    // Returns a promise
    return Axios.get(apiUrl)
      .then(response => {
        dispatch(fetchBooksSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createBook = (book) => {
  return (dispatch) => {
    return Axios.post(apiUrl, book)
      .then(response => {
        dispatch(createBookSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchBookById = (bookId) => {
  return (dispatch) => {
    return Axios.get(apiUrl + '/' + bookId)
      .then(response => {
        dispatch(fetchBookByIdSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const addToCart = (item) => {
  return (dispatch) => {
    return Axios.post('http://59453bfccf46400011a81298.mockapi.io/api/cart', item)
      .then(response => {
        dispatch(addToCartSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchCart = () => {
  return (dispatch) => {
    return Axios.get('http://59453bfccf46400011a81298.mockapi.io/api/cart')
      .then(response => {
        dispatch(fetchCartSuccess(response.data));
      })
      .catch(error => {
        throw(error);
      });
  };
};