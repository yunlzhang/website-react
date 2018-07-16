import {customFetch} from '../../assets/js/common';

import types from '../constant';


let createAction = (type, payload) => {
    return {
        type,
        payload
    };
};

let fetchUserInfo = () => (dispatch) => {
    customFetch({
        url:window.requestHost + '/get_user_info',
        method:'GET',
    })
    .then(res => {
        if(res.code === 200){
            dispatch(createAction(types.LOGIN_IN,res.data))
        }else{
            dispatch(createAction(types.LOGIN_OUT))
        }
    })
}

let loginIn = (payload) => dispatch => {
    dispatch({
        type:types.LOGIN_IN,
        payload
    })
}


let loginOut = (payload) => dispatch => {
    dispatch({
        type:types.LOGIN_OUT,
        payload
    })
}

export {
    fetchUserInfo,
    loginIn,
    loginOut
}


