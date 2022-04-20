import icon from '../../../../node_modules/bootstrap-icons/bootstrap-icons.svg';
import BookmarkPreView from './BookmarkPreView';
class BookmarkView extends BookmarkPreView{
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
            </div>
            </a>
            </section>`
        }).join('');
    }
}

export default new BookmarkView();