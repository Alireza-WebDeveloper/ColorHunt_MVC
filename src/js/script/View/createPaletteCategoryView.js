import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import BookmarkPreView from './BookmarkPreView';
class createPaletteCategoryView extends BookmarkPreView{
    _parElement = document.querySelector('.createPalette-List');
    constructor(){
        super();
        this._parElement.addEventListener('click',this._hideModal.bind(this));
    }
    _generateMarkUp(){
        return this._data.map((ObjectData)=>{
            return ` 
             <div class='item'>
            <section class="palette mt-2">
            </button>
            <a class="recipe-Link" href="/palettes/${ObjectData.id}" data-code="${ObjectData.id}">
            <div class="recipe-Place c-1" data-index="1"  style='background-color:${ObjectData.color1}'>
            </div>
            <div class="recipe-Place c-2" data-index="2"  style='background-color:${ObjectData.color2}'>
            </div>
            <div class="recipe-Place c-3" data-index="3"  style='background-color:${ObjectData.color3}'>
            </div>
            <div class="recipe-Place c-4" data-index="4"   style='background-color:${ObjectData.color4}'>
            </div>
            </a>
            </section>
            <section class="palette-Details">
         <div class='buttons--Info w-100 d-flex flex-row justify-content-between align-items-center p-1'>
           <button class='btn btn-Like  d-flex justify-content-start align-items-center' data-code='${ObjectData.id}'>
           <svg class="svg--btnLike">
              <use href="${icon}#heart${ObjectData.likes >= 1 ?'-fill' :''}"></use>
            </svg>
           <span class="num--Likes">${ObjectData.likes}</span>
           </button>
           <button class="btn btn-Delete trash--Main rounded-0" data-code='${ObjectData.id}'>
             <span class="trash--Item1"></span>
             <span class="trash--Item2"></span>
           </button>
         </div>
         </section>
         </div>
            `
        }).join('');
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
      _hideModal(e){
        const button = e.target.closest('.recipe-Link');
        if(!button) return;
        $('#bookmark-list2').click();
    }
    /**
     * 
     * @param {*} handler = controlDeleteCreatePaletteCategory() 
     */
    _addHandlerDeletePalette(handler){
      this._parElement.addEventListener('click',function(e){
        const button = e.target.closest('.btn-Delete');
        if(!button) return;
        const id = button.dataset.code;
        handler(id);
      })
    }
    _pushState(){
     history.pushState({},'',`${location.origin}`);
    }
}

export default new createPaletteCategoryView();