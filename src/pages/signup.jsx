import React, { Component } from 'react'
import styles from '../scss/signup.scss';
import CSSModules from 'react-css-modules';
class Signup extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            password: '',
            repassword: '',
            intro: '',
            avatar: ''
        }

        this.changeHandler = this.changeHandler.bind(this);

    }

    changeHandler(e){
        this.setState({
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    signup(){
        let {
            name,
            password,
            intro,
            avatar
        } = this.state;

    }


    render(){
        return (
            <div styleName="signup-wrap">
                <div styleName="signup">
                    <div styleName="avatar">
                        {/* <svg v-if="!signupData.avatar" styleName="icon" aria-hidden="true">
                            <use xlink:href="#icon-xiugaigerentouxiang-"></use>
                        </svg>
                        <img v-else :src="signupData.avatar" alt="">
                        <input type="file" @change="cropAvatar" title="上传喜欢的头像"> */}
                    </div>
                    <div className="username">
                        <div styleName="l">昵称</div>
                        <div styleName="r">
                            <input type="text" value={this.state.name} placeholder="请输入昵称" name="name" onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div >
                        <div styleName="l">密码</div>
                        <div styleName="r">
                            <input type="password" value={this.state.password} name="password" placeholder="请输入密码，6-10位" onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div>
                        <div styleName="l">确认密码</div>
                        <div styleName="r">
                            <input type="password" value={this.state.repassword} name="repassword" placeholder="请再次输入密码" onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div styleName="intro">
                        <div styleName="l">简介</div>
                        <div styleName="r">
                            <textarea name="intro" value={this.state.intro} max-length="100" placeholder="简单介绍一下～不要超过100字哦" onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div styleName="confirm" onClick={this.signup}>注册</div>
                </div>
            </div> 
        )
    }
}

export default CSSModules(Signup,styles);