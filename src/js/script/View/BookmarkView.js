import View from "./view";
import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
class BookmarkView extends View{
    _parElement = document.querySelector('.bookmark-list'); 
    _generateMarkUp(){
        return this._data.map((ObjectData)=>{
            return ` <section class="palette mt-2">
            <button type="button" class="btn remove--BookMark btn-close" data-code="${ObjectData.id}">
            </button>
            <a class="recipe-Link" href="/palettes/${ObjectData.id}" data-code="${ObjectData.id}">
            <div class="recipe-Place c-1" data-index="1"  style='background-color:${ObjectData.color1}'>
            </div>
            <div class="recipe-Place c-2" data-index="2"  style='background-color:${ObjectData.color2}'>
            </div>
            <div class="recipe-Place c-3" data-index="3"  style='background-color:${ObjectData.color3}'>
            </div>
            <div class="recipe-Place c-4" data-index="4"   style='background-color:${ObjectData.color4}'>
            </a>
            </section>`
        }).join('');
    }
    _addHandler(handler){
        window.addEventListener('load',function(){
            handler();
        })
    }
    _addHandlerRemove(handler){
        this._parElement.addEventListener('click',function(e){
            const button = e.target.closest('.remove--BookMark');
            if(!button) return;
            const id = button.dataset.code;
            handler(id);
        })
    }
    _addHandlerSinglePalette(handler){
        this._parElement.addEventListener('click',function(e){
            e.preventDefault();
            const button = e.target.closest('.recipe-Link');
            if(!button) return;
            const id = button.dataset.code;
            handler(id);
        })
    }
}

export default new BookmarkView();