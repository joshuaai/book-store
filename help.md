# Help for React + Redux Bookstore App
Check our the [README](README.md) for set up guide.

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

3. Create Reducers for the Actions
4. Combine All Reducers
5. Configure the Store with `createStore`
6. Provide store to root component
7. Connect Container to Redux with `connect()`
