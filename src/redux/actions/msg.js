
let alert = (msg) => dispatch => {
    let type = msg.type === 'success' ? 'SUCCESS_MSG' : 'ERROR_MSG';
    let text = msg.text;
    dispatch({
        type,
        text
    })
}


let close = () => dispatch => {

    dispatch({
        type:'',
        text:''
    })

}

export {
    alert,
    close
}