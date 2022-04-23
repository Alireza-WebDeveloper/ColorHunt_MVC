'use strict';
import { async } from "regenerator-runtime";
import { Ajax , timeOut} from "./helpers";
import { API_URL , SEC ,Res_Per_Page} from "./config";
/// State 
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
    bookMarkList:[],
    allCategories:{
        names:[]
    },
    createCategoryPalette:[]
}


///Single Palette
 const loadingGetSinglePalett = async function(id){
   try{
       const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/${id}`)])
       if(!data) return;
       state.singlePalette = data;
        //// Add Bookmarked when loading page , load singlePlaette
        state.bookMarkList.find((Object)=>Object.id === state.singlePalette.id) ? state.singlePalette.bookmarked = true : '';
   }catch(error){
       throw error;
   }
 }
///All Palette
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

 ///Pagination
 const getAllPalettePage = function(page = state.allPalettes.page){
     state.allPalettes.page = page;
     const start = (page - 1) * state.allPalettes.resultPerPage;
     const end = page * state.allPalettes.resultPerPage;
     return state.allPalettes.result.slice(start,end);
 }
///LikePalette
const loadingAddLikePalette = async function(id){
    try{
        if(state.likesList.includes(id)) return;
         const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/${id}`,'PUT')])
        if(!data) return;
        /// Add id  To Like List []
        state.likesList.push(data.id);
        // Update Object -> All Palette()
        const updateObj_AllPalette = state.allPalettes.result.findIndex(({id})=>id === data.id);
        if(updateObj_AllPalette !== -1){
            state.allPalettes.result[updateObj_AllPalette].likes = data.likes;
        }
        // Update Object -> CreateAllCategory Palette()
        const updateObj_CreateCategoryPalette = state.createCategoryPalette.findIndex(({id})=>id === data.id);
        if(updateObj_CreateCategoryPalette !== -1){
            state.createCategoryPalette[updateObj_CreateCategoryPalette].likes = data.likes;
        }
        // Update Object -> BookMarkList 
        const updateObj_BookMarkList = state.bookMarkList.findIndex(({id})=>id === data.id);
        if(updateObj_BookMarkList !== -1){
            state.bookMarkList[updateObj_BookMarkList].likes = data.likes;
        }
        // updateObj_SinglePalette
        if(state.singlePalette.id === data.id){
            state.singlePalette.likes = data.likes;
        }
        /// update LocalStorage Like-> LikeList  , BookMarkList , CreatePaletteCategory
        updateLocalStorageLikesList();
        updateLocalStorageBookMarkList();
        updateLocalStorageCreatePaletteCategory();
    }catch(error){
        throw error;
    }
}
const updateLocalStorageLikesList = function(){
    localStorage.setItem('likesList',JSON.stringify(state.likesList))
}

const loadingLocalStorageLikesList = function(){
    const data = localStorage.getItem('likesList');
    if(!data) return;  
    state.likesList = JSON.parse(data);
}

///BookMarkList
/**
 * 
 * @param {*} id Ex : '#263963322588' of Palette 
 * @param {*} condition AddBookMark -> True , DeleteBookMark->False
 * @returns Object Target
 */
const UiBookMark = (id,condition)=>{
    /// Update AllPalette()
    const updateObj_AllPalette = state.allPalettes.result.find((ObjectData)=>ObjectData.id === id);
    updateObj_AllPalette ? updateObj_AllPalette.bookmarked = condition : '';
    /// Update createCategoryPalette 
    const updateObj_CategoryPalette = state.createCategoryPalette.find((ObjectData)=>ObjectData.id === id);
    updateObj_CategoryPalette ? updateObj_CategoryPalette.bookmarked = condition : '';
    /// Update on Single Palette 
     state.singlePalette.id === id ? state.singlePalette.bookmarked = condition :'';
   /// Return Object Find
     return updateObj_AllPalette || updateObj_CategoryPalette;
}
const addBookMarkList = function(id){
    const include = state.bookMarkList.some((ObjectData)=>ObjectData.id === id);
    if(include) return deleteBookMarkList(id);
     /// Update BookMarkList
     let ObjPush =  UiBookMark(id,true);
     state.bookMarkList.push(ObjPush);
     updateLocalStorageBookMarkList();
}

const deleteBookMarkList = function(id){
    const index = state.bookMarkList.findIndex((ObjectData)=>ObjectData.id === id);
    state.bookMarkList.splice(index,1);
    UiBookMark(id,false);
     /// Update LocalStorage BookMarkList
    updateLocalStorageBookMarkList();
}

const updateLocalStorageBookMarkList = function(){
    localStorage.setItem('bookmarklist',JSON.stringify(state.bookMarkList));
}
const loadingLocalStorageBookMarkList = function(){
    const data = localStorage.getItem('bookmarklist');
    if(!data) return;  
    state.bookMarkList = JSON.parse(data);
}
/* 
 allCategory ->load on Select Form
 Create Palette By Category Name
*/
const loadingGetAllCategoryNames = async function(query){
    try{
        const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}category/${query}`)])
        if(!data) return;
        state.allCategories.names = data.map(({name})=>name);
    }catch(error){
        throw error;
    }
}

const loadingCreatePaletteCategory = async function(cateGoryName,uploadData){
    try{
        const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/create/${cateGoryName}`,'POST',uploadData)])
        if(!data) return;
        state.createCategoryPalette.push(data);
        state.singlePalette = data;
        updateLocalStorageCreatePaletteCategory();
    }catch(error){
        throw error;
    }
}

const deleteCreatePaletteCategory = function(id){
    const index = state.createCategoryPalette.findIndex((ObjectData)=>ObjectData.id === id);
     state.createCategoryPalette.splice(index,1);
     updateLocalStorageCreatePaletteCategory();
}

const updateLocalStorageCreatePaletteCategory = function(){
    localStorage.setItem('createPaletteCategory',JSON.stringify(state.createCategoryPalette));
}
const loadingLocalStorageCreatePaletteCategory = function(){
    const data = localStorage.getItem('createPaletteCategory');
    if(!data) return;  
    state.createCategoryPalette = JSON.parse(data);
}



/// Exports 
export {loadingGetSinglePalett , state , loadingGetAllPalette ,getAllPalettePage , loadingAddLikePalette , loadingLocalStorageLikesList  , addBookMarkList , loadingGetAllCategoryNames , loadingCreatePaletteCategory  ,loadingLocalStorageBookMarkList , loadingLocalStorageCreatePaletteCategory , deleteCreatePaletteCategory};

