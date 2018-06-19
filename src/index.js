import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import RouterConfig from './router/index';
import registerServiceWorker from './registerServiceWorker';
import './assets/iconfont/iconfont'
import './assets/js/common'

// css
import './scss/normalize.scss';
import './assets/css/antd.css'
import './index.scss'

window.requestHost = process.env.NODE_ENV === 'development' ? 'http://localhost:8083' : 'https://api.lcddjm.com';

ReactDOM.render(<RouterConfig/>, document.getElementById('root'));
registerServiceWorker();
