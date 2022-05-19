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
import CategoryByNamesView from './View/CategoryByNamesView';
import CommentsView from './View/CommentsView';
import CommentFormView from './View/CommentFormView';
import CarouselPaletteView from './View/CarouselPaletteView';
import CategoryByNames2View from './View/CategoryByNames2View';
///Single Palette 
const controlGetSinglePalett = async function(id){
 try{
  SinglePaletteView._renderLoading();
  PaginationView._clear();
  await model.loadingGetSinglePalett(id);
  SinglePaletteView._render(model.state.singlePalette);
  SinglePaletteView._toolTips();
  // Comment
  // AllPaletteView._renderLoading();
  // await model.loadingGetAllPaletteSimilar('all');
  // AllPaletteView._render(model.state.allPalettes.result);
  // AllPaletteView._toolTips();
  AllPaletteView._clear();
 }catch(error){
   SinglePaletteView._renderError(error);
 }
}
//// Single Palette Comments 
const controlGetSinglePaletteComments = async function(id){
   try{
    CommentsView._renderLoading();
    await model.loadingGetSinglePalettComments(id);
    CommentsView._render(model.state.singlePaletteComments);
    CommentFormView._render(true);
   }catch(error){
     CommentsView._renderError(error);
   }
};



 ///All Palette (Similar)
const controlGetAllPalettSimilar= async function(query = 'all'){
 try{
   AllPaletteView._renderLoading();
   CarouselPaletteView._renderLoading();
   PaginationView._clear();
  await model.loadingGetAllPaletteSimilar(query);
  AllPaletteView._render(model.state.allPalettes.result);
  AllPaletteView._toolTips();
  CarouselPaletteView._render(model.state.allPalettes.result.slice(0,90));
  CarouselPaletteView._slickCarousel();
  // PaginationView._render(model.state.allPalettes);
 }catch(error){
   AllPaletteView._renderError(error);
 }
 
}
/// All Palettete (Category By Name)
const controlAllPaletteCategoryByName =async function(categoryName,page=1){
  try{
    AllPaletteView._renderLoading();
    await model.loadingGetAllPaletteCategoryByName_Page(categoryName,page);
    AllPaletteView._render(model.state.allPalettes.result);
    SinglePaletteView._clear();
    PaginationView._render(model.state.allCategories);
  }catch(error){
    CategoryByNamesView._renderError(error);
  }
}
/// Pagination (Category By Name)  
const controlPagination =async function (goToPage){
 try{
  AllPaletteView._renderLoading();
  await model.loadingGetAllPaletteCategoryByName_Page(model.state.allCategories.query,goToPage);
  SinglePaletteView._clear();
  AllPaletteView._render(model.state.allPalettes.result);
  PaginationView._render(model.state.allCategories);
 }catch(error){
   PaginationView._renderError(error);
 }
}

/*
  Loading Array Of CategoryNames
*/
const controlAddCategoryNames =   function (query = 'all'){
  try{
   model.loadingGetAllCategoryNames(query);
  createPaletteCategory._render(model.state.allCategories.names);
  CategoryByNamesView._render(model.state.allCategories);
  CategoryByNames2View._render(model.state.allCategories);
  }catch(error){
    createPaletteCategory._renderError(error);
  }
}
///Create Palette
const controlCreatePaletteCategory = async function(cateGoryName,uploadData){
  try{
    await model.loadingCreatePaletteCategory(cateGoryName,uploadData); 
    createPaletteCategory._successMessage();
    SinglePaletteView._render(model.state.singlePalette);
    SinglePaletteView._toolTips();
    createPaletteCategoryView._render(model.state.createCategoryPalette);
    createPaletteCategory._pushState(model.state.singlePalette);
  }catch(error){
    createPaletteCategory._errorOnMessage(error);
  }
}
///Delete Create Palette
const controlDeleteCreatePaletteCategory = async function(id){
   await model.deleteCreatePaletteCategory(id);
   if(id === model.state.singlePalette.id)  SinglePaletteView._clear();
   createPaletteCategoryView._render(model.state.createCategoryPalette);
   BookmarkView._render(model.state.bookMarkList);
   BookmarkView2._render(model.state.bookMarkList);
   createPaletteCategoryView._pushState();
}

