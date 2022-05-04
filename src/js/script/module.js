'use strict';
import { async } from "regenerator-runtime";
import { Ajax , timeOut , timeRun} from "./helpers";
import { API_URL , SEC ,Res_Per_Page} from "./config";
/// State 
const state =
{
    singlePalette:{},
    singlePaletteComments:[],
    allPalettes:{
        result:[],
    },
    likesList:[],
    bookMarkList:[],
    allCategories:{
        names:[],
        query:'',
        page:1,
        resultPerPage:Res_Per_Page,
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
/// Single Palette Comments 
const loadingGetSinglePalettComments = async function(id){
    const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}comments/${id}`)])
    if(!data) return;
    state.singlePaletteComments = data;
}


///All Palette Similar
 const loadingGetAllPaletteSimilar = async function(query){
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
 // All Palette By Category Name 
 const loadingGetAllPaletteCategoryByName_Page = async function(categoryName = state.allCategories.query , page = state.allCategories.page){
     try{
        state.allCategories.page = page;
        const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/all/${categoryName}?pageSize=${state.allCategories.resultPerPage}&pageNumber=${page}`)])
        if(!data) return;
        state.allCategories.query = categoryName;
        state.allPalettes.result = data;
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
         throw error
     }
 }

/*
LikeList
*/
const UiLikesList = (data)=>{
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
}
/// add -> like List
const loadingAddLikePalette = async function(id){
    try{
        if(state.likesList.includes(id)) return loadingDisLikePalette(id);
         const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/${id}`,'PUT')])
        if(!data) return;
        /// Add id  To Like List []
        state.likesList.push(data.id);
        state.likesList = [...new Set(state.likesList)];
        UiLikesList(data);
    }catch(error){
        throw error;
    }
}
/// remove -> like List
const loadingDisLikePalette = async function(id){
   try{
    const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}palettes/dislike/${id}`,'PUT')])
    if(!data) return;
    // Delete From likesList 
    const index = state.likesList.findIndex((id)=>id === data.id);
    state.likesList.splice(index,1);
    UiLikesList(data);
   }catch(error){
       throw error
   }
}
/// save-> local Storage like List
const updateLocalStorageLikesList = function(){
    localStorage.setItem('likesList',JSON.stringify(state.likesList))
}
/// load-> local Storage Like List 
const loadingLocalStorageLikesList = function(){
    const data = localStorage.getItem('likesList');
    if(!data) return;  
    state.likesList = JSON.parse(data);
}

/* 
 BookMark
*/
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
/// Add BookMark
const addBookMarkList = function(id){
    const include = state.bookMarkList.some((ObjectData)=>ObjectData.id === id);
    if(include) return deleteBookMarkList(id);
     /// Update BookMarkList
     let ObjPush =  UiBookMark(id,true);
     state.bookMarkList.push(ObjPush);
     updateLocalStorageBookMarkList();
}
/// Delete Bookmark
const deleteBookMarkList = function(id){
    const index = state.bookMarkList.findIndex((ObjectData)=>ObjectData.id === id);
    state.bookMarkList.splice(index,1);
    UiBookMark(id,false);
     /// Update LocalStorage BookMarkList
    updateLocalStorageBookMarkList();
}
/// save --> localstorage Bookmark
const updateLocalStorageBookMarkList = function(){
    localStorage.setItem('bookmarklist',JSON.stringify(state.bookMarkList));
}
/// load -> localstorage Bookmark
const loadingLocalStorageBookMarkList = function(){
    const data = localStorage.getItem('bookmarklist');
    if(!data) return;  
    state.bookMarkList = JSON.parse(data);
}
/* 
Category 
*/
const loadingGetAllCategoryNames =   function(query){
    try{
        // const data = await Promise.race([timeOut(SEC), Ajax(`${API_URL}category/${query}`)])
        // if(!data) return;
        // state.allCategories.names = data.map(({name})=>name);
        state.allCategories.names =
        [
            'Pastel', 'Neon', 'Gold', 'Vintage', 'Retro',
            'Light', 'Dark', 'Warm', 'Cold', 'Summer', 'Fall',
            'Winter', 'Spring', 'Rainbow', 'Night', 'Space', 'Earth',
            'Nature', 'Sunset', 'Skin', 'Food', 'Cream', 'Coffee', 'Christmas', 
            'Halloween', 'Wedding', 'Kids', 'Happy'
        ]
        
    }catch(error){
        throw error;
    }
}
//// CreateCategory
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
//// Delete CreateCategory
const UiDeletepaletteCategory = (id)=>{
  ///Update Category List
  const indexOfCategoryList = state.createCategoryPalette.findIndex((ObjectData)=>ObjectData.id === id);
  state.createCategoryPalette.splice(indexOfCategoryList,1);
  /// Update BookMark List 
  const indexOfBookMarkList =  state.bookMarkList.findIndex((ObjectData)=>ObjectData.id === id);
  if(indexOfBookMarkList !== -1){
      state.bookMarkList.splice(indexOfBookMarkList,1);
  }
  /// Update Like List 
  const indexOfLikeList = state.likesList.findIndex((getId)=>getId === id);
  if(!indexOfLikeList !== -1){
      state.likesList.splice(indexOfLikeList,1);
  }
}
const deleteCreatePaletteCategory = async function(id){
    try{
        await  Ajax(`${API_URL}palettes/${id}`,'DELETE');
        UiDeletepaletteCategory(id);
        updateLocalStorageCreatePaletteCategory();
        updateLocalStorageBookMarkList();
        updateLocalStorageLikesList();
    }catch(error){
        console.log(error);
    }
}
/// save CreatePalette --> LocalStorage
const updateLocalStorageCreatePaletteCategory = function(){
    localStorage.setItem('createPaletteCategory',JSON.stringify(state.createCategoryPalette));
}
/// Delete CreatePalette -> LocalStorage
const loadingLocalStorageCreatePaletteCategory = function(){
    const data = localStorage.getItem('createPaletteCategory');
    if(!data) return;  
    state.createCategoryPalette = JSON.parse(data);
}

/// Exports 
export {loadingGetSinglePalett , loadingGetSinglePalettComments , state , loadingGetAllPaletteSimilar ,getAllPalettePage , loadingAddLikePalette , loadingLocalStorageLikesList  , addBookMarkList , loadingGetAllCategoryNames , loadingCreatePaletteCategory  ,loadingLocalStorageBookMarkList , loadingLocalStorageCreatePaletteCategory  , deleteCreatePaletteCategory , loadingGetAllPaletteCategoryByName_Page};

