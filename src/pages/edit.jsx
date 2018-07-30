import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../scss/edit.scss';


import Editor from '../components/editor'
import '../assets/css/hint.css'


class Edit extends Component{
    render(){
        return (
            <Editor/>
        )
    }
}

export default  withRouter(Edit);;