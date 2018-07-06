import types from '../constant';

const loginReducers = (state = {isLogin:false},action) => {
    let {type,payload} = action;
    switch(type){
        case types.LOGIN_IN:
            return { 
                userInfo:payload,
                isLogin:true
            };

        case types.LOGIN_OUT:
            return { 
                isLogin:false
            };
        default: 
            return state;
    }
}

export default loginReducers;