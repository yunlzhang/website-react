import React, {Component} from 'react';
import { Pagination } from 'antd';
import {Link} from 'react-router-dom';
import {customFetch} from '../assets/js/common';
import { autobind } from 'core-decorators';
import Header from '../components/header';
import Footer from '../components/footer';
import Skeleton from '../components/skeleton';

import {connect} from 'react-redux'


import '../scss/index.scss';

function List(props){
    return (
        <li className="article-item">
            <Link to={'/article/'+ props.data._id} >
                <div className="title">
                    <span data-v-4c6a1119="">{props.data.title}</span>
                </div>
                <div className="des">{props.data.des}</div> 
                <div className="create">
                    <span >发表于 {props.data.created_at}</span> 
                    <span><svg aria-hidden="true" className="icon"><use xlinkHref="#icon-cc-tag-more"></use></svg> {props.data.tags.join()}</span>
                    <span><svg aria-hidden="true" className="icon"><use xlinkHref="#icon-iconfontpinglun"></use></svg> {props.data.comments_count}</span>
                    <span><svg aria-hidden="true" className="icon"><use xlinkHref="#icon-fangwenliang"></use></svg> {props.data.pv}</span>
                </div>
            </Link>
        </li>
    )
}

function loginInfo(store) {
    return {
        isLogin:store.userStore.isLogin
    }
}

@autobind//装饰器 参考：https://github.com/jayphelps/core-decorators
@connect(loginInfo)
class Index extends Component{
    constructor(props){
        super(props);
        console.log(this);
        this.state = {
            pageSize:20,
            data:[],
            pageIndex:0
        }

        // this.pageChange = this.pageChange;
    }
    componentWillMount(){
        this.fetchData(0);
    }
    pageChange(page){
        this.fetchData(page-1);
    }

    componentDidMount(){

        console.log(this.props)
    }

    fetchData(pageIndex){
        this.setState({
            data:[]
        })
        customFetch({
            url:window.requestHost + '/article/get_index_data',
            method:'GET',
            params:{
                num:5,
                page:pageIndex
            }
            // mode:'cors'
        })
        .then(res => {
            this.setState({
                data:res.article_data,
                pageSize:res.article_length,
                pageIndex
            })
        })

    }

    render(){

        return (
            <div>
                <Header/>
                <div className="main-wrap">
                    <ul className="article-lists">
                        {
                            this.state.data.length ? (
                                this.state.data.map((item,index) => {
                                    return <List key={index} data={item}/>
                                })
                            ) : (
                                '11111'.split('').map((item,index) => {
                                    return <Skeleton key={index}/>;
                                })
                            )
                        }
                    </ul>
                </div>
                <Pagination  current={this.state.pageIndex+1} pageSize={5} total={this.state.pageSize}  onChange={this.pageChange}/>
                <Footer/>
            </div>
        )
    }
}

export default Index;