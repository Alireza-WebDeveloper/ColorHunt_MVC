 'use strict';
import { async } from "regenerator-runtime";
import { Ajax , timeOut} from "./helpers";
import { API_URL , SEC} from "./config";

const state =
{
    singlePalette:{},
    allPalettes:{
        result:[]
    }
}

/**
 * 
 * @param {String} id 'ایدی مربوط به هر پالت '
 * @returns Object آبجکت
 * @deprecated  'دریافت اطلاعات یک پالت'
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

export {loadingGetSinglePalett , state};