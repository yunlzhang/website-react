import React, { Component } from 'react';

function IsURL(str_url){
    let reg = /(http|https):\/\/.+/g
    if (reg.test(str_url)){
        return true;
    }else{
        return false;
    }
}

class InsertLink extends Component{

    constructor(){
        super();
        this.state = {
            linkText:'',
            linkValue:'',
            isActive:false
        }
    }

    onInput = (e) => {
        let type = e.target.getAttribute('data-type');
        if(type === 'text'){
            this.setState({
                linkText:e.target.value
            })
        }else{
            this.setState({
                linkAddress:e.target.value,
                isActive:IsURL(e.target.value)
            })
        }        
    }

    render(){

        return (
            <div className="insert-link-wrap">
                <div className="insert-link-inner">
                    <span className="close">&times;</span>
                    <h3>插入链接</h3>
                    <div className="link-text">
                        链接内容:
                        <input type="text" data-type="text" onInput={this.onInput}/>
                    </div>
                    <div className="link-address">
                        链接地址:
                        <input type="text" data-type="value" onInput={this.onInput}/>
                    </div>
                    <div className="buttons">
                        <div className="cancel btn">取消</div>
                        <div className={`confirm btn ${this.state.isActive ? 'active' : ''}`}>确认</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InsertLink;