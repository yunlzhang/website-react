import React,{Component} from 'react';
import {Editor, EditorState,RichUtils} from 'draft-js';
import {withRouter} from 'react-router-dom';
import '../scss/edit.scss';

import {BUTTONS} from './constant'

import '../assets/css/hint.css'

const EditorBar = (props) => {
    
    return (
        BUTTONS.map((item,index) => {
            return <button 
                className={'editor-control hint--top editor-'+item.label} 
                aria-label={item.label}
                key={index}>{item.icon ? <svg aria-hidden="true" className="icon"><use xlinkHref={'#'+item.icon}></use></svg> : item.label}</button>
        })
    )
}






class Edit extends Component{
    constructor(){
        super()
        this.state = {
            editorState: EditorState.createEmpty(),
            popData:{}
        };
    }

    onChange = (editorState) => this.setState({editorState});

    handleHover = (index,e) => {
        // if(e.target.nodeName !== 'BUTTON') return;
        let popData = {
            style:{}
        };
        let pos = e.target.getBoundingClientRect();
        if(e.type==='mouseenter'){
            popData.text = BUTTONS[index].keyOS;
            popData.style.display = 'block';
            popData.style.left = pos.left + pos.width/2;
            popData.style.top = pos.top + pos.height+10;
        }else{
            popData.style.display = 'none';
        }
        this.setState({
            popData
        })
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    toggleInlineStyle = (inlineStyle)  => (inlineStyle) =>{
        this.onChange(
          RichUtils.toggleInlineStyle(
            this.props.editorState,
            inlineStyle
          )
        );
      }

    render(){
        let {popData,editorState}  = this.state;
        return (
            <div ref="custom-editor" className="custom-draft-editor">
                <div className="editor-bar">
                    <EditorBar 
                    handleHover={this.handleHover} 
                    toggleInlineStyle={this.toggleInlineStyle} 
                    editorState={editorState}></EditorBar>
                </div>
                <Editor 
                editorState={this.state.editorState} 
                handleKeyCommand={this.handleKeyCommand}
                placeholder="writing something"
                onChange={this.onChange} />
                {
                    popData.text && <div className="pop" style={popData.style}>{popData.text}</div>
                }
                
            </div>    
        )
    }
}

export default  withRouter(Edit);;