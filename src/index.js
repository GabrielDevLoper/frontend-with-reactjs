import React from 'react';
import ReactDOM from 'react-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';

import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
