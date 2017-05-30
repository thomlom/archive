import React from 'react'
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import store from './store';
import {Provider} from 'react-redux';


render(
  <Provider store={store}>
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/signin" component={Signin}/>
      <Route path="/signup" component={Signup}/>
    </div>
  </Router>
</Provider>, document.getElementById('root'))
