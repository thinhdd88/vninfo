import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/layout';
import Home from './components/pages/home';
import PageDetail from './components/pages/pages';
import DestinationPage from './components/pages/destination';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
  			<IndexRoute component={Home}></IndexRoute>
          	<Route path="/content/:pageName" component={PageDetail}/>
          	<Route path="/destination/:slug" component={DestinationPage}/>
		</Route>
    </Router> ,
  document.getElementById('app')
);
