import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Root from './router/index';
import registerServiceWorker from './registerServiceWorker';
import './assets/iconfont/iconfont'
import './assets/js/common'

// css
import './scss/normalize.scss';
import './assets/css/antd.css'
import './index.scss'

import { createStore } from 'redux'
import rootReducer from './redux/reducers'

const store = createStore(rootReducer)


window.requestHost = process.env.NODE_ENV === 'development' ? 'http://localhost:8083' : 'https://api.lcddjm.com';

ReactDOM.render(
    <Root store={store}/>
    ,document.getElementById('root'));
registerServiceWorker();
