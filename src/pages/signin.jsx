import React, { Component } from 'react';
import {customFetch} from '../assets/js/common';
import CSSModules from 'react-css-modules';

import styles from '../scss/signin.scss';


class Signin extends Component{
    constructor(){
        super();
        this.state = {
            name:'',
            password:''
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.signin = this.signin.bind(this);
    }
    changeHandler(e){
        this.setState({
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    signin(){
        let {name,password} = this.state;
        customFetch({
            url:'//localhost:8083/signin',
            method:'POST',
            params:{
                name,
                password
            }
        })
        .then(res => {
            console.log(res);
        })
    }
    render(){
        return (
            <div  styleName="signin-wrap">
                <div styleName="signin">
                    <div >
                        <div styleName="l">昵称</div>
                        <div styleName="r"><input type="text" name="name" placeholder="请输入昵称" value={this.state.name} onChange={this.changeHandler}/></div>
                    </div>
                    <div >
                        <div styleName="l">密码</div>
                        <div styleName="r"><input type="password" name="password" placeholder="请输入密码，6-10位" value={this.state.password} onChange={this.changeHandler}/></div>
                    </div>
                    <div styleName="confirm"  onClick={this.signin}>登陆</div>
                    <div styleName="go-register">没有账号？<router-link to="/signup">去注册</router-link></div>
                </div>
            </div>
        )

    }
}

export default CSSModules(Signin,styles);