import { throttle} from 'throttle-debounce';
import uuidv1 from 'uuid/v1';


function formatParams(data){
    let temp = [];
    Object.keys(data).forEach((item,index) => {
        temp.push(`${item}=${data[item]}`);
    })

    return temp.join('&');
}

function toggleShowReturn(){
    document.addEventListener('scroll',throttle(200,function(){
        if(document.documentElement.scrollTop > window.innerHeight){
            document.querySelector('.return-top').style.display = 'block';
        }else{
            document.querySelector('.return-top').style.display = 'none';
        }
    }),false);
    
    
    // let scrollEvent =  new Event('scroll');
    // document.dispatchEvent(scrollEvent);
}


let customFetch = data => {
    if(data.method && data.method.toLowerCase() === 'post'){
        return fetch(data.url,{
            method:'POST',
            mode:"cors",
            headers:{
                "Content-type":'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body:formatParams(data.params)
        })
        .then(response => response.json())
    }else{
        return fetch(data.url + dealParams(data.params),{
            method:'GET'
        })
        .then(response => response.json())
    }


    function dealParams(params){
        if(!params) return '';
        return '?' + Object.keys(params).reduce((val,cur,index) => {
            return val +=  (index === 0 ? '' : '&') + `${cur}=${encodeURIComponent(params[cur])}`
        },'')
    }
}

let upQiniu =  async function(path,file){
    if(['[object Blob]','[object File]'].indexOf(Object.prototype.toString.call(file)) === -1){
        throw new TypeError('file must be a file');
    }
    let uptoken;
    let formData = new FormData();
    await customFetch({
        url:window.requestHost + '/gettoken'
    }).then(res => {
        uptoken = res.uptoken;
    });
    
    formData.append('key',path+'/'+uuidv1());
    formData.append('file',file);
    formData.append('path',path);
    formData.append('token',uptoken);

    return await fetch(process.env.NODE_ENV === 'development' ? '//localhost:8083/upload' : '//upload.qiniup.com/',{
        method:'POST',
        body:formData,
        mode:'cors'
    }).then(response => {
        return response.json();
    });
}

export {
    toggleShowReturn,
    customFetch,
    upQiniu
}