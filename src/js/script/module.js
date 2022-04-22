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
        state.likesList.push(data.id);
        // set on allPalette
        const updatePalette = state.allPalettes.result.findIndex((ObjectData)=>ObjectData.id === id);
        if(updatePalette !== -1){
            state.allPalettes.result[updatePalette].likes = data.likes;
        }
        // set on createCategoryPaletteView
        const updateCreatePalette = state.createCategoryPalette.findIndex((ObjectData)=>ObjectData.id === id);
        if(updateCreatePalette !== -1){
            state.createCategoryPalette[updateCreatePalette].likes = data.likes;
        }
        // set on Bookmark Palette
        const updateBookMark = state.bookMarkList.findIndex((ObjectData)=>ObjectData.id === data.id);
        if(updateBookMark !== -1){
            state.bookMarkList[updateBookMark].likes = data.likes;
        }
        // set on SinglePalette
        if(data.id === state.singlePalette.id){
            state.singlePalette.likes = data.likes;
        }
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
const addBookMarkList = function(id){
    const include = state.bookMarkList.some((ObjectData)=>ObjectData.id === id);
    if(include) return deleteBookMarkList(id);
    /// Search on All Palette->getAllPalette , Category , createPalette
    const updatePalette = state.allPalettes.result.find((ObjectData)=>ObjectData.id === id) || state.createCategoryPalette.find((ObjectData)=>ObjectData.id === id);
    if(updatePalette !== -1){
        updatePalette.bookmarked = true;
    }
    /// set on Single Palette 
     state.singlePalette.id === id ? state.singlePalette.bookmarked = true :'';
     /// Update BookMarkList
     state.bookMarkList.push(updatePalette);
     updateLocalStorageBookMarkList();
}

const deleteBookMarkList = function(id){
    const index = state.bookMarkList.findIndex((ObjectData)=>ObjectData.id === id);
    /// Search on All Palette->getAllPalette , Category , createPalette
    const updatePalette = state.allPalettes.result.find((ObjectData)=>ObjectData.id === id) || state.createCategoryPalette.find((ObjectData)=>ObjectData.id === id);
    updatePalette.bookmarked = false;
     /// set on Single Palette 
    state.singlePalette.id === id ? state.singlePalette.bookmarked = false :'';
     /// Update BookMarkList
     state.bookMarkList.splice(index,1);
    updateLocalStorageBookMarkList();
}

const updateLocalStorageBookMarkList = function(){
    localStorage.setItem('bookmarklist',JSON.stringify(state.bookMarkList));
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


const loadingLocalStorageBookMarkList = function(){
    const data = localStorage.getItem('bookmarklist');
    if(!data) return;  
    state.bookMarkList = JSON.parse(data);
}
/// Exports 
export {loadingGetSinglePalett , state , loadingGetAllPalette ,getAllPalettePage , loadingAddLikePalette , loadingLocalStorageLikesList  , addBookMarkList , loadingGetAllCategoryNames , loadingCreatePaletteCategory  ,loadingLocalStorageBookMarkList , loadingLocalStorageCreatePaletteCategory , deleteCreatePaletteCategory};

