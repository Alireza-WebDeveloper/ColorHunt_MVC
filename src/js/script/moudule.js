 'use strict';
import { async } from "regenerator-runtime";
import { Ajax , timeOut} from "./helpers";
import { API_URL , SEC ,Res_Per_Page} from "./config";

const state =
{
    singlePalette:{},
    allPalettes:{
        result:[],
        query:'',
        page:1,
        resultPerPage:Res_Per_Page,
    },
    likesList:[],
    bookMarkList:[]
}

/**
 * 
 * @param {String} id 'ایدی مربوط به هر پالت '
 * @returns Object آبجکت
 * @description  'دریافت اطلاعات یک پالت'
 *               از سرور
 */
 const loadingGetSinglePalett = async function(id){
   try{
       const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/${id}`)])
       if(!data) return;
       state.singlePalette = data;
         //// زمانی که صفحه لود شد ، باید هر پالت چک کنیم که اگر ایدی اون در لیست بوک مارک وجود داشت 
        /// مقدار صحیح به خودش بگیرد
        state.bookMarkList.forEach((ObjectData)=>{
           if( state.singlePalette.id === ObjectData.id){
               state.singlePalette.bookmarked = true;
           }
        })
   }catch(error){
       throw error;
   }
 }
/**
 * 
 * @param {*} query کد رشته
 * @description درخواست از سرور برای گرفتن تمامی پالت های رنگی بر مبانی رشته کد
 * @returns آرایه
 */
 const loadingGetAllPalette = async function(query){
     try{
        const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/${query}`)])
        if(!data) return;
        state.allPalettes.result = data;
        state.allPalettes.query = query;
        //// زمانی که صفحه لود شد ، باید هر پالت چک کنیم که اگر ایدی اون در لیست بوک مارک وجود داشت 
        /// مقدار صحیح به خودش بگیرد
        state.allPalettes.result.forEach((ObjectRes)=>{
            state.bookMarkList.forEach((ObjectBookMark)=>{
               if( ObjectRes.id === ObjectBookMark.id){
                   ObjectRes.bookmarked = true;
               }
            })
        })
        
     }catch(error){
         throw  error;
     }
 }

/**
 * 
 * @param {*} page شماره صفحه 
 * @description از طریق این فانشکن تعیین می کنیم چه تعداد آرایه پالت رنگی هر صفحه لود شود
 * @returns 
 */
 const getAllPalettePage = function(page = state.allPalettes.page){
     state.allPalettes.page = page;
     const start = (page - 1) * state.allPalettes.resultPerPage;
     const end = page * state.allPalettes.resultPerPage;
     return state.allPalettes.result.slice(start,end);
 }
/**
 * 
 * @param {*} id کد استرینگ 
 * @description به سمت سرور ارسال  و آپدیت لایک صورت گرفته 
 *              و همچنین به لیست مورد نظر پالت های لایک شده اضافه می شود
 * @returns 
 */
const loadingAddLikePalette = async function(id){
    try{
        if(state.likesList.includes(id)) return;
         const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/${id}`,'PUT')])
        if(!data) return;
        state.likesList.push(data.id);
        updateLocalStorageLikesList();
        const updatePalette = state.allPalettes.result.find((ObjectData)=>ObjectData.id === id);
        updatePalette.likes+=1;
        if(updatePalette.id === state.singlePalette.id){
            state.singlePalette.likes+=1;
        }
    }catch(error){

    }
}
/**
 * هر بار که لایک کنیم و یا لایک رو برداریم لوکال آپدیت می شود 
 */
const updateLocalStorageLikesList = function(){
    localStorage.setItem('likesList',JSON.stringify(state.likesList))
}

/**
 * 
 * @returns وقتی که صفحه رو لود کردیم برای ما لیست پالت های لایک شده رو برمی گرداند
 *           که اگر ما دوباره بیایم کلیک کنیم برای لایک 
 *           در صورتی که وجود داشته باشد دیگر لایک اضافه می شود
 */
const loadingLocalStorageLikesList = function(){
    const data = localStorage.getItem('likesList');
    if(!data) return;  
    state.likesList = JSON.parse(data);
}

/**
 * 
 * @param {*} id کد رشته پالت 
 * @description چک می کنیم اگر ایدی مربوط در لیست ذخیره شده وجود نداشت ، اون پالت به لیست اضافه در غیر این صورت 
 *              اگر وجود داشت پس باید حذف شود به همین دلیل سریع فانکشن حذف رخ می دهد
 * @returns 
 */
const addBookMarkList = function(id){
    const include = state.bookMarkList.some((ObjectData)=>ObjectData.id === id);
    if(include) return deleteBookMarkList(id);
    const updatePalette = state.allPalettes.result.find((ObjectData)=>ObjectData.id === id);
    // Add BookMark
     updatePalette.bookmarked = true;
     state.singlePalette.id === id ? state.singlePalette.bookmarked = true :'';
     state.bookMarkList.push(updatePalette);
     loadingLocalStorageLBookMarkList();
}

/**
 * 
 * @param {*} id کد رشته پالت 
 * @description پالت از لیست حذف می شود 
 */
const deleteBookMarkList = function(id){
    const index = state.bookMarkList.findIndex((ObjectData)=>ObjectData.id === id);
    state.bookMarkList.splice(index,1);
    const updatePalette = state.allPalettes.result.find((ObjectData)=>ObjectData.id === id);
    updatePalette.bookmarked = false;
    state.singlePalette.id === id ? state.singlePalette.bookmarked = false :'';
    loadingLocalStorageLBookMarkList();
}

/**
 * آپدیت لوکال مربوط به لیست ذخیره شده
 */
const loadingLocalStorageLBookMarkList = function(){
    localStorage.setItem('bookmarklist',JSON.stringify(state.bookMarkList));
}


/**
 * زمان بارگذاری سایت ، لوکال گرفته و به لیست ذخیره شده اضافه می شود
 */
 const loadingLocalStorageBookMarkList = function(){
    const data = localStorage.getItem('bookmarklist');
    if(!data) return;  
    state.bookMarkList = JSON.parse(data);
}

export {loadingGetSinglePalett , state , loadingGetAllPalette ,getAllPalettePage , loadingAddLikePalette , loadingLocalStorageLikesList  , addBookMarkList ,loadingLocalStorageBookMarkList};

