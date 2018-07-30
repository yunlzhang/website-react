import React, {Component} from 'react';
import {withRouter,Link} from 'react-router-dom';

import '../scss/header.scss'

import '../scss/signin.scss';

import { autobind } from 'core-decorators';
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return state;
};

@connect(mapStateToProps)
@autobind
class Header extends Component {
    render() {
        let {loginInfo} = this.props;
        let userInfo = loginInfo.userInfo || {};
        let isloginIn = !!userInfo._id;
        let {path} = this.props.match;
        let active;
        let hasEditRight = userInfo.right === 1000;
        switch(path){
            case '/':
                active = 'index'
                break;
            case '/edit':
                active = 'edit';
                break;
            default :;
        }

        return (
            <header ref="nav">
                <ul className="nav-inner">
                    <li className={active === 'index' ? 'active' : ''}><Link to="/">blog</Link></li>
                    {/* <li className="active === 'life' ? 'active' : ''"><a href="//hobby.lcddjm.com">hobby</a></li> */}
                    {hasEditRight && <li className={active === 'edit' ? 'active' : ''}><Link to="/edit">edit</Link></li>}
                    <li className={active === 'about' ? 'active' : ''}><Link to="/about">about</Link></li>            
                </ul>
            <div className="right">
                <div className="search" >
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-search"></use>
                    </svg>    
                </div>
                {
                    isloginIn ? 
                        <div className="user" >
                            <span className="avatar" ><img src={userInfo.avatar} alt=""/></span>
                            {/* <User :userInfo="userInfo" ref="userInfo"></User> */}
                        </div>
                        :
                        <div className="nologin">
                            <Link to="/signup">注册</Link> |
                            <Link to="/signin">登陆</Link>                
                        </div>
                }
                
                
            </div>
        </header>
        )
    }
}

export default withRouter(Header);