import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Posts from './posts';
import Post from './post';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

// Load the Sass file
require('./style.scss');

const App = () => (
    <Switch>
        <Route exact path={CelestialSettings.path} component={Posts} />
        <Route path={CelestialSettings.path + '*'} component={Post} />
    </Switch>
);

// Routes
const routes = (
    <Router>
        <Route path="/" component={App} />
    </Router>
);

render(
    (routes), document.getElementById('app')
);