import React, { Component } from 'react';
import {customFetch} from '../assets/js/common';
import {withRouter,Redirect} from 'react-router-dom';
import {loginIn,loginOut} from '../redux/actions/login';

import '../scss/signin.scss';

import { autobind } from 'core-decorators';
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = {
    loginIn,
    loginOut
};

@connect(mapStateToProps,mapDispatchToProps)
@autobind
class Signin extends Component{
    constructor(){
        super();
        this.state = {
            name:'',
            password:''
        }
    }
    changeHandler(e){
        this.setState({
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    signin(){
        let {name,password} = this.state;
        let {loginIn} = this.props;
        customFetch({
            url:window.requestHost + '/signin',
            method:'POST',
            params:{
                name,
                password
            }
        })
        .then(res => {
            if(res.code === 200){
                loginIn(res.data);
            }else{
                loginOut();
            }
        })
    }
    render(){
        
        let {isLogin} = this.props.loginInfo;
        if(isLogin){
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div  className="signin-wrap">
                <div className="signin">
                    <div >
                        <div className="l">昵称</div>
                        <div className="r"><input type="text" name="name" placeholder="请输入昵称" value={this.state.name} onChange={this.changeHandler}/></div>
                    </div>
                    <div >
                        <div className="l">密码</div>
                        <div className="r"><input type="password" name="password" placeholder="请输入密码，6-10位" value={this.state.password} onChange={this.changeHandler}/></div>
                    </div>
                    <div className="confirm"  onClick={this.signin}>登陆</div>
                    <div className="go-register">没有账号？<router-link to="/signup">去注册</router-link></div>
                </div>
            </div>
        )

    }
}

export default withRouter(Signin);