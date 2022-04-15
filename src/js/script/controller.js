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
  PaginationView._render(model.state.allPalettes)
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
  await model.loadingGetAllPalette(model.state.allPalettes.query);
  await model.loadingGetSinglePalett(id);
  AllPaletteView._update(model.getAllPalettePage(model.state.allPalettes.page));
  SinglePaletteView._update(model.state.singlePalette);
}

/**
 * این قسمت برای لود کردن آبجکت های ذخیره شده در لوکال
 */
const controlLocalStorage = function(){
   model.loadingLocalStorageLikesList();
}
 
const initials = function(){
 controlGetAllPalett();
 AllPaletteView._addHandler(controlGetSinglePalett);
 AllPaletteView._windowLoading(controlGetSinglePalett);
 AllPaletteView._windowPopState(controlGetSinglePalett);
 AllPaletteView._addHandlerLikePalette(controlUpadeLikePalette);
 SinglePaletteView._addHandlerLikePalette(controlUpadeLikePalette);
 PaginationView._addHandler(controlPagination);

 controlLocalStorage();
}

initials();
