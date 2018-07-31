import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../scss/edit.scss';

import CustomEditor from '../components/editor'

class Edit extends Component{

    componentDidMount(){
        // console.log(this.refs.editor.getHtml())
    }

    render(){
        return (
            <CustomEditor 
                ref="editor"
            />
        )
    }
}

export default  withRouter(Edit);;
