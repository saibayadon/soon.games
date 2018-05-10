import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// Offline Support
OfflinePluginRuntime.install({
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate()
});

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
