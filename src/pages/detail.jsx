import React, {Component} from 'react';
import {customFetch} from '../assets/js/common';
import '../scss/detail.scss';

class Detail extends Component {
    constructor(props){
        super(props);

        this.state = {
            articleData:{},
            previous:'',
            next:'',
        }
    }

    componentWillMount(){
        customFetch({
            url:window.requestHost + '/article/get_article_detail',
            params:{
                _id:this.props.match.params.id
            }
        })
        .then(res => {
            console.log(res);
        })
        console.log(this.props.match.params);
    }


    render() {
        return (
            <div className="article-wrap">
                <div className="title">{this.state.articleData.title}</div>
                <div className="cover"><img src={this.state.articleData.cover} alt=""/></div>
                <div className="content rich-text ql-editor"></div>
                <div className="previous-next" v-if="previous || next">
                    <div className="previous" v-if="previous">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-pageup"></use>
                        </svg>
                        上一篇 {this.state.previous.title}
                    </div>
                    <div className="next" v-if="next">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-pagedown"></use>
                        </svg>
                        下一篇 {this.state.next.title}
                    </div>
                </div>
            </div>
        )
    }
}


export default Detail;