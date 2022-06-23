import bootstrap from 'bootstrap';
import icon from '../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import * as model from './module';

// Sticky Header
let headerPage = document.querySelector('.header--Page');
let globalPalette = document.querySelector('.global--Palette');
const observeHeader = new IntersectionObserver(
  ([data]) => {
    const event = data.isIntersecting;
    if (!event) return;
    headerPage.classList.toggle('stickHeader', event);
  },
  {
    root: null,
    threshold: 0,
  }
);
observeHeader.observe(globalPalette);
// DropDownMenu Target
// let dropdownMenuTabs = document.querySelector('#dropdownMenuTabs');
// dropdownMenuTabs.addEventListener('click', function (e) {
//   const button = e.target.closest('#dropdownMenuTabs');
//   if (button) return;
//   const childrens = Array.from(
//     e.target.closest('#dropdownMenuTabs').querySelectorAll('span')
//   );
//   if (!button) return;
//   button.classList.toggle('active');
//   childrens.forEach((el, index) => el.classList.toggle(`activeRolle-${index}`));
// });
// document.addEventListener('click', function (e) {
//   const button = e.target.closest('#dropdownMenuTabs');
//   if (!button && dropdownMenuTabs.classList.contains('active')) {
//     dropdownMenuTabs.classList.toggle('active');
//     dropdownMenuTabs
//       .querySelectorAll('span')
//       .forEach((el, index) => el.classList.toggle(`activeRolle-${index}`));
//   }
// });
