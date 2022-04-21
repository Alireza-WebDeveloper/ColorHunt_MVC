'use strict';
import { async } from "regenerator-runtime";
/**
 * 
 * @param {String} url 'آدرس به صورت رشته' 
 * @param {String} type 'POST,GET,PUT,UPDATE,DELETE' رشته
 * @param {Object} uploadData '{}' آبجکت از اطلاعات برای ارسال
 * @returns String(Json)
 * @description 'درخواست از سرور '
 */
const Ajax = async function(url,type,uploadData){
    try{
        const fetchPro = type ? fetch(url,{
            method:type,
            headers:{'Content-Type':'application/json'},
            ...(uploadData && {body:JSON.stringify(uploadData)})
        }) : fetch(url);
        const response = await fetchPro;
        if(!response.ok) throw new Error(`Wrong Request Ajax ${response.status}`);  
        return response.json();
    }catch(error){
        console.log(error);  
        throw error;
    }
    
}


const timeOut = function(SEC){
    return new Promise((_,reject)=>{
        setTimeout(function(){
            reject('اینترنت شما ضعیف است  ، دوباره تلاش کنید');
        },1000*SEC);
    })
}
export {Ajax , timeOut};