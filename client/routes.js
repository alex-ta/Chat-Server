import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Login from './components/App/Auth/Login';
import Register from './components/App/Auth/Register';
import Home from './components/App/Home';
import Api from './components/App/Api/ChatroomApi'
import requireAuth from './components/requireAuth';

export default(
  <Route path='/' component={App}>
    <IndexRoute component={requireAuth(Home)}/>
    <Route path='api' component={requireAuth(Api)}/>
    <Route path='signup' component={Register}/>
    <Route path='login' component={Login}/>
  </Route>
)

//component={requireAuth(NewEventPage)}
