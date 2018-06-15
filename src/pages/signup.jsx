import React, {Component} from 'react';
import '../scss/signup.scss';
import {customFetch} from '../assets/js/common';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            repassword: '',
            intro: '',
            avatar: '',
            src: null,
            crop: {
                x: 10,
                y: 10,
                width: 80,
                height: 80
            }
        }

        this.signup = this.signup.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        
    }

    changeHandler(e) {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    signup () {
        let {name, password, intro, avatar} = this.state;

        customFetch({
            url:'//localhost:8083/signup',
            method:'POST',
            params:{
                name,
                password,
                intro,
                avatar
            }
        })
        .then(res => {
            console.log(res);
        })
    }

    onSelectFile (e){
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener(
                'load',
                () => this.setState({src: reader.result}),
                false
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    onImageLoaded (image){
        console.log('onCropComplete', image)
    }

    onCropComplete(crop){
        console.log('onCropComplete', crop)
    }

    onCropChange (crop) {
        this.setState({crop})
    }

    render() {
        return (
            <div className="signup-wrap">
                <div className="signup">
                    <div className="avatar">
                        <input type="file" onChange={this.onSelectFile}/> {
                            this.state.src && (
                                <ReactCrop
                                    src={this.state.src}
                                    crop={this.state.crop}
                                    onImageLoaded={this.onImageLoaded}
                                    onComplete={this.onCropComplete}
                                    onChange={this.onCropChange}/>
                            )
                        }
                    </div>
                    <div className="username">
                        <div className="l">昵称</div>
                        <div className="r">
                            <input
                                type="text"
                                value={this.state.name}
                                placeholder="请输入昵称"
                                name="name"
                                onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div >
                        <div className="l">密码</div>
                        <div className="r">
                            <input
                                type="password"
                                value={this.state.password}
                                name="password"
                                placeholder="请输入密码，6-10位"
                                onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div>
                        <div className="l">确认密码</div>
                        <div className="r">
                            <input
                                type="password"
                                value={this.state.repassword}
                                name="repassword"
                                placeholder="请再次输入密码"
                                onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div className="intro">
                        <div className="l">简介</div>
                        <div className="r">
                            <textarea
                                name="intro"
                                value={this.state.intro}
                                max-length="100"
                                placeholder="简单介绍一下～不要超过100字哦"
                                onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div className="confirm" onClick={this.signup}>注册</div>
                </div>
                {/* <ReactCrop src="path/to/image.jpg" /> */}
            </div>
        )
    }
}

export default Signup;