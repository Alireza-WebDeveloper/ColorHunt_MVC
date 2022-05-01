import View from "./view";
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import tippy from 'tippy.js';
import '../../../../node_modules/tippy.js/dist/tippy.css'; 
import SinglePalettePreView from "./SinglePalettePreView";
class AllPaletteView extends SinglePalettePreView{
    _parElement = document.querySelector('.global--Palette');
    constructor(){
        super();
        this._parElement.addEventListener('click',this._copyColor.bind(this));
    }
 _generateMarkUp(){
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
         <div class='buttons--Info'>
         <button class="btn btn--Bookmark w-100  d-flex justify-content-start" data-code='${ObjectData.id}'>
            <svg class="svg--btnBookmark">
              <use href="${icon}#bookmark${ObjectData.bookmarked ?'-fill':''}"></use>
            </svg>
           </button>
           <button class='btn btn-Like w-100 d-flex justify-content-start align-items-center' data-code='${ObjectData.id}'>
           <svg class="svg--btnLike">
              <use href="${icon}#heart${ObjectData.likes > 0 ?'-fill' :''}"></use>
            </svg>
           <span class="num--Likes">${ObjectData.likes}</span>
           </button>
         </div>
           <span class="date">${this._calcDateCreatePalette(ObjectData.creationDate)}</span>
         </section>
        </div>
       </div>`
     }).join('');
 }
 /**
  * 
  * @param {*} string = string of date
  * @description create date
  * @returns Ex:04/03/2022 , today , week , ...
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
   * @param {*} e = button
   * @description copy code palette 
   * @returns  rgb,hex
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
   /**
    * 
    * @param {*} handler = controlUpadeLikePalette()
    */
  _addHandlerLikePalette(handler){
    this._parElement.addEventListener('click',function(e){
      const button = e.target.closest('.btn-Like');
      if(!button) return;
      const id = button.dataset.code;
      handler(id);
    })
  }
  /**
   * 
   * @param {*} handler = controlUpdateBookMarkList() 
   */
  _addHandlerBookmarkPalette(handler){
    this._parElement.addEventListener('click',function(e){
      const button = e.target.closest('.btn--Bookmark');
      if(!button) return;
      const id = button.dataset.code;
      handler(id);
    })
  }
  _windowLoading(handler){
    window.addEventListener('load',function(e){
      if(e.target.location.origin === e.target.location.href.slice(0,-1)) handler();
    })
  }
  _windowPopState(handler){
    window.addEventListener('popstate',function(e){
      console.log(e);
       if(e.target.location.origin === e.target.location.href.slice(0,-1)) handler();
    })
  }

}


export default new AllPaletteView();