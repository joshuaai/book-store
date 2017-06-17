import * as actionTypes from '../actions/actionTypes';

export const booksReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_BOOK_SUCCESS:
      return [
        ...state, Object.assign({}, action.book)
      ];
    case actionTypes.FETCH_BOOKS_SUCCESS:
      return action.books;
    default:
      return state;
  }
}

export const bookReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOK_BY_ID_SUCCESS:
      return action.book;
    default:
      return state;
  }
};