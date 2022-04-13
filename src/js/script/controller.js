'use strict'
import bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import icon from '../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import * as model from './moudule';
import * as componet from './componet';
import { async } from 'regenerator-runtime';
import SinglePaletteView from './View/singlePaletteView';

/**
 * 
 * @param {*} id  رشته از آی دی  پالت رنگی 
 * @description درخواست از سرور با استفاده از ایدی پالت رنگی
 * 
 */
const controlGetSinglePalett = async function(id = '361f9e16-60e3-4a2c-8bfa-ab5e9e099249'){
 try{
  SinglePaletteView._renderLoading();
  await model.loadingGetSinglePalett(id);
  SinglePaletteView._render(model.state.singlePalette);
  SinglePaletteView._toolTips();
 }catch(error){
   SinglePaletteView._renderError(error);
 }
 
}
 
const initials = function(){
 controlGetSinglePalett();
}

initials();
