import React, {Component} from 'react';
import { Pagination } from 'antd';
import {Link} from 'react-router-dom';
import {customFetch} from '../assets/js/common';

import Header from '../components/header';
import Footer from '../components/footer';
import Skeleton from '../components/skeleton';

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

class Index extends Component{
    constructor(){
        super();

        this.state = {
            pageSize:20,
            data:[]
        }

        this.pageChange = this.pageChange.bind(this);
    }
    componentWillMount(){
        this.fetchData(0);
    }
    pageChange(page){
        this.fetchData(page-1);
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
                pageSize:res.article_length
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
                <Pagination defaultCurrent={1}  pageSize={5} total={this.state.pageSize}  onChange={this.pageChange}/>
                <Footer/>
            </div>
        )
    }
}

export default Index;