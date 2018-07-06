import types from '../constant';

export const  msg = (state = {
    type:'',
    text:''
},action) => {
    let {type,text} = action;
    switch(type){
        case types.SUCCESS_MSG :
            return{
                type:'success',
                text
            }
        case types.ERROR_MSG :
            return{
                type:'error',
                text
            }
        default:
            return state;
    }
}