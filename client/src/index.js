import React from 'react';
import ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import App from './components/App';

// Offline Support
OfflinePluginRuntime.install({
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
});

// Render
ReactDOM.render(<App />, document.getElementById('root'));
