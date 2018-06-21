import React, { Component } from 'react'

class Skeleton extends Component{

    render(){
        return (
            <li className="article-item skeleton">
                <div className="title skeleton-child">&nbsp;</div>
                <div className="des">
                    <p className="skeleton-child">&nbsp;</p>
                    <p className="skeleton-child">&nbsp;</p>
                </div> 
                <div className="create">
                    <span className="skeleton-child">                                             </span> 
                    <span className="skeleton-child">                                 </span>
                    <span className="skeleton-child">                              </span>
                    <span className="skeleton-child">                     </span>
                </div>
            </li>
        )
        
    }
}


export default Skeleton;