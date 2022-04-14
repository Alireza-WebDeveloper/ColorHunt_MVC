import View from "./view";
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import tippy from 'tippy.js';
import '../../../../node_modules/tippy.js/dist/tippy.css'; 
class AllPaletteView extends View{
    _parElement = document.querySelector('.global--Palette');
    constructor(){
        super();
        this._parElement.addEventListener('click',this._copyColor.bind(this));
    }
 _generateMarkUp(){
     console.log(this._data);
     return this._data.map((ObjectData)=>{
         return `<div class="col">
         <div class="item">
         <section class="palette">
           <div class="recipe-Place c-1" data-index="1" style='background-color:${ObjectData.color1}'>
             <a class="recipe-Link btn" href="/palettes/${ObjectData.id}"></a>
             <span class="copy-code">${ObjectData.color1}</span>
           </div>
           <div class="recipe-Place c-2" data-index="2" style='background-color:${ObjectData.color2}'>
            <a class="recipe-Link btn" href="/palettes/${ObjectData.id}"></a>
            <span class="copy-code">${ObjectData.color2}</span>
           </div>
           <div class="recipe-Place c-3" data-index="3" style='background-color:${ObjectData.color3}'>
            <a class="recipe-Link btn" href="/palettes/${ObjectData.id}"></a>
            <span class="copy-code">${ObjectData.color3}</span>
           </div>
           <div class="recipe-Place c-4" data-index="4" style='background-color:${ObjectData.color4}'>
            <a class="recipe-Link btn" href="/palettes/${ObjectData.id}"></a>
            <span class="copy-code">${ObjectData.color4}</span>
           </div>
         </section>
         <section class="palette-Details">
           <button class="btn btn--Bookmark">
            <svg class="svg--btnBookmark">
              <use href="${icon}#bookmark"></use>
            </svg>
            <span class="num--Likes">${ObjectData.likes}</span>
           </button>
           <span class="date">${this._calcDateCreatePalette(ObjectData.creationDate)}</span>
         </section>
        </div>
       </div>`
     }).join('');
 }

  //////// Function اشتراکی
  /**
  * 
  * @param {*} string رشته از تاریخ ساخت 
  * @description نمایش تاریخ ساخت پالت
  * @returns Example : امروز ، یک هفته پیش ... بقیه موارد
  */
   _calcDateCreatePalette(string){
    const dateCreate = new Date(`${string}`);
    const newDate = new Date();
    const day =Math.floor((newDate - dateCreate)/(24*60*60*1000));
    const history = new Intl.DateTimeFormat(navigator.language,{year:'numeric',month:'numeric',day:'numeric'}).format(dateCreate);
    return day === 0 ? 'امروز' : day < 7 ? `روز پیش${day}` : day === 7 ? 'یک هفته پیش' : day > 7 ? history : ''; 
   }
  /**
  * 
  * @param {*} e 
  * @description برای کپی کردن کد هر پالت رنگی 
  * @returns یک رشته به صورت rgba,hex
  */
   _copyColor(e){
    const button = e.target.closest('.copy-code');
    if(!button) return;
    // copy on clipboard
    navigator.clipboard.writeText(`${button.textContent}`);
   }
 _toolTips(){
    tippy('.copy-code',{
      content:'کپی کد',
      duration:400
    })
   }
  _addHandler(handler){
    this._parElement.addEventListener('click',function(e){
      e.preventDefault();
      const a = e.target.closest('.recipe-Link');
      if(!a) return;
      let newUrl = new URL(location.origin);
      let pathName = a.getAttribute('href');
      let id =pathName.split('/')[2];
      history.pushState({id},null,`${pathName}`)
      newUrl.pathname = pathName;
      handler(id);
    })
  }
  _windowLoading(handler){
    window.addEventListener('load',function(){
      let pathName =  location.pathname;
      let id = pathName.split('/')[2]; 
      if(!id) return;
      handler(id);
    })
  }
  _windowPopState(handler){
    window.addEventListener('popstate',function(e){
      let id = e?.state?.id;
      handler(id);
    })
  }
}


export default new AllPaletteView();