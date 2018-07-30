
import ImageBlock from './component/image_render'

export default (setEditorState, getEditorState) => (contentBlock) => {
    console.log(setEditorState,getEditorState)
    const type = contentBlock.getType();
    console.log(type)
    switch (type) {
        case 'atomic:image': 
            return {
                component: ImageBlock,
                props: {
                    setEditorState,
                    getEditorState,
                },
            };
        default: return null;
    }
};
  