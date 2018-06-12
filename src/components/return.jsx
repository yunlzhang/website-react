import React, { Component } from 'react';


import {toggleShowReturn} from '../assets/js/common';


class ReturnTop extends Component{
    constructor(){
        super();
        this.returnTop = this.returnTop.bind(this);
    }

    componentDidMount(){
        toggleShowReturn();
    }

    returnTop(e,time=500){
        let timer = null;
        cancelAnimationFrame(timer);
        //获取当前毫秒数
        let startTime = +new Date();     
        //获取当前页面的滚动高度
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        timer = requestAnimationFrame(function func(){
            let account = time - Math.max(0,startTime - (+new Date()) + time);
            document.documentElement.scrollTop = document.body.scrollTop = account * (-scrollTop) / time + scrollTop;
            timer = requestAnimationFrame(func);
            if(account === time){
                cancelAnimationFrame(timer);
            }
        });
    }

    render(){
        return (
            <div className="return-top" onClick={this.returnTop}>
                <svg className="icon" aria-hidden="true"><use xlinkHref="#icon-fanhuidingbu1"></use></svg>
            </div>
        )
    }
}

export default ReturnTop;