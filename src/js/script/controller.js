'use strict'
import bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import icon from '../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import * as model from './module';
import * as componet from './componet';
import { async } from 'regenerator-runtime';
import SinglePaletteView from './View/singlePaletteView';
import AllPaletteView from './View/AllPaletteView';
import PaginationView from './View/PaginationView';
import BookmarkView from './View/BookmarkView';
import BookmarkView2 from './View/BookmarkView2';
import createPaletteCategory from './View/createPaletteCategory';
import createPaletteCategoryView from './View/createPaletteCategoryView';

///Single Palette
const controlGetSinglePalett = async function(id){
 try{
  SinglePaletteView._renderLoading();
  await model.loadingGetSinglePalett(id);
  SinglePaletteView._render(model.state.singlePalette);
  SinglePaletteView._toolTips();
 }catch(error){
   SinglePaletteView._renderError(error);
 }
 
}
 ///All Palette
const controlGetAllPalett = async function(query = 'all'){
 try{
   AllPaletteView._renderLoading();
  await model.loadingGetAllPalette(query);
  AllPaletteView._render(model.getAllPalettePage());
  AllPaletteView._toolTips();
  PaginationView._render(model.state.allPalettes);
 }catch(error){
   AllPaletteView._renderError(error);
 }
 
}
/// Pagination
const controlPagination = function (goToPage){
   SinglePaletteView._clear();
   AllPaletteView._render(model.getAllPalettePage(goToPage));
   PaginationView._render(model.state.allPalettes);
}

///Like Palette
const controlUpadeLikePalette = async function(id){
  await model.loadingAddLikePalette(id);
  // await model.loadingGetAllPalette(model.state.allPalettes.query);
  // await model.loadingGetSinglePalett(id);
  if(SinglePaletteView._parElement.querySelector('.palette')){
    AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
    SinglePaletteView._update(model.state.singlePalette);
    BookmarkView2._update(model.state.bookMarkList);
    createPaletteCategoryView._update(model.state.createCategoryPalette);
  }else{
    AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
    BookmarkView2._update(model.state.bookMarkList);
    createPaletteCategoryView._update(model.state.createCategoryPalette);
  }  
}
///BookmarkList
const controlUpdateBookMarkList = function(id){
  model.addBookMarkList(id);
 if(SinglePaletteView._parElement.querySelector('.palette')){
  AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
  SinglePaletteView._update(model.state.singlePalette);
  BookmarkView._render(model.state.bookMarkList);
  BookmarkView2._render(model.state.bookMarkList);
 }else{
  AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
  BookmarkView._render(model.state.bookMarkList);
  BookmarkView2._render(model.state.bookMarkList);
 }
}
// when->Loading Page
const controlBookMarkView = function(){
  BookmarkView._render(model.state.bookMarkList);
  BookmarkView2._render(model.state.bookMarkList);
  createPaletteCategoryView._render(model.state.createCategoryPalette);
}


/*
 Set All Category Name on Select Form
 create Palette With Form
*/
const controlAddCategoryNames = async function (query = 'all'){
  try{
    await model.loadingGetAllCategoryNames(query);
  createPaletteCategory._render(model.state.allCategories.names);
  }catch(error){
    createPaletteCategory._renderError(error);
  }
}

const controlCreatePaletteCategory = async function(cateGoryName,uploadData){
    try{
      await model.loadingCreatePaletteCategory(cateGoryName,uploadData); 
      createPaletteCategory._successMessage();
      SinglePaletteView._render(model.state.singlePalette);
      SinglePaletteView._toolTips();
      createPaletteCategoryView._render(model.state.createCategoryPalette);
    }catch(error){
      createPaletteCategory._errorOnMessage(error);
    }
}
const controlUpdateCreatePaletteCategory = function(id){
 model.deleteCreatePaletteCategory(id);
 createPaletteCategoryView._render(model.state.createCategoryPalette);
}


///Local Storage , when->Loading Page
const controlLocalStorage = function(){
   model.loadingLocalStorageLikesList();
   model.loadingLocalStorageBookMarkList();
   model.loadingLocalStorageCreatePaletteCategory();
}
/// Initials Functions
const initials = function(){
 controlGetAllPalett();
 controlLocalStorage();
 AllPaletteView._addHandlerSinglePalette(controlGetSinglePalett);
 AllPaletteView._windowLoading(controlGetSinglePalett);
 AllPaletteView._windowPopState(controlGetSinglePalett);
 AllPaletteView._addHandlerLikePalette(controlUpadeLikePalette);
 AllPaletteView._addHandlerBookmarkPalette(controlUpdateBookMarkList);
 SinglePaletteView._addHandlerLikePalette(controlUpadeLikePalette);
 SinglePaletteView._addHandlerBookmarkPalette(controlUpdateBookMarkList);
 PaginationView._addHandler(controlPagination);
 BookmarkView._windowLoading(controlBookMarkView);
 BookmarkView._addHandlerRemove(controlUpdateBookMarkList);
 BookmarkView._addHandlerSinglePalette(controlGetSinglePalett);
 BookmarkView2._windowLoading(controlBookMarkView);
 BookmarkView2._addHandlerRemove(controlUpdateBookMarkList);
 BookmarkView2._addHandlerSinglePalette(controlGetSinglePalett);
 BookmarkView2._addHandlerLikePalette(controlUpadeLikePalette);
 createPaletteCategory._addHandlerCreatePalette(controlCreatePaletteCategory);
 createPaletteCategory._windowLoading(controlAddCategoryNames);
 createPaletteCategoryView._addHandlerLikePalette(controlUpadeLikePalette);
 createPaletteCategoryView._addHandlerRemove(controlUpdateCreatePaletteCategory);
}
initials();


