import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {applyMiddleware, combineReducers, createStore} from 'redux';

import ReduxThunk from 'redux-thunk';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import App from './App';
import * as serviceWorker from './serviceWorker';

import HomeScreen from './screens/HomeScreen';
import AddPostScreen from './screens/AddPostScreen';
import UserScreen from './screens/UserScreen';
import { postReducer } from './store/reducers/posts';
import { authReducer } from './store/reducers/auth';
import { Provider } from 'react-redux';
import AuthScreen from './screens/AuthScreen';

const store = createStore(combineReducers({
  posts: postReducer,
  auth: authReducer
}), {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/new-post" component={AddPostScreen} />
          <Route path="/login" component={AuthScreen} />
          <Route path="/profile" component={UserScreen} />
        </Switch>
      </App>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
