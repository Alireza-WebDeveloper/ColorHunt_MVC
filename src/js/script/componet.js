import bootstrap from 'bootstrap';
import icon from '../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import * as model from './module';
 
// Sticky Header 
let headerPage = document.querySelector('.header--Page');
let globalPalette = document.querySelector('.global--Palette');
const observeHeader = new IntersectionObserver(([data])=>{
  const event = data.isIntersecting;
  if(!event) return;
  headerPage.classList.toggle('stickHeader',event);
},{
    root:null,
    threshold:0
});
observeHeader.observe(globalPalette);

// Slide Toggle Jquery Form Comment 
let addComment = document.querySelector('.add--Comment');
let active = false;
addComment.addEventListener('click',function(e){
   const button = e.target.closest('.add--Comment');
   if(!button) return;
   $('#comment-Form').slideToggle('fast');
   const markUp = generateMarkUp(button);
   button.innerHTML  = '';
   button.insertAdjacentHTML('beforeEnd',markUp);
})
const generateMarkUp = function(){
  active = !active;
  return active ? 
  `بستن <svg class="svg--addplus"><use href="${icon}#x"></use></svg> ` 
  : 
  `افزودن دیدگاه <svg class="svg--addplus"> <use href="${icon}#plus"></use></svg>
  `;
}

// DropDownMenu Target
let dropdownMenuTabs = document.querySelector('#dropdownMenuTabs');
dropdownMenuTabs.addEventListener('click',function(e){
  const button = e.target.closest('#dropdownMenuTabs');
  const childrens = Array.from(e.target.closest('#dropdownMenuTabs').querySelectorAll('span'));
   if(!button) return;
   childrens.forEach((el,index)=>el.classList.toggle(`activeRolle-${index}`))
})

// Create Palette
// let palette = document.querySelector('.palette');
// palette.addEventListener('click',function(e){
//   const colorPicker = e.target.closest('.form-control-color');
//   if(!colorPicker) return;
//   colorPicker.addEventListener('input',function(e){
//     const recipePalette = e.target.closest('.recipe-Place');
//     if(!recipePalette) return;
//     recipePalette.style.backgroundColor = `${e.target.value}`;
//   })
// })