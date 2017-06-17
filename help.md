# Help for React + Redux Bookstore App
Check out the [README](README.md) for set up guide.

## React Redux Workflow
Below is the typical flow for react-redux apps

### Create Components with Routing
* Add the UI/Presentation/Stateless components, `Home`, `About` in the `src/components/common` folder and `BookPage` in the `src/components/book` folder.
* Create a root component, `App` in the `src/components` folder. This is also a UI component that renders the child pages above.
* Create the `src/routes.js` file to specify the handling of all the routes.
* Wrap the routes in the react-router's `Router` component and import any global files such as Bootstrap CSS:
```js
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
  <Router routes={routes} history={browserHistory} />, document.getElementById('app')
);
```  

### Create Relevant Actions
Actions are object payloads that are identified by a required property `type`.
* Add the `src/actions/bookActions.js` file and include the contents:
```js
export const createBook = (book) => {
  return {
    type: 'CREATE_BOOK',
    book: book
  }
};
```
This action is ready to be dispatched by the store. We now create the reducer that updates the store first.

### Create Reducers for the Actions
Reducers are used to update the state object in the store. It takes in a state and an action and returns a new state.
* Add the `src/reducers/bookReducers.js` file and include the code:
```js
export default ( state = [], action ) => {
  switch ( action.type ) {
    case 'CREATE_BOOK':
      //state.push(action.book);
      //break;
      /* In order to update the state without mutating it, we create another array of data
      and update its content with the previous state and the new changes made. */ 
      return [
        ...state,
        Object.assign({}, action.book)
      ];
      //The spread operator just pours out the content on the array into the new array
    default:
      return state;
  }
}
```
When the store dispatches an action, all the reducers are called, and the switch statement determines which action to perform.

### Combine All Reducers
Because Reducers cannot stand alone, they have to be put together (combined) and passed as one to the store through the `root reducer`.
* In the `src/reducers/index.js` file, import the reducers:
```js
// Set up your root reducer here...
import { combineReducers } from 'redux';
import books from './bookReducers';

export default combineReducers({
  books
});
```

### Configure the Store with `createStore`
We create and configure the store with the root reducer, the initial state and middleware if any.
* In the `src/store/configureStore.js` file, replace the contents with:
```js
import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
```
The `createStore` method is wrapped in an exported function `configureStore` which we will later use to configure provider.

### Provide store to root component
The `Provider` component from `react-redux` provides provides the Redux store's API methods such as `store.dispatch()`, `store.subscribe()` and `store.getState()`. 

All we have to do now is to wrap our entry point component in `src/index.js` with the `Provider`:
```js
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();

render(
  <Provider store={store} >
    <Router routes={routes} history={browserHistory} />
  </Provider>, 
  document.getElementById('app')
);
```

### Connect Container to Redux with `connect()`
We need to pass down the states to our components' props, same goes with the actions.

Best practice demands that we do this in container components while convention demands that we use `mapStateToProps` for states and `mapDispatchToProps` for actions.

We update the `BookPage` container component as follows:
```js
import React from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';

class Book extends React.Component {
  constructor(props) {
    super(props);
  }

  submitBook(input) {
    this.props.createBook(input);
  }

  render() {
    let titleInput;

    return (
      <div>
        <h3>Books</h3>
        <ul>
          {}
          {this.props.books.map( (b, i) => <li key={i}> {b.title} </li> )}
        </ul>
        <div>
          <h3>Book Form</h3>
          <form onSubmit={ e => { 
            e.preventDefault(); 
            var input = { title: titleInput.value };
            this.submitBook(input);
            e.target.reset();  
          }}>
            <input type="text" name="title" ref={node => titleInput = node} />
            <input type="submit" />
          </form>
        </div>      
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBook: book => dispatch(bookActions.createBook(book))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book);
```

`mapStateToProps` now makes it possible to access the books state with `this.props.books`.

`mapDispatchToProps` also returns an object for the respective dispatched actions. The values are functions which will be called when the actions are dispatched. 

The `connect` method now takes in these 2 functions and returns another functions. The returned function is now
passed in the container component. 

## Async Requests with Thunk
Redux Thunk is a middle ware for handling async requests in a React Redux environment.

### Setup Redux Thunk
This is as easy as adding updating the `src/store/configureStore.js` as follows:
```js
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
```

### Thunk Basics
For our `bookActions.js` file, we will have synchronous and async actions. 
* An *action creator* is a function that creates an action - either sync or async.
* Each async action creator returns a `dispatcher` function that must return a promise. The promise when resolved, dispatches a synchronous action to handle the data that was returned.
```bash
npm install axios --save
```
The `src/actions/bookActions.js` file now becomes:
```js
import Axios from 'axios';

// API URL
const apiUrl = 'http://59453bfccf46400011a81298.mockapi.io/api/book';

// Sync Action
export const fetchBooksSuccess = (books) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    books
  }
};

//Async Action
export const fetchBooks = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(apiUrl)
      .then(response => {
        // Dispatch another action to consume data
        dispatch(fetchBooksSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
```
Note that *_SUCCESS* is appended to *FETCH_BOOKS* to indicate that the books were retrieved successfully. To handle other use cases such as errors, we can dispatch *FETCH_BOOKS_ERROR* in the error callback or *FETCH_BOOKS_LOADING* before the request to indicate an ongoing request.

* Update the reducer to handle the new async action
* To start the application with some state, we dispatch the `FETCH_BOOKS` action on page load in the `src/index.js` file:
```js
import * as bookActions from './actions/bookActions';

const store = configureStore();
store.dispatch(bookActions.fetchBooks());
```

We basically repeat this process for other actions and reducers. Check out [this commit] for the final implementation of the app.  