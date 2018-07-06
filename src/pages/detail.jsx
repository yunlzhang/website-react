import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/footer';
import {customFetch} from '../assets/js/common';
import '../scss/detail.scss';

class Detail extends Component {
    constructor(props){
        super(props);

        this.state = {
            articleData:{},
            previous:{},
            next:{},
        }
        this.createMarkup = this.createMarkup.bind(this);
    }

    componentDidMount(){
        this.fetchData(this.props.match.params.id)
    }


    fetchData(id){
        customFetch({
            url:window.requestHost + '/article/get_article_detail',
            params:{
                _id:id
            }
        })
        .then(res => {
            let data = res.data;
            this.setState({
                articleData:data[1],
                previous:data[0],
                next:data[2],
            })
        })
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id !== this.props.match.params.id){
            this.fetchData(nextProps.match.params.id)
        }
    }

    createMarkup() {
        return {__html: this.state.articleData.content};
    }
      
    render() {
        return (
            <div>
                <div className="article-wrap">
                    <div className="title">{this.state.articleData.title}</div>
                    <div className="cover"><img src={this.state.articleData.cover} alt=""/></div>
                    <div className="content rich-text ql-editor">
                        <div dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </div>
                    <div className="previous-next" v-if="previous || next">
                        {
                            this.state.previous._id && (
                                <div className="previous" v-if="previous">
                                    <Link to={'/article/'+ this.state.previous._id}>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-pageup"></use>
                                        </svg>
                                        上一篇 {this.state.previous.title}
                                    </Link>
                                </div>
                            )
                        }
                        {
                            this.state.next._id && (
                                <div className="next" v-if="next">
                                    <Link to={'/article/'+ this.state.next._id}>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-pagedown"></use>
                                        </svg>
                                        下一篇 {this.state.next.title}
                                    </Link>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
                <Footer/>
            </div>
            
        )
    }
}


export default Detail;