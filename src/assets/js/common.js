import { throttle} from 'throttle-debounce';

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
    if(data.method.toLowerCase() === 'post'){
        return fetch(data.url,{
            method:'POST',
            body:JSON.stringify(data.params)
        })
    }else{
        return fetch(data.url + dealParams(data.params),{
            method:'GET'
        })
    }


    function dealParams(params){
        return '?' + Object.keys(params).reduce((val,cur,index) => {
            return val +=  (index === 0 ? '' : '&') + `${cur}=${encodeURIComponent(params[cur])}`
        },'')
    }
}



export {
    toggleShowReturn,
    customFetch
}