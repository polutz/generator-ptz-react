import createHashHistory from 'history/lib/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import Router from 'react-router/lib/Router';
import useRouterHistory from 'react-router/lib/useRouterHistory';

import graphqlServerUrl from './graphqlServerUrl';
import UserReport from './users/components/UserReport';

import routes from './routes';

console.log('Hello index.tsx');

// Connects to a Graphql Server in a diferent domain
Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(graphqlServerUrl)
);

const history = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
    <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store}
    />,
    document.getElementById('app')
);
