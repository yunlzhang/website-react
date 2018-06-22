import React from 'react';

import asyncComponent from '../components/AsyncComponent'

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'


const Index = asyncComponent(() => import("../pages/index"))
const Signin = asyncComponent(() => import("../pages/signin"))
const Signup = asyncComponent(() => import("../pages/signup"))
const NotFind = asyncComponent(() => import("../pages/notFind"))
const Detail = asyncComponent(() => import("../pages/detail"))

const Root = ({store})=> (
    <Provider store={store}>
        <Router >
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>  
                <Route path="/article/:id" component={Detail}/>          
                <Route path='*' exact={true} component={NotFind} />
            </Switch>
        </Router>
    </Provider>
)

export default Root;
//参考：https://stackoverflow.com/questions/34130539/uncaught-error-invariant-violation-element-type-is-invalid-expected-a-string
