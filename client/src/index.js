import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Reducers
import { upcomingGames } from './reducers';

// Store
const store = createStore(upcomingGames);

// App Components
import App from './components/App.js';

// Render
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
