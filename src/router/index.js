import React from 'react';

import { Router,Switch,Route} from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import asyncComponent from '../components/AsyncComponent'

const Index = asyncComponent(() => import("../pages/index"))
const Signin = asyncComponent(() => import("../pages/signin"))
const Signup = asyncComponent(() => import("../pages/signup"))
const NotFind = asyncComponent(() => import("../pages/notFind"))

const history = createBrowserHistory()

const RouterConfig = (
    <Router  history={history}>
        <Switch>
            <Route exact path="/" component={Index}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>            
            <Route path='*' exact={true} component={NotFind} />
        </Switch>
    </Router>
)

export default () => (RouterConfig);
//参考：https://stackoverflow.com/questions/34130539/uncaught-error-invariant-violation-element-type-is-invalid-expected-a-string