///Like Palette
const controlUpadeLikePalette = async function(id){
  await model.loadingAddLikePalette(id);
  // await model.loadingGetAllPaletteSimilar(model.state.allPalettes.query);
  // await model.loadingGetSinglePalett(id);
  if(SinglePaletteView._parElement.querySelector('.palette')){
    AllPaletteView._update(model.state.allPalettes.result);
    SinglePaletteView._update(model.state.singlePalette);
    BookmarkView2._update(model.state.bookMarkList);
    createPaletteCategoryView._update(model.state.createCategoryPalette);
  }else{
    AllPaletteView._update(model.state.allPalettes.result);
    BookmarkView2._update(model.state.bookMarkList);
    createPaletteCategoryView._update(model.state.createCategoryPalette);
  }  
}
///BookmarkList
const controlUpdateBookMarkList = function(id){
  model.addBookMarkList(id);
 if(SinglePaletteView._parElement.querySelector('.palette')){
  AllPaletteView._update(model.state.allPalettes.result);
  SinglePaletteView._update(model.state.singlePalette);
  BookmarkView._render(model.state.bookMarkList);
  BookmarkView2._render(model.state.bookMarkList);
 }else{
  AllPaletteView._update(model.state.allPalettes.result);
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

///Local Storage , when->Loading Page
const controlLocalStorage = function(){
   model.loadingLocalStorageLikesList();
   model.loadingLocalStorageBookMarkList();
   model.loadingLocalStorageCreatePaletteCategory();
}
/// Initials Functions
const initials = function(){
 
 controlLocalStorage();
 AllPaletteView._addHandlerSinglePalette(controlGetSinglePalett);

 AllPaletteView._addHandlerLikePalette(controlUpadeLikePalette);
 AllPaletteView._addHandlerBookmarkPalette(controlUpdateBookMarkList);
 AllPaletteView._windowPopState(controlGetAllPalettSimilar);
 AllPaletteView._windowLoading(controlGetAllPalettSimilar);
 SinglePaletteView._addHandlerLikePalette(controlUpadeLikePalette);
 SinglePaletteView._addHandlerBookmarkPalette(controlUpdateBookMarkList);
 SinglePaletteView._windowLoading(controlGetSinglePalett);
 SinglePaletteView._windowPopState(controlGetSinglePalett);
 PaginationView._addHandler(controlPagination);
 BookmarkView._windowLoading(controlBookMarkView);
 BookmarkView._addHandlerRemove(controlUpdateBookMarkList);
 BookmarkView._addHandlerSinglePalette(controlGetSinglePalett);
 BookmarkView2._addHandlerRemove(controlUpdateBookMarkList);
 BookmarkView2._addHandlerSinglePalette(controlGetSinglePalett);
 BookmarkView2._addHandlerLikePalette(controlUpadeLikePalette);
 createPaletteCategory._addHandlerCreatePalette(controlCreatePaletteCategory);
 createPaletteCategory._windowLoading(controlAddCategoryNames);
 createPaletteCategoryView._addHandlerLikePalette(controlUpadeLikePalette);
 createPaletteCategoryView._addHandlerSinglePalette(controlGetSinglePalett);
 createPaletteCategoryView._addHandlerDeletePalette(controlDeleteCreatePaletteCategory);
 CategoryByNamesView._addHandlerAllPaletteCategoryByName(controlAllPaletteCategoryByName);
 CategoryByNamesView._windowLoading(controlAllPaletteCategoryByName);
 CategoryByNamesView._windowPopState(controlAllPaletteCategoryByName);
 CategoryByNames2View._addHandlerAllPaletteCategoryByName(controlAllPaletteCategoryByName);
//  Comments
AllPaletteView._addHandlerSinglePalette(controlGetSinglePaletteComments);
BookmarkView2._addHandlerSinglePalette(controlGetSinglePaletteComments);
BookmarkView._addHandlerSinglePalette(controlGetSinglePaletteComments);
createPaletteCategoryView._addHandlerSinglePalette(controlGetSinglePaletteComments);
SinglePaletteView._windowPopState(controlGetSinglePaletteComments);
SinglePaletteView._windowLoading(controlGetSinglePaletteComments);
//// Carousel 
CarouselPaletteView._addHandlerSinglePalette(controlGetSinglePalett);
CarouselPaletteView._addHandlerSinglePalette(controlGetSinglePaletteComments);
}
initials();


