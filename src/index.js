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


ReactDOM.render(<RouterConfig/>, document.getElementById('root'));
registerServiceWorker();
