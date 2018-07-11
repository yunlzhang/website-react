import React,{Component} from 'react';

import { Alert } from 'antd';


import asyncComponent from '../components/AsyncComponent'
import Header from '../components/header';

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'

import {fetchUserInfo} from '../redux/actions/login';
import {alert,close} from '../redux/actions/msg';


import { autobind } from 'core-decorators';
import {connect} from 'react-redux'
const Index = asyncComponent(() => import("../pages/index"))
const Signin = asyncComponent(() => import("../pages/signin"))
const Signup = asyncComponent(() => import("../pages/signup"))
const NotFind = asyncComponent(() => import("../pages/notFind"))
const Detail = asyncComponent(() => import("../pages/detail"))
const Edit = asyncComponent(() => import("../pages/edit"));



const mapStateToProps = state => {
    return {
        msg:state.msg
    };
};
const mapDispatchToProps = {
    fetchUserInfo,
    alert,
    close
};

@connect(mapStateToProps,mapDispatchToProps)
@autobind
class App extends Component{
    // constructor(props){
    //     super(props);
    // }
    componentDidMount(){
        this.props.fetchUserInfo();
    }

    render(){
        let {store,msg,close} = this.props;
        return(
            <Provider store={store}>
                <Router >
                    <div className="root-wrap">
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={Index}/>
                            <Route path="/signin" component={Signin}/>
                            <Route path="/signup" component={Signup}/>  
                            <Route path="/article/:id" component={Detail}/> 
                            <Route path="/edit/:id?" component={Edit}/>           
                            <Route path='*' exact={true} component={NotFind} />
                        </Switch>
                        {
                            msg.type && <Alert type={msg.type} message={msg.text} banner closable onClose={close}/>
                        }
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;
//参考：https://stackoverflow.com/questions/34130539/uncaught-error-invariant-violation-element-type-is-invalid-expected-a-string
