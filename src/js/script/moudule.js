 'use strict';
import { async } from "regenerator-runtime";
import { Ajax , timeOut} from "./helpers";
import { API_URL , SEC ,Res_Per_Page} from "./config";

const state =
{
    singlePalette:{},
    allPalettes:{
        result:[],
        page:1,
        resultPerPage:Res_Per_Page
    }
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

export {loadingGetSinglePalett , state , loadingGetAllPalette ,getAllPalettePage};