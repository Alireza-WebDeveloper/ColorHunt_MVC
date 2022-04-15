'use strict'
import bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import icon from '../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import * as model from './moudule';
import * as componet from './componet';
import { async } from 'regenerator-runtime';
import SinglePaletteView from './View/singlePaletteView';
import AllPaletteView from './View/AllPaletteView';
import PaginationView from './View/PaginationView';
import BookmarkView from './View/BookmarkView';
/**
 * 
 * @param {*} id  رشته از آی دی  پالت رنگی 
 * @description درخواست از سرور با استفاده از ایدی پالت رنگی
 * 
 */
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
/**
 * 
 * @param {*} query کد رشته
 * @description برای لود شدن هر صفحه از پالت های رنگی
 */
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
/**
 * 
 * @param {*} goToPage  شماره صفحه گرفته شده
 * @description پیج بندی قسمت مربوط به تمامی پالت های لود شده
 */
const controlPagination = function (goToPage){
   AllPaletteView._render(model.getAllPalettePage(goToPage));
   PaginationView._render(model.state.allPalettes);
}

/**
 * 
 * @param {*} id کد رشته 
 * @description کد دریافتی ارسال به سمت سرور لایک به پالت اضافه می شود
 *              و دوباره اطلاعات تمامی پالت ها و تک پالت گرفته شده
 *              و بر اساس موقعیت صفحه بندی که مثلا در بین 10 تا 20 قرار دارند آپدیت
 *              روی تمامی پالت و تک پالت صورت می گیرد  
 */
const controlUpadeLikePalette = async function(id){
  await model.loadingAddLikePalette(id);
  // await model.loadingGetAllPalette(model.state.allPalettes.query);
  // await model.loadingGetSinglePalett(id);
  if(SinglePaletteView._parElement.querySelector('.palette')){
    AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
    SinglePaletteView._update(model.state.singlePalette);
  }else{
    AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
  }  
}
/**
 * 
 * @param {*} id کد رشته  
 * @description کد دریافتی به  سمت ماژول جاوا اسکریپت فرستاده 
 *               اضافه و حذف شدن پالت به لیست ذخیره اجرا می شود ،
 */
const controlUpdateBookMarkList = function(id){
  model.addBookMarkList(id);
 if(SinglePaletteView._parElement.querySelector('.palette')){
  AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
  SinglePaletteView._update(model.state.singlePalette);
  BookmarkView._render(model.state.bookMarkList);
 }else{
  AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
  BookmarkView._render(model.state.bookMarkList);
 }
}
/**
 * نمایش   لیست پالت های ذخیره شده
 */
const controlBookMarkView = function(){
  BookmarkView._render(model.state.bookMarkList);
}

/**
 * این قسمت برای لود کردن آبجکت های ذخیره شده در لوکال
 */
const controlLocalStorage = function(){
   model.loadingLocalStorageLikesList();
   model.loadingLocalStorageBookMarkList();
}
 
const initials = function(){
 controlGetAllPalett();
 controlLocalStorage();
 AllPaletteView._addHandler(controlGetSinglePalett);
 AllPaletteView._windowLoading(controlGetSinglePalett);
 AllPaletteView._windowPopState(controlGetSinglePalett);
 AllPaletteView._addHandlerLikePalette(controlUpadeLikePalette);
 AllPaletteView._addHandlerBookmarkPalette(controlUpdateBookMarkList);
 SinglePaletteView._addHandlerLikePalette(controlUpadeLikePalette);
 SinglePaletteView._addHandlerBookmarkPalette(controlUpdateBookMarkList);
 PaginationView._addHandler(controlPagination);
 BookmarkView._addHandler(controlBookMarkView);
 BookmarkView._addHandlerRemove(controlUpdateBookMarkList);
 BookmarkView._addHandlerSinglePalette(controlGetSinglePalett);
}

initials();
