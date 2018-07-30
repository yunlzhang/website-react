import {EditorState,ContentBlock,genKey} from 'draft-js';
import { Map, List } from 'immutable';
import {judgePlatform} from '../../assets/js/common'


export const resetBlockWithType = (editorState, newType = 'unstyled', overrides = {}) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const block = blockMap.get(key);
    const newBlock = block.mergeDeep(overrides, {
        type: newType,
        data: {},
    });
    const newContentState = contentState.merge({
        blockMap: blockMap.set(key, newBlock),
        selectionAfter: selectionState.merge({
            anchorOffset: 0,
            focusOffset: 0,
        }),
    });
    return EditorState.push(editorState, newContentState, 'change-block-type');
};


export const addNewBlockAt = (editorState,pivotBlockKey,newBlockType = 'unstyled',initialData = {}) => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();
    const block = blockMap.get(pivotBlockKey);
    if (!block) {
        throw new Error(`The pivot key - ${pivotBlockKey} is not present in blockMap.`);
    }
    const blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
    const blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
    const newBlockKey = genKey();

    const newBlock = new ContentBlock({
        key: newBlockKey,
        type: newBlockType,
        text: '',
        characterList: List(),
        depth: 0,
        data: Map(initialData),
    });

    const newBlockMap = blocksBefore.concat(
        [[pivotBlockKey, block], [newBlockKey, newBlock]],
        blocksAfter
    ).toOrderedMap();

    const selection = editorState.getSelection();

    const newContent = content.merge({
        blockMap: newBlockMap,
        selectionBefore: selection,
        selectionAfter: selection.merge({
        anchorKey: newBlockKey,
        anchorOffset: 0,
        focusKey: newBlockKey,
        focusOffset: 0,
        isBackward: false,
        }),
    });
    return EditorState.push(editorState, newContent, 'split-block');
};


export const getCurrentBlock = (editorState) => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
};


export const addNewBlock = (editorState, newType = 'unstyled', initialData = {}) => {
    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed()) {
        return editorState;
    }
    const contentState = editorState.getCurrentContent();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const currentBlock = getCurrentBlock(editorState);
    if (!currentBlock) {
        return editorState;
    }
    if (currentBlock.getLength() === 0) {
        if (currentBlock.getType() === newType) {
            return editorState;
        }
        const newBlock = currentBlock.merge({
            type: newType,
            data: initialData,
        });
        const newContentState = contentState.merge({
            blockMap: blockMap.set(key, newBlock),
            selectionAfter: selectionState,
        });
        return EditorState.push(editorState, newContentState, 'change-block-type');
    }
    return editorState;
};


export const generateKeyBind = (props) =>{
    let extraText = '';
    if(judgePlatform() === 'Mac'){
        extraText = props.keyMAC;
    }else if(judgePlatform() === 'Win'){
        extraText = props.keyWin;
    }else{
        extraText = '';
    }
    return extraText;
}