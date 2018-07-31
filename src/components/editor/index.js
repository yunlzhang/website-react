import React,{Component} from 'react';
import {Editor, EditorState,RichUtils} from 'draft-js';
import {resetBlockWithType,addNewBlockAt,getCurrentBlock,generateKeyBind} from './func'
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import {INLINE_BUTTONS,BLOCK_BUTTONS,CONTINUS_BLOCKS,CUSTOM_BUTTONS} from './constant'
import '../../assets/css/hint.css'
import './editor.scss';

/* componets */

import ImageButton from './component/image';
import customRender from './customrender' ;
import InsertLink from './component/link';
import convert2Html from './util/draft2html'; 




const InlineControl = props => {
    let {toggleInlineStyle,editorState} = props;
    /* eslint-disable no-unused-vars */
    let currentStyle = editorState.getCurrentInlineStyle();
    
    return <button 
        className={`editor-control hint--top editor-${props.label} ${currentStyle.has(props.style) ? 'active' :''}` } 
        aria-label={props.label+`(${generateKeyBind(props)})`}
        onMouseDown={
            (e) => {
                e.preventDefault();
                toggleInlineStyle(props.style);
            }
        }
        >{props.icon ? <svg aria-hidden="true" className="icon"><use xlinkHref={'#'+props.icon}></use></svg> : props.label}</button>

}




const BlockControl = props => {
    let {toggleBlockType,editorState} = props;
    let selection = editorState.getSelection();
    let blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return <button 
        className={`editor-control hint--top editor-${props.label} ${props.style === blockType ? 'active' :''}` } 
        aria-label={props.label+`(${generateKeyBind(props)})`}
        onMouseDown={
            (e) => {
                e.preventDefault();
                toggleBlockType(props.style);
            }
        }
        >{props.icon ? <svg aria-hidden="true" className="icon"><use xlinkHref={'#'+props.icon}></use></svg> : props.label}</button>

}



const EditorBar = (props) => {
    return (
        <div>
            {INLINE_BUTTONS.map((item,index) => {
                return <InlineControl key={index} {...Object.assign({},props,item)}/>
            })}
            {BLOCK_BUTTONS.map((item,index) => {
                return <BlockControl key={index} {...Object.assign({},props,item)}/>
            })}
            <ImageButton {...Object.assign({},CUSTOM_BUTTONS.IMAGE,props)}/>
        </div>
    )
}


class CustomEditor extends Component{
    constructor(){
        super()
        this.state = {
            editorState: EditorState.createEmpty(),
            popData:{}
        };
        this.blockRendererFn = customRender.call(this,this.onChange, this.getEditorState);
    }


    componentDidMount(){

    }


    onChange = editorState => {
        this.setState({editorState});
    }

    getHtml = ()=>{
        let editorState = this.state.editorState;
        let result = convert2Html(editorState.getCurrentContent());
        console.log(result);
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    toggleInlineStyle = (inlineStyle)=>{
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    toggleBlockType = (blockType) => {
        this.onChange(
          RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
          )
        );
    }

    handleReturn = (e) =>{
        const { editorState } = this.state;
        if (isSoftNewlineEvent(e)) {
            this.onChange(RichUtils.insertSoftNewline(editorState));
            return 'handled';
        }
        if (!e.altKey && !e.metaKey && !e.ctrlKey) {
            const currentBlock = getCurrentBlock(editorState);
            const blockType = currentBlock.getType();
    
        //   if (blockType.indexOf(Block.ATOMIC) === 0) {
        //     this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
        //     return HANDLED;
        //   }
            if (currentBlock.getLength() === 0) {
                switch (blockType) {
                    case 'header-one':
                    case 'header-two':
                    case 'header-three':
                    case 'header-four':
                    case 'blockquote':
                    case 'unordered-list-item':
                    case 'ordered-list-item':
                    case 'code':
                        this.onChange(resetBlockWithType(editorState, 'unstyled'));
                        return 'handled';
                    default:
                        return 'not-handled';
                }
            }
    
            const selection = editorState.getSelection();
    
            if (selection.isCollapsed() && currentBlock.getLength() === selection.getStartOffset()) {
                if (CONTINUS_BLOCKS.indexOf(blockType) < 0) {
                    this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
                return 'handled';
                }
                return 'not-handled';
            }
            return 'not-handled';
        }
        return 'not-handled';
    }

    getEditorState = () =>{
        return this.state.editorState;
    }

    render(){
        let {editorState}  = this.state;
        let className = 'custom-draft-editor'
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' hide-placeholder';
            }
        }
        return (
            <div ref="custom-editor" className={className}>
                <div className="editor-bar">
                    <EditorBar 
                    toggleInlineStyle={this.toggleInlineStyle} 
                    toggleBlockType={this.toggleBlockType}
                    setEditorState={this.onChange}
                    getEditorState = {this.getEditorState}
                    editorState={editorState}></EditorBar>
                    <span className="save" onClick={()=>{
                        this.getHtml();
                    }}>保存</span>
                </div>
                <div className="editor-content">
                    <Editor 
                        editorState={this.state.editorState} 
                        handleKeyCommand={this.handleKeyCommand}
                        handleReturn={this.handleReturn}
                        placeholder="writing something"
                        blockRendererFn={this.blockRendererFn}
                        ref={(ref) => this.editor = ref}
                        onChange={this.onChange} />
                    <InsertLink/>
                </div>
            </div>    
        )
    }
}

export default CustomEditor;