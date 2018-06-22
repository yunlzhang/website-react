import React, {Component} from 'react';
import { Avatar } from 'antd';
import '../scss/signup.scss';
import {customFetch,upQiniu} from '../assets/js/common';
import uuidv1 from 'uuid/v1';
import ReactCrop , { makeAspectCrop,getPixelCrop} from 'react-image-crop';
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
            image:'',
            crop: {
                x: 10,
                y: 10,
                width: 40,
                height: 40,
                aspect:1
            }
        }

        this.signup = this.signup.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.cancelCrop = this.cancelCrop.bind(this);
        this.confirmCrop = this.confirmCrop.bind(this);

    }

    changeHandler(e) {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    cancelCrop(){
        this.setState({
            src:'',
            image:''
        })
    }
    onImageLoaded(image){
        this.setState({
            image,
            crop: makeAspectCrop({
              x: 0,
              y: 0,
              aspect:1,
              width: 40,
            }, image.width / image.height),
        });
    }

    confirmCrop(){
        this.getImgBlob().then(res =>{
            upQiniu('avatar',res).then(res => {
                let avatar = process.env.NODE_ENV === 'development' ? (window.requestHost + res.img) : 'https://image.lcddjm.com/'+res.key
                this.setState({
                    avatar,
                    src:'',
                    image:''
                })
            });
        });
    }
    async getImgBlob()  {
        function getCroppedImg(image, pixelCrop, fileName) {
            const canvas = document.createElement('canvas');
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(
              image,
              pixelCrop.x,
              pixelCrop.y,
              pixelCrop.width,
              pixelCrop.height,
              0,
              0,
              pixelCrop.width,
              pixelCrop.height
            );
          
            // As Base64 string
            // const base64Image = canvas.toDataURL('image/jpeg');
            
            
            // As a blob
            return new Promise((resolve, reject) => {
              canvas.toBlob(file => {
                file.name = fileName;
                resolve(file);
              }, 'image/jpeg');
            });
        }
        const croppedImg = await getCroppedImg(this.state.image, getPixelCrop(this.state.image,this.state.crop), 'avatar/'+uuidv1());
        return croppedImg;
    }

    signup () {
        let {name, password, intro, avatar,repassword} = this.state;

        customFetch({
            url:window.requestHost + '/signup',
            method:'POST',
            params:{
                name,
                password,
                repassword,
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
            e.target.value = '';
        }
    }

    // onCropComplete(crop){
    //     console.log(crop)
    //     // this.setState({
    //     //     crop
    //     // })
    // }

    onCropChange (crop) {
        this.setState({crop})
    }

    render() {
        return (
            <div className="signup-wrap">
                <div className="signup">
                    <div className="avatar">
                        {this.state.avatar && (
                            <img src={this.state.avatar} alt=""/>
                        )}
                        <Avatar size="large" icon="user" />
                        <input type="file" onChange={this.onSelectFile} title="选择一个你喜欢的图片当作头像吧～～"/> 
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
                {   
                    this.state.src && (
                        <div className="crop-wrap">
                            <div className="buttons">
                                <div className="confirm" onClick={this.confirmCrop}>确定</div>
                                <div className="cancel" onClick={this.cancelCrop}>取消</div>
                            </div>
                            <ReactCrop
                            src={this.state.src}
                            crop={this.state.crop}
                            onImageLoaded={this.onImageLoaded}
                            onChange={this.onCropChange}/>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Signup;