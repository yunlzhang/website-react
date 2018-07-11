import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import App from './router/index';
import registerServiceWorker from './registerServiceWorker';
import './assets/iconfont/iconfont'
import './assets/js/common'

// css
import './scss/normalize.scss';
import './assets/css/antd.css';
import './assets/css/draft.css'
import './index.scss'


import { createStore , applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'


const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware, // 允许我们 dispatch() 函数
        loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
)


window.requestHost = process.env.NODE_ENV === 'development' ? 'http://localhost:8083' : 'https://api.lcddjm.com';
ReactDOM.render(
    <App store={store}/>
    ,document.getElementById('root'));
registerServiceWorker();
