import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


ReactDOM.render(
 
    <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
