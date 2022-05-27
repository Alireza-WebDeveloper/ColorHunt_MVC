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
import SidebarTabsView from './View/SidebarTabsView';
import SidebarTabsView2 from './View/SidebarTabsView2';
///Single Palette 
const controlGetSinglePalett = async function(id){
 try{
  SinglePaletteView._renderLoading();
  PaginationView._clear();
  await model.loadingGetSinglePalett(id);
  SinglePaletteView._render(model.state.singlePalette);
  SinglePaletteView._toolTips();
  AllPaletteView._renderLoading();
  await model.loadingGetSinglePalettSimilarCategory('all');
  AllPaletteView._render(model.state.allPalettes.result);
  AllPaletteView._toolTips();
  SidebarTabsView._update(true);
  SidebarTabsView2._update(true);
 }catch(error){
   SinglePaletteView._renderError(error);
 }
}
/// Single Palette Categorys 
const controlGetSinglePaletteCategory = async function(query = 'all'){
 
}

//// Single Palette Comments 
const controlGetSinglePaletteComments = async function(id){
   try{
    CommentsView._renderLoading();
    await model.loadingGetSinglePalettComments(id);
    CommentsView._render(model.state.singlePaletteComments);
    CommentFormView._render(model.state.singlePaletteComments);
   }catch(error){
     CommentsView._renderError(error);
   }
};

//// Single Palette Send Form Comment 
const controlSendFormCommentPalette = async function(ObjectData){
     await model.loadingSendSinglePaletteComment(ObjectData);
     CommentFormView._clearForm();
}



 ///All Palette (Similar)
const controlGetAllPalettSimilar= async function(query = 'all'){
 try{
   /// Single Palette Clear 
   SinglePaletteView._clear(); 
   CommentsView._clear();
   CommentFormView._clear();
   AllPaletteView._renderLoading();
   CarouselPaletteView._renderLoading();
   PaginationView._clear();
  await model.loadingGetAllPaletteSimilar(query);
  AllPaletteView._render(model.state.allPalettes.result);
  AllPaletteView._toolTips();
  CarouselPaletteView._render(model.state.allPalettes.result.slice(0,90));
  CarouselPaletteView._slickCarousel();
  SidebarTabsView._update(true);
  SidebarTabsView2._update(true);
  // PaginationView._render(model.state.allPalettes);
 }catch(error){
   AllPaletteView._renderError(error);
 }
 
}
/// All Palettete (Category By Name)
const controlAllPaletteCategoryByName =async function(categoryName,page=1){
  try{
    /// Single Palette Clear 
    SinglePaletteView._clear(); 
    CommentsView._clear();
    CommentFormView._clear();
    AllPaletteView._renderLoading();
    await model.loadingGetAllPaletteCategoryByName_Page(categoryName,page);
    await model.loadingGetSizeCategoryNames(categoryName);
    AllPaletteView._render(model.state.allPalettes.result);
    SinglePaletteView._clear();
    CategoryByNamesView._update(model.state.allCategories);
    CategoryByNames2View._update(model.state.allCategories);
    SidebarTabsView._update(true);
    SidebarTabsView2._update(true);
    //// Render Pagination length and size > 0
    if(model.state.allPalettes.result.length > 0 && model.state.allCategories.size > 0){
      PaginationView._render(model.state.allCategories);
    }else{
      PaginationView._clear();
    }
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
const controlAddCategoryNames = async  function (query = 'names'){
  try{
  await model.loadingGetAllCategoryNames(query);
  createPaletteCategory._render(model.state.allCategories.names);
  CategoryByNamesView._render(model.state.allCategories);
  CategoryByNames2View._render(model.state.allCategories);
  }catch(error){
    createPaletteCategory._renderError(error);
  }
}
 
/*
 Loading SideBar Tabs
*/
const controlAddSidebarTabs = function(){
 SidebarTabsView._render(true);
 SidebarTabsView2._render(true);
}
/**
 * 
 * @param {*} query = 'all'
 * @param {*} tab = includes['popular','random','new']
 */
const controlGetAllPaletteSidebar = async function(query = 'all',tab){
  try{
    AllPaletteView._renderLoading();
    await model.loadingGetAllPaletteSidebar(query,tab);
    SidebarTabsView._update(model.state.allPalettes.query);
    SidebarTabsView2._update(model.state.allPalettes.query);
    AllPaletteView._render(model.state.allPalettes.result);
    AllPaletteView._toolTips();
    if(['new'].includes(tab)){
    CarouselPaletteView._render(model.state.allPalettes.result.slice(0,90));
    CarouselPaletteView._slickCarousel();
    }
  }catch(error){
     AllPaletteView._renderError();
  }
}



///Create Palette
const controlCreatePaletteCategory = async function(cateGoryName,uploadData){
  try{
    await model.loadingCreatePaletteCategory(cateGoryName,uploadData); 
    createPaletteCategory._successMessage();
    /// Render Single Palette 
    SinglePaletteView._render(model.state.singlePalette);
    SinglePaletteView._toolTips();
    /// Load and render Comments
    await model.loadingGetSinglePalettComments(model.state.singlePalette.id);
    CommentsView._render(model.state.singlePaletteComments);
    CommentFormView._render(model.state.singlePaletteComments);
    /// render Category Create(View)
    createPaletteCategoryView._render(model.state.createCategoryPalette);
    createPaletteCategory._pushState(model.state.singlePalette);
    /// update Sidebar Tabs 
    SidebarTabsView._update(true);
    SidebarTabsView2._update(true);
  }catch(error){
    createPaletteCategory._errorOnMessage(error);
  }
}
///Delete Create Palette
const controlDeleteCreatePaletteCategory = async function(id){
   await model.deleteCreatePaletteCategory(id);
   if(id === model.state.singlePalette.id){
    SinglePaletteView._clear();
    CommentsView._clear();
    CommentFormView._clear();
    createPaletteCategoryView._pushState();
   }
   createPaletteCategoryView._render(model.state.createCategoryPalette);
   BookmarkView._render(model.state.bookMarkList);
   BookmarkView2._render(model.state.bookMarkList);

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
/// Comment Form Send
CommentFormView._addHandlerSendFormComment(controlSendFormCommentPalette);
/// Sidebar Tabs Loading 
SidebarTabsView._windowLoading(controlAddSidebarTabs);
SidebarTabsView._addHandlerAllPalette(controlGetAllPaletteSidebar);
SidebarTabsView2._addHandlerAllPalette(controlGetAllPaletteSidebar);
SidebarTabsView._windowLoadingAllPaletteView(controlGetAllPaletteSidebar);
SidebarTabsView._windowPopState(controlGetAllPaletteSidebar);
}
initials();


