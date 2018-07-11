import React,{Component} from 'react';
import * as d from 'draft-js';
import {Editor, EditorState,RichUtils} from 'draft-js';
import {withRouter} from 'react-router-dom';

class Edit extends Component{
    constructor(){
        super()
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    onChange = (editorState) => this.setState({editorState});

    handleKeyCommand = (command, editorState) => {
        console.log(command);
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }
    render(){
        return (
            <Editor 
                editorState={this.state.editorState} 
                handleKeyCommand={this.handleKeyCommand}
                placeholder="writing something"
                onChange={this.onChange} />
        )
    }
}

export default  withRouter(Edit);;