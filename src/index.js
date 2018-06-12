import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import 'whatwg-fetch'

import registerServiceWorker from './registerServiceWorker';

import './assets/iconfont/iconfont'


import './assets/js/common'


// css
import './scss/normalize.scss';
import './assets/css/antd.css'
import './index.scss'






ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
