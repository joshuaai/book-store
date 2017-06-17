# Help for React + Redux Bookstore App
Check our the [README](README.md) for set up guide. This project also has a [help file](help.md).

## React Redux Workflow
Below is the typical flow for react-redux apps

### Create Components with Routing
* Add the UI/Presentation/Stateless components, `Home`, `About` in the `src/components/common` folder and `Book` folder.
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
* In the `src/reducers/index.js` file, import the reducers:
```js
// Set up your root reducer here...
import { combineReducers } from 'redux';
import books from './bookReducers';

export default combineReducers({
  books
});
```
When the store dispatches an action, all the reducers are called, and the switch statement determines which action to perform.

4. Combine All Reducers
5. Configure the Store with `createStore`
6. Provide store to root component
7. Connect Container to Redux with `connect()`
